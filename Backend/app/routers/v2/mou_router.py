from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/mou",
)


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def create_mou(mou_create: schemas_v2.MouCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a mou"
        )

    db_mou = models.Mou(
        name=mou_create.name,
        link=mou_create.link,
        filename=mou_create.filename,
    )
    db.add(db_mou)
    db.commit()
    db.refresh(db_mou)


@router.get("/all", response_model=schemas_v2.MouList)
async def get_mous(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    db_mous = db.query(models.Mou)

    return schemas_v2.MouList(
        total=db_mous.count(),
        items=db_mous.offset(skip).limit(limit).all()
    )


@router.get("/{mou_id}", response_model=schemas_v2.Mou)
async def get_mou(mou_id: int, db: Session = Depends(get_db)):
    db_mou = crud.get_mou(db=db, mou_id=mou_id)
    if not db_mou:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_mou


@router.put("/{mou_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_mou(mou_id: int, mou_update: schemas_v2.MouUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )

    db_mou = crud.get_mou(db=db, mou_id=mou_id)
    if not db_mou:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    db_mou.name = mou_update.name
    db_mou.link = mou_update.link
    db_mou.filename = mou_update.filename

    db.commit()
    db.refresh(db_mou)


@router.delete("/{mou_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mou(mou_id: int, db: Session = Depends(get_db)):
    db_mou = crud.get_mou(db=db, mou_id=mou_id)
    if not db_mou:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    if db_mou.filename:
        delete_file(db_mou.filename, "mou")

    crud.delete_mou(db=db, mou_id=mou_id)
