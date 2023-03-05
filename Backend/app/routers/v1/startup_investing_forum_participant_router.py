from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/startup_investing_forum_participant",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_startup_investing_forum_participant(startup_investing_forum_participant_create: schemas.StartUpInvestingForumParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_startup_investing_forum_event = crud.get_startup_investing_forum_event(
        db=db, startup_investing_forum_event_id=startup_investing_forum_participant_create.event_id)

    if not db_startup_investing_forum_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup Investing Forum Event not found"
        )

    crud.create_startup_investing_forum_participant(
        db=db,
        user_id=current_user.id,
        startup_investing_forum_participant_create=startup_investing_forum_participant_create,
    )


@router.get("/all", response_model=schemas.StartUpInvestingForumParticipantList)
def get_startup_investing_forum_participants(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_startup_investing_forum_participants(db=db, skip=skip, limit=limit)


@router.get("/get/{startup_investing_forum_participant_id}", response_model=Optional[schemas.StartUpInvestingForumParticipant])
def get_startup_investing_forum_participant(startup_investing_forum_participant_id: int, db: Session = Depends(get_db)):
    return crud.get_startup_investing_forum_participant(db=db, startup_investing_forum_participant_id=startup_investing_forum_participant_id)
