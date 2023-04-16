from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
from app.utils.email import send_email

router = APIRouter(
    prefix="/api/v1/private_participant",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_private_participant_participant(private_participant_create: schemas.PrivateParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_private_participant_event = crud.get_private_event(
        db=db, private_event_id=private_participant_create.event_id)

    if not db_private_participant_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_participant not found"
        )

    crud.create_private_participant(
        db=db,
        user_id=current_user.id,
        private_participant_create=private_participant_create,
    )
    send_email(
        receiver_address=private_participant_create.email,
        subject=f"{db_private_participant_event.name} 참여 신청 완료",
        content=f"{private_participant_create.name}님 {db_private_participant_event.name}에 참여 신청이 완료되었습니다.",
        images=[],
    )
    send_email(
        receiver_address="support@medicalinnovation.or.kr",
        subject=f"{db_private_participant_event.name} 참여 신청 완료",
        content=f"{private_participant_create.name}님 {db_private_participant_event.name}에 참여 신청이 완료되었습니다.",
        images=[],
    )


@router.get("/{private_event_id}/all", response_model=schemas.PrivateParticipantList)
def get_private_participant_participants(private_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_private_participants(db=db, private_event_id=private_event_id, skip=skip, limit=limit)


@router.get("/get/{private_participant_participant_id}", response_model=Optional[schemas.PrivateParticipant])
def get_private_participant_participant(private_participant_participant_id: int, db: Session = Depends(get_db)):
    return crud.get_private_participant(db=db, private_participant_id=private_participant_participant_id)
