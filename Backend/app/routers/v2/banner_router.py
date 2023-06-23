from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional
from datetime import datetime

router = APIRouter(
    prefix="/banner",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_banner(banner_create: schemas_v2.BannerCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )

    db_banner = models.Banner(
        name=banner_create.name,
        filename=banner_create.filename,
        link=banner_create.link,
        year=2023,
        banner_end_at=banner_create.banner_end_at,
    )
    db.add(db_banner)
    db.commit()


@router.get("/all", response_model=schemas_v2.BannerList)
async def get_banners(skip: int, limit: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access"
        )

    db_banners = db.query(models.Banner)

    return schemas_v2.BannerList(
        total=db_banners.count(),
        items=db_banners.offset(skip).limit(limit).all()
    )


@router.get("/all/active", response_model=schemas_v2.BannerList)
async def get_active_banners(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    db_banners = db.query(models.Banner).filter(
        models.Banner.banner_end_at > datetime.utcnow())

    return schemas_v2.BannerList(
        total=db_banners.count(),
        items=db_banners.offset(skip).limit(limit).all()
    )


@router.get("/{banner_id}", response_model=schemas_v2.Banner)
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
def edit_banner(banner_id: int, banner_edit: schemas_v2.BannerEdit, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit a banner"
        )

    db_banner = crud.get_banner_by_id(db=db, banner_id=banner_id)
    if not db_banner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    db_banner.name = banner_edit.name
    db_banner.link = banner_edit.link
    db_banner.filename = banner_edit.filename
    db_banner.banner_end_at = banner_edit.banner_end_at
    db.commit()
    db.refresh(db_banner)
