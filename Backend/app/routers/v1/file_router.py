from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from fastapi.responses import FileResponse, RedirectResponse
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.common.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME
from app.utils.oauth2 import get_current_user
from typing import Union, List
import os
import boto3


router = APIRouter(
    prefix="/api/v1/file",
)

UPLOAD_DIRECTORY = "./files"


@router.post("/upload")
async def upload_file(file: UploadFile):
    filename = f"{int(datetime.utcnow().timestamp())}-{file.filename}"
    s3 = boto3.resource(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        config=boto3.session.Config(signature_version='s3v4')
    )
    s3.Bucket(AWS_S3_BUCKET_NAME).put_object(
        Key=f"upload/{filename}", Body=file.file)

    return {"filenames": filename}


@router.get("/download/{filename}", response_class=RedirectResponse)
async def download_file(filename: str):
    return RedirectResponse(f"https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/{filename}")


@router.post("/mou", status_code=status.HTTP_204_NO_CONTENT)
async def create_mou(mou_create: schemas.MouCreate, db: Session = Depends(get_db)):
    crud.create_mou(db=db, mou_create=mou_create)


@router.get("/mou/{filename}", response_class=RedirectResponse)
async def get_banner(filename: str):
    return RedirectResponse(f"https://medical-innovation.s3.ap-northeast-2.amazonaws.com/mou/{filename}")


@router.get("/mous", response_model=List[schemas.Mou])
async def get_mous(db: Session = Depends(get_db)):
    db_mous = crud.get_mous(db=db)
    if not db_mous:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_mous


@router.post("/banner/file")
async def create_banner_file(file: UploadFile, current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    filename = f"{int(datetime.utcnow().timestamp())}-{file.filename}"
    s3 = boto3.resource(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        config=boto3.session.Config(signature_version='s3v4')
    )
    s3.Bucket(AWS_S3_BUCKET_NAME).put_object(
        Key=f"banner/{filename}", Body=file.file)

    return {"filename": filename}


@router.post("/banner", status_code=status.HTTP_204_NO_CONTENT)
async def create_banner(banner_create: schemas.BannerCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    crud.create_banner(db=db, banner_create=banner_create)


@router.get("/banners", response_model=List[schemas.Banner])
async def get_banners(db: Session = Depends(get_db)):
    db_banners = crud.get_banners(db=db)
    if not db_banners:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_banners


@router.get("/banner/{banner_id}", response_model=schemas.Banner)
async def get_banner(banner_id: int, db: Session = Depends(get_db)):
    return crud.get_banner_by_id(db=db, banner_id=banner_id)


@router.delete("/banner/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_banner(banner_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a banner"
        )
    crud.delete_banner(db=db, banner_id=banner_id)


@router.put("/banner/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def edit_banner(banner_id: int, banner_edit: schemas.BannerEdit, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit a banner"
        )
    crud.edit_banner(db=db, banner_id=banner_id, banner_edit=banner_edit)


@router.post("/sponsoring_company", status_code=status.HTTP_204_NO_CONTENT)
async def create_sponsoring_company(sponsoring_company_create: schemas.SponsoringCompanyCreate, db: Session = Depends(get_db)):
    crud.create_sponsoring_company(
        db=db, sponsoring_company_create=sponsoring_company_create)


@router.get("/sponsoring_companies", response_model=List[schemas.SponsoringCompany])
async def get_sponsoring_companies(db: Session = Depends(get_db)):
    db_sponsoring_companies = crud.get_sponsoring_companies(db=db)
    if not db_sponsoring_companies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_sponsoring_companies
