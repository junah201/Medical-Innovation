from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/api/v1/mou",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_mou(mou_create: schemas.MouCreate = Depends(schemas.MouCreate), file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )

    filename = ""
    if file:
        filename = upload_file(file, "mou")

    crud.create_mou(db=db, mou_create=mou_create, filename=filename)


@router.get("/all", response_model=List[schemas.Mou])
async def get_mous(db: Session = Depends(get_db)):
    db_mous = crud.get_mous(db=db)
    if not db_mous:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_mous


@ router.delete("/{mou_id}", status_code=status.HTTP_204_NO_CONTENT)
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
