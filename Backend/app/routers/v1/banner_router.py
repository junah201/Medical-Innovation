from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/banner",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_banner(banner_create: schemas.BannerCreate = Depends(schemas.BannerCreate), file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    filename = ""
    if file:
        filename = upload_file(file, "banner")
    crud.create_banner(db=db, banner_create=banner_create, filename=filename)


@router.get("/all", response_model=schemas.BannerList)
async def get_banners(skip: int, limit: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access"
        )

    return crud.get_banners(db=db, skip=skip, limit=limit)


@router.get("/all/active", response_model=List[schemas.Banner])
async def get_active_banners(db: Session = Depends(get_db)):
    db_banners = crud.get_active_banners(db=db)
    if not db_banners:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_banners


@router.get("/{banner_id}", response_model=schemas.Banner)
async def get_banner(banner_id: int, db: Session = Depends(get_db)):
    return crud.get_banner_by_id(db=db, banner_id=banner_id)


@router.delete("/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_banner(banner_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a banner"
        )
    db_banner = crud.get_banner_by_id(db=db, banner_id=banner_id)
    if not db_banner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    if db_banner.filename:
        delete_file(db_banner.filename, "banner")

    crud.delete_banner(db=db, banner_id=banner_id)


@router.put("/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def edit_banner(banner_id: int, banner_edit: schemas.BannerEdit, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit a banner"
        )
    crud.edit_banner(db=db, banner_id=banner_id, banner_edit=banner_edit)
