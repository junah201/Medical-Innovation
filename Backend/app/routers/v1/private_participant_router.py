from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/private_participant",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_private_participant_participant(private_participant_participant_create: schemas.PrivateParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_private_participant_event = crud.get_private_event(
        db=db, private_event_id=private_participant_participant_create.event_id)

    if not db_private_participant_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_participant not found"
        )

    crud.create_private_participant(
        db=db,
        user_id=current_user.id,
        private_participant_create=private_participant_participant_create,
    )


@router.get("/all", response_model=schemas.PrivateParticipantList)
def get_private_participant_participants(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_private_participant(db=db, skip=skip, limit=limit)


@router.get("/get/{private_participant_participant_id}", response_model=Optional[schemas.PrivateParticipant])
def get_private_participant_participant(private_participant_participant_id: int, db: Session = Depends(get_db)):
    return crud.get_private_participant(db=db, private_participant_id=private_participant_participant_id)
