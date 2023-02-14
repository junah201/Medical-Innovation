from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
from sqlalchemy.orm import Session

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import Optional

router = APIRouter(
    prefix="/api/v1/advisor",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_advisor(file: Optional[UploadFile] = None, advisor_create: schemas.AdvisorCreate = Depends(schemas.AdvisorCreate),  db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a advisor"
        )
    filename = "defualt_user.png"
    if file:
        filename = upload_file(file, "upload")

    crud.create_advisor(
        db=db, advisor_create=advisor_create, filename=filename)


@router.get("/all", response_model=list[schemas.Advisor])
def get_advisors(skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    db_advisors = crud.get_advisors(db=db, skip=skip, limit=limit)
    if not db_advisors:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No advisors found"
        )
    return db_advisors


@router.get("/get/{advisor_id}", response_model=schemas.Advisor)
def get_advisor(advisor_id: int, db: Session = Depends(get_db)):
    db_advisor = crud.get_advisor(db=db, advisor_id=advisor_id)
    if not db_advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    return db_advisor


@router.delete("/delete/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_advisor(advisor_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a advisor"
        )

    db_advisor = crud.get_advisor(db=db, advisor_id=advisor_id)
    if not db_advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )

    if db_advisor.filename:
        delete_file(db_advisor.filename, "upload")

    crud.delete_advisor(db=db, advisor_id=advisor_id)


@router.put("/update/content/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_advisor_content(advisor_id: int, advisor_update: schemas.AdvisorUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a advisor"
        )
    crud.update_advisor_content(
        db=db, advisor_id=advisor_id, advisor_update=advisor_update)


@router.put("/update/image/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_advisor_image(advisor_id: int, filename: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a advisor"
        )
    crud.update_advisor_image(
        db=db, advisor_id=advisor_id, filename=filename)
