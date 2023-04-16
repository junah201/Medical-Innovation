from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/private_event",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_private_event(private_event_create: schemas.PrivateEventCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a private_event"
        )

    crud.create_private_event(
        db=db,
        private_event_create=private_event_create,
    )


@router.get("/all", response_model=schemas.PrivateEventList)
def get_private_events(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_private_events(db=db, skip=skip, limit=limit)


@router.get("/get/{private_event_id}", response_model=Optional[schemas.PrivateEvent])
def get_private_event(private_event_id: int, db: Session = Depends(get_db)):
    db_private_event = crud.get_private_event(
        db=db, private_event_id=private_event_id)
    if not db_private_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_event not found"
        )
    return db_private_event


@router.put("/update/{private_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_private_event(private_event_id: int, private_event_update: schemas.PrivateEventUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a private_event"
        )

    db_private_event = crud.get_private_event(
        db=db, private_event_id=private_event_id)
    if not db_private_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_event Forum Event not found"
        )

    crud.update_private_event(
        db=db,
        private_event_id=private_event_id,
        private_event_update=private_event_update,
    )


@router.delete("/delete/{private_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_private_event(private_event_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a private_event"
        )

    db_private_event = crud.get_private_event(
        db=db, private_event_id=private_event_id)
    if not db_private_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_event Forum Event not found"
        )

    crud.delete_private_event(
        db=db,
        private_event_id=private_event_id,
    )
