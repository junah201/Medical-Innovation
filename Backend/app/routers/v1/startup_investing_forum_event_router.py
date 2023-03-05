from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/startup_investing_forum_event",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_startup_investing_forum_event(startup_investing_forum_event_create: schemas.StartUpInvestingForumEventCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a startup_investing_forum_event"
        )

    crud.create_startup_investing_forum_event(
        db=db,
        startup_investing_forum_event_create=startup_investing_forum_event_create,
    )


@router.get("/all", response_model=schemas.StartUpInvestingForumEventList)
def get_startup_investing_forum_events(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_startup_investing_forum_events(db=db, skip=skip, limit=limit)


@router.get("/get/{startup_investing_forum_event_id}", response_model=Optional[schemas.StartUpInvestingForumEvent])
def get_startup_investing_forum_event(startup_investing_forum_event_id: int, db: Session = Depends(get_db)):
    db_startup_investing_forum_event = crud.get_startup_investing_forum_event(
        db=db, startup_investing_forum_event_id=startup_investing_forum_event_id)
    if not db_startup_investing_forum_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup Investing Forum Event not found"
        )
    return db_startup_investing_forum_event


@router.put("/update/{startup_investing_forum_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_startup_investing_forum_event(startup_investing_forum_event_id: int, startup_investing_forum_event_update: schemas.StartUpInvestingForumEventUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a startup_investing_forum_event"
        )

    db_startup_investing_forum_event = crud.get_startup_investing_forum_event(
        db=db, startup_investing_forum_event_id=startup_investing_forum_event_id)
    if not db_startup_investing_forum_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup Investing Forum Event not found"
        )

    crud.update_startup_investing_forum_event(
        db=db,
        startup_investing_forum_event_id=startup_investing_forum_event_id,
        startup_investing_forum_event_update=startup_investing_forum_event_update,
    )


@router.delete("/delete/{startup_investing_forum_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_startup_investing_forum_event(startup_investing_forum_event_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a startup_investing_forum_event"
        )

    db_startup_investing_forum_event = crud.get_startup_investing_forum_event(
        db=db, startup_investing_forum_event_id=startup_investing_forum_event_id)
    if not db_startup_investing_forum_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup Investing Forum Event not found"
        )

    crud.delete_startup_investing_forum_event(
        db=db,
        startup_investing_forum_event_id=startup_investing_forum_event_id,
    )
