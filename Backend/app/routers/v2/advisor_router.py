from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
from sqlalchemy.orm import Session

from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import Optional

router = APIRouter(
    prefix="/advisor",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_advisor(advisor_create: schemas_v2.AdvisorCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a advisor"
        )

    db_advisor = models.Advisor(
        name=advisor_create.name,
        type=advisor_create.type,
        filename=advisor_create.filename,
        description=advisor_create.description,
    )
    db.add(db_advisor)
    db.commit()
    db.refresh(db_advisor)


@router.get("/all", response_model=schemas_v2.AdvisorList)
def get_advisors(skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    db_advisors = db.query(models.Advisor)

    return schemas_v2.AdvisorList(
        total=db_advisors.count(),
        items=db_advisors.offset(skip).limit(limit).all()
    )


@router.get("/{advisor_id}", response_model=schemas_v2.Advisor)
def get_advisor(advisor_id: int, db: Session = Depends(get_db)):
    db_advisor = crud.get_advisor(db=db, advisor_id=advisor_id)
    if not db_advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    return db_advisor


@router.delete("/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_advisor(advisor_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a advisor"
        )

    db_advisor: Optional[models.Advisor] = crud.get_advisor(
        db=db, advisor_id=advisor_id)
    if not db_advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )

    if db_advisor.filename and db_advisor.filename != "defualt_user.png":
        delete_file(db_advisor.filename, "upload")

    crud.delete_advisor(db=db, advisor_id=advisor_id)


@router.put("/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_advisor_content(advisor_id: int, advisor_update: schemas_v2.AdvisorUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a advisor"
        )

    db_advisor: Optional[models.Advisor] = crud.get_advisor(
        db=db, advisor_id=advisor_id)

    if not db_advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )

    if advisor_update.filename != db_advisor.filename:
        if db_advisor.filename and db_advisor.filename != "defualt_user.png":
            delete_file(db_advisor.filename, "upload")

    db_advisor.name = advisor_update.name
    db_advisor.type = advisor_update.type
    db_advisor.filename = advisor_update.filename
    db_advisor.description = advisor_update.description

    db.commit()
    db.refresh(db_advisor)
