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
    prefix="/api/v1/judging_event",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_judging_event(judging_event_create: schemas.JudgingEventCreate = Depends(schemas.JudgingEventCreate), file: Optional[UploadFile] = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a judging_event"
        )

    filename = None
    if file:
        if file.content_type not in ["image/png", "image/jpeg"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be png or jpeg"
            )
        filename = upload_file(file, "upload")

    db_judging_event = models.JudgingEvent(
        name=judging_event_create.name,
        description=judging_event_create.description,
        thumbnail_filename=filename,
        join_start_date=judging_event_create.join_start_date,
        join_end_date=judging_event_create.join_end_date,
        judging_1st_start_date=judging_event_create.judging_1st_start_date,
        judging_1st_end_date=judging_event_create.judging_1st_end_date,
        judging_2nd_start_date=judging_event_create.judging_2nd_start_date,
        judging_2nd_end_date=judging_event_create.judging_2nd_end_date,
    )
    db.add(db_judging_event)
    db.commit()


@router.get("/all", response_model=schemas.JudgingEventList)
def get_all_judging_events(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_judging_events = db.query(models.JudgingEvent).order_by(
        models.JudgingEvent.join_start_date.desc())
    return schemas.JudgingEventList(total=db_judging_events.count(), events=db_judging_events.offset(skip).limit(limit).all())


@router.get("/get/{judging_event_id}", response_model=schemas.JudgingEvent)
def get_judging_event(judging_event_id: int, db: Session = Depends(get_db)):
    db_judging_event = crud.get_judging_event(
        db=db,
        judging_event_id=judging_event_id
    )
    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public Event not found"
        )
    return db_judging_event


@router.put("/update/content/{judging_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_judging_event(judging_event_id: int, judging_event_update: schemas.JudgingEventCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a judging_event"
        )

    judging_event = crud.get_judging_event(
        db=db,
        judging_event_id=judging_event_id
    )

    if not judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public Event not found"
        )

    db_judging_event: models.JudgingEvent = db.query(models.JudgingEvent).filter(
        models.JudgingEvent.id == judging_event_id).first()
    db_judging_event.name = judging_event_update.name
    db_judging_event.join_start_date = judging_event_update.join_start_date
    db_judging_event.join_end_date = judging_event_update.join_end_date
    db_judging_event.judging_1st_start_date = judging_event_update.judging_1st_start_date
    db_judging_event.judging_1st_end_date = judging_event_update.judging_1st_end_date
    db_judging_event.judging_2nd_start_date = judging_event_update.judging_2nd_start_date
    db_judging_event.judging_2nd_end_date = judging_event_update.judging_2nd_end_date
    db_judging_event.description = judging_event_update.description
    db.commit()
