from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/participant",
)


@router.post("/{public_event_id}/create", status_code=status.HTTP_204_NO_CONTENT)
def create_participant(public_event_id: int, participant_create: schemas.ParticipantCreate, db: Session = Depends(get_db)):
    crud.create_participant(
        db=db,
        public_event_id=public_event_id,
        participant_create=participant_create,
    )


@router.get("/{public_event_id}/all", response_model=schemas.ParticipantList)
def get_all_participant_by_event_id(public_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    print(crud.get_all_participant_by_event_id(
        db=db, public_event_id=public_event_id, skip=skip, limit=limit))
    return crud.get_all_participant_by_event_id(db=db, public_event_id=public_event_id, skip=skip, limit=limit)


@router.get("/get/{participant_id}", response_model=schemas.PublicEvent)
def get_participant(participant_id: int, db: Session = Depends(get_db)):
    return crud.get_participant(db=db, participant_id=participant_id)
