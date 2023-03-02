from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/api/v1/history",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_history(history_create: schemas.HistoryCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a history"
        )

    crud.create_history(db=db, history_create=history_create)


@router.get("/all", response_model=schemas.HistoryList)
async def get_histories(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_all_history(db=db, skip=skip, limit=limit)


@router.get("/get/{history_id}", response_model=schemas.History)
async def get_history(history_id: int, db: Session = Depends(get_db)):
    print(crud.get_history_by_id(db=db, history_id=history_id))
    return crud.get_history_by_id(db=db, history_id=history_id)


@router.put("/update/{history_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_history(history_id: int, history_update: schemas.HistoryUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a sponsoring_company"
        )

    db_history = crud.get_history_by_id(
        db=db, history_id=history_id)

    if not db_history:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    crud.update_history(
        db=db,
        history_id=history_id,
        history_update=history_update
    )


@router.delete("/delete/{history_id}", status_code=status.HTTP_204_NO_CONTENT)
async def get_sponsoring_companies(history_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a sponsoring_company"
        )

    db_history = crud.get_history(db=db, history_id=history_id)

    if not db_history:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    crud.delete_history(db=db, history_id=history_id)
