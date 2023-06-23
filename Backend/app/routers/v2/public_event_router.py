from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional

router = APIRouter(
    prefix="/public_event",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_public_event(public_event_create: schemas_v2.PublicEventCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a public_event"
        )

    db_public_event = models.PublicEvent(
        name=public_event_create.name,
        english_name=public_event_create.english_name,
        description=public_event_create.description,
        thumbnail_filename=public_event_create.thumbnail_filename,
        start_date=public_event_create.start_date,
        end_date=public_event_create.end_date,
        join_start_date=public_event_create.join_start_date,
        join_end_date=public_event_create.join_end_date,
    )
    db.add(db_public_event)
    db.commit()


@router.get("/all", response_model=schemas_v2.PublicEventList)
def get_all_public_events(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_public_events = db.query(models.PublicEvent).order_by(
        models.PublicEvent.id.desc()
    )

    return schemas_v2.PublicEventList(
        total=db_public_events.count(),
        items=db_public_events.offset(skip).limit(limit).all()
    )


@router.get("/{public_event_id}", response_model=schemas_v2.PublicEvent)
def get_public_event(public_event_id: int, db: Session = Depends(get_db)):
    db_public_event = crud.get_public_event(
        db=db,
        public_event_id=public_event_id
    )
    if not db_public_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public Event not found"
        )
    return db_public_event


@router.put("/{public_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_public_event(public_event_id: int, public_event_update: schemas_v2.PublicEventContentUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a public_event"
        )

    db_public_event = crud.get_public_event(
        db=db,
        public_event_id=public_event_id
    )

    if not db_public_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public Event not found"
        )

    db_public_event.name = public_event_update.name
    db_public_event.english_name = public_event_update.english_name
    db_public_event.description = public_event_update.description
    db_public_event.thumbnail_filename = public_event_update.thumbnail_filename
    db_public_event.start_date = public_event_update.start_date
    db_public_event.end_date = public_event_update.end_date
    db_public_event.join_start_date = public_event_update.join_start_date
    db_public_event.join_end_date = public_event_update.join_end_date
    db.commit()
    db.refresh(db_public_event)
