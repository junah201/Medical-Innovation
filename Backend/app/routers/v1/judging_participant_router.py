from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload, aliased, contains_eager
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
from app.utils.email import send_email

router = APIRouter(
    prefix="/api/v1/judging_participant",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_judging_participant(judging_participant_create: schemas.JudgingParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant_event = crud.get_judging_event(
        db=db, judging_event_id=judging_participant_create.event_id)

    if not db_judging_participant_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_judging_participant: models.JudgingParticipant = db.query(models.JudgingParticipant).filter(
        models.JudgingParticipant.user_id == current_user.id,
        models.JudgingParticipant.event_id == judging_participant_create.event_id,
    ).first()

    if db_judging_participant:
        db_judging_participant.name = judging_participant_create.name
        db_judging_participant.english_name = judging_participant_create.english_name
        db_judging_participant.gender = judging_participant_create.gender
        db_judging_participant.birth = judging_participant_create.birth
        db_judging_participant.phone = judging_participant_create.phone
        db_judging_participant.email = judging_participant_create.email
        db_judging_participant.organization_type = judging_participant_create.organization_type
        db_judging_participant.organization_name = judging_participant_create.organization_name
        db_judging_participant.organization_english_name = judging_participant_create.organization_english_name
        db_judging_participant.job_position = judging_participant_create.job_position
        db_judging_participant.address = judging_participant_create.address
        db_judging_participant.final_degree = judging_participant_create.final_degree
        db_judging_participant.participant_motivation = judging_participant_create.participant_motivation
        db_judging_participant.profile_filename = judging_participant_create.profile_filename
        db_judging_participant.zip_filename = judging_participant_create.zip_filename
        db.commit()
    else:
        db_judging_participant = models.JudgingParticipant(
            user_id=current_user.id,
            event_id=judging_participant_create.event_id,
            name=judging_participant_create.name,
            english_name=judging_participant_create.english_name,
            gender=judging_participant_create.gender,
            birth=judging_participant_create.birth,
            phone=judging_participant_create.phone,
            email=judging_participant_create.email,
            organization_type=judging_participant_create.organization_type,
            organization_name=judging_participant_create.organization_name,
            organization_english_name=judging_participant_create.organization_english_name,
            job_position=judging_participant_create.job_position,
            address=judging_participant_create.address,
            final_degree=judging_participant_create.final_degree,
            participant_motivation=judging_participant_create.participant_motivation,
            profile_filename=judging_participant_create.profile_filename,
            zip_filename=judging_participant_create.zip_filename,
        )
        db.add(db_judging_participant)
        db.commit()

    send_email(
        receiver_address=judging_participant_create.email,
        subject=f"{db_judging_participant_event.name} 참여 신청 완료",
        content=f"{judging_participant_create.name}님 {db_judging_participant_event.name}에 참여 신청이 완료되었습니다.",
    )
    send_email(
        receiver_address="support@medicalinnovation.or.kr",
        subject=f"{db_judging_participant_event.name} 참여 신청 완료",
        content=f"{judging_participant_create.name}님 {db_judging_participant_event.name}에 참여 신청이 완료되었습니다.",
    )


@router.get("/{judging_event_id}/all", response_model=schemas.JudgingParticipantList)
def get_judging_participants(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_judging_participant = db.query(models.JudgingParticipant)

    results = schemas.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        participants=[]
    )

    for participant in db_all_judging_participant.offset(skip).limit(limit).all():
        tmp = schemas.JudgingParticipant(**participant.__dict__)
        tmp.first_judging_result = db.query(models.JudgingResult).filter(
            models.JudgingResult.nth == 1,
            models.JudgingResult.participant_id == participant.id,
            models.JudgingResult.user_id == current_user.id,
            models.JudgingResult.judging_event_id == judging_event_id
        ).first()
        tmp.second_judging_result = db.query(models.JudgingResult).filter(
            models.JudgingResult.nth == 2,
            models.JudgingResult.participant_id == participant.id,
            models.JudgingResult.user_id == current_user.id,
            models.JudgingResult.judging_event_id == judging_event_id
        ).first()
        results.participants.append(tmp)

    return results


@router.get("/get/{judging_participant_id}")
def get_judging_participant(judging_participant_id: int, db: Session = Depends(get_db)):
    db_judging_participant =  crud.get_judging_participant(db=db, judging_participant_id=judging_participant_id)

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    return db_judging_participant