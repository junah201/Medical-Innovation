from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/api/v1/advisor",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_advisor(advisor_create: schemas.AdvisorCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a advisor"
        )
    crud.create_advisor(db=db, advisor_create=advisor_create)


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
    crud.delete_advisor(db=db, advisor_id=advisor_id)
