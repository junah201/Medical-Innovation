from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils import aws_s3
from typing import Union, List
import os
import boto3


router = APIRouter(
    prefix="/api/v1/file",
)


@router.post("/upload")
async def upload_file(file: UploadFile):
    filename: str = aws_s3.upload_file(file, "upload")
    return {"filename": filename}


@router.get("/download/{filename}", response_class=RedirectResponse)
async def download_file(filename: str):
    return RedirectResponse(f"https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/{filename}")


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


@router.delete("/sponsoring_company/{sponsoring_company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def get_sponsoring_companies(sponsoring_company_id: int, db: Session = Depends(get_db)):
    crud.delete_sponsoring_company(
        db=db, sponsoring_company_id=sponsoring_company_id)
