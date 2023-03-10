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
    prefix="/api/v1/public_event",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_public_event(public_event_create: schemas.PublicEventCreate = Depends(schemas.PublicEventCreate), file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a public_event"
        )

    if file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be png or jpeg"
        )

    filename = None
    if file:
        filename = upload_file(file, "upload")

    crud.create_public_event(
        db=db,
        public_event_create=public_event_create,
        filename=filename
    )


@router.get("/all", response_model=schemas.PublicEventList)
def get_all_public_events(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_public_events(db=db, skip=skip, limit=limit)


@router.get("/get/{public_event_id}", response_model=schemas.PublicEvent)
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


@router.put("/update/{public_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_public_event(public_event_id: int, public_event_update: schemas.PublicEventCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a public_event"
        )

    crud.update_public_event(
        db=db,
        public_event_id=public_event_id,
        public_event_update=public_event_update,
    )
