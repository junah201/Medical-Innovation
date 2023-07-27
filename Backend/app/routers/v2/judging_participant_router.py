from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.email import send_email
from typing import List, Optional
import io
import openpyxl
import csv

router = APIRouter(
    prefix="/judging_participant",
)


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
def create_judging_participant(judging_participant_create: schemas_v2.JudgingParticipantCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
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


@router.get("/me/all", response_model=schemas_v2.JudgingParticipantList)
def get_judging_participants(skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_judging_participant = db.query(models.JudgingParticipant).filter(
        models.JudgingParticipant.user_id == current_user.id
    )

    return schemas_v2.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=db_all_judging_participant.offset(skip).limit(limit).all()
    )


@router.get("/{judging_event_id}/all", response_model=schemas_v2.JudgingParticipantList)
def get_judging_participants(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_judging_participant = db.query(models.JudgingParticipant).filter(
        models.JudgingParticipant.event_id == judging_event_id
    )

    results = schemas_v2.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=[]
    )

    for participant in db_all_judging_participant.offset(skip).limit(limit).all():
        tmp = schemas_v2.JudgingParticipant(**participant.__dict__)
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
        results.items.append(tmp)

    return results


@router.get("/{judging_event_id}/all/excel")
def get_all_participant_excel_by_event_id(judging_event_id: int, db: Session = Depends(get_db)):
    db_all_judging_participant: List[schemas_v2.JudgingParticipant] = db.query(models.JudgingParticipant).filter(
        models.JudgingParticipant.event_id == judging_event_id
    ).all()

    workbook = openpyxl.Workbook()
    worksheet = workbook.active

    worksheet.append(["id", "이름", "영문 이름", "성별", "생년월일", "전화번호", "이메일", "참가자 소속 분류", "참가자 소속기관명", "참가자 소속기관명 (영문)", "참가자 직위", "참가자 소재지",
                      "참가자 최종 학력", "참가자 참여동기",  "생성 시점", "마지막 수정 시점"])

    for db_participant in db_all_judging_participant:
        worksheet.append(
            [
                str(item) for item in [
                    db_participant.id,
                    db_participant.name,
                    db_participant.english_name,
                    db_participant.gender,
                    db_participant.birth,
                    db_participant.phone,
                    db_participant.email,
                    db_participant.organization_type,
                    db_participant.organization_name,
                    db_participant.organization_english_name,
                    db_participant.job_position,
                    db_participant.address,
                    db_participant.final_degree,
                    db_participant.participant_motivation,
                    db_participant.created_at,
                    db_participant.updated_at,
                ]
            ]
        )

    workbook.save("참가자목록.xlsx")
    return FileResponse("참가자목록.xlsx")


@router.get("/{judging_event_id}/nth_pass/{nth_pass}/all", response_model=schemas_v2.JudgingParticipantList)
def get_judging_participants(judging_event_id: int, nth_pass: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if nth_pass not in [0, 1, 2, 3]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="nth_pass must be 0, 1, 2, 3"
        )

    # 권한 확인
    if not current_user.is_admin:
        if nth_pass <= 1:
            permissions = [permission.first_judging_permission
                           for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )
        else:
            permissions = [permission.second_judging_permission
                           for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )

    db_all_judging_participant = db.query(models.JudgingParticipant).filter(
        models.JudgingParticipant.event_id == judging_event_id,
        models.JudgingParticipant.nth_pass >= nth_pass
    )

    results = schemas_v2.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=[]
    )

    for participant in db_all_judging_participant.offset(skip).limit(limit).all():
        tmp = schemas_v2.JudgingParticipant(**participant.__dict__)
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
        results.items.append(tmp)

    return results


@router.get("/{judging_participant_id}")
def get_judging_participant(judging_participant_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant = crud.get_judging_participant(
        db=db, judging_participant_id=judging_participant_id)

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    if not current_user.is_admin and db_judging_participant.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this participant"
        )

    return db_judging_participant


@router.put("/{judging_participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_judging_participant(judging_participant_id: int, judging_participant_update: schemas_v2.JudgingParticipantUpdate,  db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant = crud.get_judging_participant(
        db=db, judging_participant_id=judging_participant_id)

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    if not current_user.is_admin and db_judging_participant.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this participant"
        )

    db_judging_participant.name = judging_participant_update.name
    db_judging_participant.english_name = judging_participant_update.english_name
    db_judging_participant.gender = judging_participant_update.gender
    db_judging_participant.birth = judging_participant_update.birth
    db_judging_participant.phone = judging_participant_update.phone
    db_judging_participant.email = judging_participant_update.email
    db_judging_participant.organization_type = judging_participant_update.organization_type
    db_judging_participant.organization_name = judging_participant_update.organization_name
    db_judging_participant.organization_english_name = judging_participant_update.organization_english_name
    db_judging_participant.job_position = judging_participant_update.job_position
    db_judging_participant.address = judging_participant_update.address
    db_judging_participant.final_degree = judging_participant_update.final_degree
    db_judging_participant.participant_motivation = judging_participant_update.participant_motivation
    db_judging_participant.profile_filename = judging_participant_update.profile_filename
    db_judging_participant.zip_filename = judging_participant_update.zip_filename

    db.commit()
    db.refresh(db_judging_participant)


@router.put("/{judging_participant_id}/nth_pass/{nth_pass}", status_code=status.HTTP_204_NO_CONTENT)
def update_judging_participant(judging_participant_id: int, nth_pass: int,  db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant = crud.get_judging_participant(
        db=db, judging_participant_id=judging_participant_id)

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this participant"
        )

    db_judging_participant.nth_pass = nth_pass

    db.commit()
    db.refresh(db_judging_participant)
