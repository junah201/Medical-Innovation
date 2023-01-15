from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette import status
import os
from app.database import crud, schemas
from app.database.database import get_db
from typing import Union, List

router = APIRouter(
    prefix="/api/v1/file",
)

UPLOAD_DIRECTORY = "./files"


@router.post("/upload")
async def upload_files(files: list[UploadFile]):
    filenames = []
    for file in files:
        contents = await file.read()
        utcnow = datetime.utcnow()
        filename = f"{utcnow.timestamp()}-{file.filename}"
        if not os.path.exists(f"{UPLOAD_DIRECTORY}/upload/{file.filename}"):
            filename = f"{file.filename}"
        with open(f"{UPLOAD_DIRECTORY}/upload/{filename}", "wb") as fp:
            fp.write(contents)
        filenames.append(filename)
    return {"filenames": filenames}


@router.get("/download/{filename}", response_class=FileResponse)
async def download_file(filename: str):
    if not os.path.exists(f"{UPLOAD_DIRECTORY}/upload/{filename}"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )

    return FileResponse(f"{UPLOAD_DIRECTORY}/upload/{filename}")


@router.post("/banner", status_code=status.HTTP_204_NO_CONTENT)
async def create_banner(banner_create: schemas.BannerCreate, db: Session = Depends(get_db)):
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


@router.get("/banner/{filename}", response_class=FileResponse)
async def get_banner(filename: str):
    if not os.path.exists(f"{UPLOAD_DIRECTORY}/banner/{filename}"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )

    return FileResponse(f"{UPLOAD_DIRECTORY}/banner/{filename}")
