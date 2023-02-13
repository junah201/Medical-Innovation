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
