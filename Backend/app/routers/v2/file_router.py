from datetime import datetime
from PIL import Image
from io import BytesIO
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils import aws_s3
from typing import List, BinaryIO

router = APIRouter(
    prefix="/file",
)


def crop_image(image_data: BinaryIO, target_ratio: float):
    image = Image.open(image_data)
    image = image.convert("RGB")

    # 이미지 크기 가져오기
    width, height = image.size

    # 이미지의 가로, 세로 비율 계산
    image_ratio = width / height

    # 이미지를 target_ratio 비율로 자르기
    if image_ratio > target_ratio:
        crop_width = int(height * target_ratio)
        crop_height = height
    else:
        crop_width = width
        crop_height = int(width / target_ratio)

    crop_left = (width - crop_width) // 2
    crop_top = (height - crop_height) // 2
    crop_right = crop_left + crop_width
    crop_bottom = crop_top + crop_height

    cropped_image = image.crop((crop_left, crop_top, crop_right, crop_bottom))

    # 잘라낸 이미지를 메모리에 저장
    cropped_image_data = BytesIO()
    cropped_image.save(cropped_image_data, format="PNG")
    cropped_image_data.seek(0)

    return cropped_image_data


@router.post("")
async def upload_files(files: List[UploadFile], current_user: models.User = Depends(get_current_user)):
    filenames: List[str] = list()
    for file in files:
        filenames.append(aws_s3.upload_file(file, "upload"))

    return filenames


@router.post("/crop")
async def upload_crop_files(files: List[UploadFile], crop_ratio: float, current_user: models.User = Depends(get_current_user)):
    filenames: List[str] = list()
    for file in files:
        cropped_image_data = crop_image(file.file, crop_ratio)
        new_file = UploadFile(
            filename=file.filename,
            file=cropped_image_data,
            content_type=file.content_type,
            headers=file.headers,
        )
        new_file.content_type = "image/png"
        filenames.append(aws_s3.upload_file(new_file, "upload"))

    return filenames


@ router.get("/{filename}", response_class=RedirectResponse)
async def download_file(filename: str):
    return RedirectResponse(f"https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/{filename}")


@ router.delete("/{filename}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_file(filename: str):
    aws_s3.delete_file(filename, "upload")
