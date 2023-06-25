from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
from app.utils.email import send_email

router = APIRouter(
    prefix="/private_participant",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_private_participant_participant(private_participant_create: schemas_v2.PrivateParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
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
    )
    send_email(
        receiver_address="support@medicalinnovation.or.kr",
        subject=f"{db_private_participant_event.name} 참여 신청 완료",
        content=f"{private_participant_create.name}님 {db_private_participant_event.name}에 참여 신청이 완료되었습니다.",
    )


@router.get("/me/all", response_model=schemas_v2.PrivateParticipantList)
def get_private_participant_participants(skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_private_participant = db.query(models.PrivateParticipant).filter(models.PrivateParticipant.user_id == current_user.id).order_by(
        models.PrivateParticipant.id.desc())

    return schemas_v2.PrivateParticipantList(
        total=db_all_private_participant.count(),
        items=db_all_private_participant.offset(skip).limit(limit).all(),
    )


@router.get("/{private_event_id}/all", response_model=schemas_v2.PrivateParticipantList)
def get_private_participant_participants(private_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_all_private_participant = db.query(models.PrivateParticipant).filter(models.PrivateParticipant.event_id == private_event_id).order_by(
        models.PrivateParticipant.id.desc())

    return schemas_v2.PrivateParticipantList(
        total=db_all_private_participant.count(),
        items=db_all_private_participant.offset(skip).limit(limit).all(),
    )


@router.get("/{private_participant_participant_id}", response_model=Optional[schemas_v2.PrivateParticipant])
def get_private_participant_participant(private_participant_participant_id: int, db: Session = Depends(get_db)):
    return crud.get_private_participant(db=db, private_participant_id=private_participant_participant_id)


@router.put("/{private_participant_participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_private_participant_participant(private_participant_participant_id: int, private_participant_update: schemas_v2.PrivateParticipantUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_private_participant: models.PrivateParticipant = db.query(models.PrivateParticipant).filter(
        models.PrivateParticipant.id == private_participant_participant_id).first()

    if not db_private_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="private_participant not found"
        )

    if not current_user.is_admin:
        if db_private_participant.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to update this private_participant"
            )

    db_private_participant.name = private_participant_update.name
    db_private_participant.english_name = private_participant_update.english_name
    db_private_participant.gender = private_participant_update.gender
    db_private_participant.birth = private_participant_update.birth
    db_private_participant.phone = private_participant_update.phone
    db_private_participant.email = private_participant_update.email
    db_private_participant.organization_type = private_participant_update.organization_type
    db_private_participant.organization_name = private_participant_update.organization_name
    db_private_participant.organization_english_name = private_participant_update.organization_english_name
    db_private_participant.job_position = private_participant_update.job_position
    db_private_participant.address = private_participant_update.address
    db_private_participant.final_degree = private_participant_update.final_degree
    db_private_participant.participant_motivation = private_participant_update.participant_motivation
    db_private_participant.profile_filename = private_participant_update.profile_filename
    db_private_participant.zip_filename = private_participant_update.zip_filename
    db.commit()
    db.refresh(db_private_participant)
