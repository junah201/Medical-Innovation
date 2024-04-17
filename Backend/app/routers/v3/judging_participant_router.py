import json
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, models, schemas_v3
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


@router.post(
    "/{event_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="심사 행사 참가 신청"
)
def create_judging_participant(event_id: int, judging_participant_create: dict, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant_event = crud.get_judging_event(
        db=db, judging_event_id=event_id)

    if not db_judging_participant_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_judging_participant: models.JudgingParticipant2 = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.user_id == current_user.id,
        models.JudgingParticipant2.event_id == event_id,
    ).first()

    if db_judging_participant:
        db_judging_participant.application = json.dumps(
            judging_participant_create, ensure_ascii=False)
        db.commit()
    else:
        db_judging_participant = models.JudgingParticipant2(
            user_id=current_user.id,
            event_id=event_id,
            application=json.dumps(
                judging_participant_create, ensure_ascii=False)
        )
        db.add(db_judging_participant)
        db.commit()

    try:
        send_email(
            receiver_address=judging_participant_create.get('email'),
            subject=f"{db_judging_participant_event.get('name')} 참여 신청 완료",
            content=f"{judging_participant_create.get('name')}님 {db_judging_participant_event.name}에 참여 신청이 완료되었습니다.",
        )
        send_email(
            receiver_address="support@medicalinnovation.or.kr",
            subject=f"{db_judging_participant_event.get('name')} 참여 신청 완료",
            content=f"{judging_participant_create.get('name')}님 {db_judging_participant_event.name}에 참여 신청이 완료되었습니다.",
        )
    except Exception as e:
        print(e)
        pass


@router.get(
    "/me/all",
    summary="나의 심사 행사 참여자 목록 조회"
)
def get_judging_participants(skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_judging_participant = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.user_id == current_user.id
    )

    data = db_all_judging_participant.offset(skip).limit(limit).all()
    for item in data:
        item.application = json.loads(item.application)

    return dict(
        total=db_all_judging_participant.count(),
        items=data
    )


@router.get(
    "/{judging_event_id}/all",
    response_model=schemas_v3.JudgingParticipantList,
    summary="심사 행사 참가자 전체 목록 조회"
)
def get_judging_participants(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_all_judging_participant = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.event_id == judging_event_id
    )

    data = db_all_judging_participant.offset(skip).limit(limit).all()
    for item in data:
        item.application = json.loads(item.application)

    return schemas_v3.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=data
    )


@router.get(
    "/{judging_event_id}/nth_pass/{nth_pass}/all",
    response_model=schemas_v3.JudgingParticipantList,
    summary="특정 심사 행사에서 nth_pass 이상인 참가자 목록 조회 (요청을 보낸 유저의 심사 결과도 포함하여)"
)
def get_judging_participants(judging_event_id: int, nth_pass: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if nth_pass not in [0, 1, 2, 3]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="nth_pass must be 0, 1, 2, 3"
        )

    # 권한 확인
    if not current_user.is_admin:
        if nth_pass <= 1:
            permissions = [
                permission.first_judging_permission
                for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )
        else:
            permissions = [
                permission.second_judging_permission
                for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )

    db_all_judging_participant = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.event_id == judging_event_id,
        models.JudgingParticipant2.nth_pass >= nth_pass
    )

    data = db_all_judging_participant.offset(skip).limit(limit).all()

    for participant in data:
        participant.first_judging_result = db.query(models.JudgingResult2).filter(
            models.JudgingResult2.nth == 1,
            models.JudgingResult2.participant_id == participant.id,
            models.JudgingResult2.user_id == current_user.id,
            models.JudgingResult2.judging_event_id == judging_event_id
        ).first()
        participant.second_judging_result = db.query(models.JudgingResult2).filter(
            models.JudgingResult2.nth == 2,
            models.JudgingResult2.participant_id == participant.id,
            models.JudgingResult2.user_id == current_user.id,
            models.JudgingResult2.judging_event_id == judging_event_id
        ).first()
        participant.application = json.loads(participant.application)

    return schemas_v3.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=data
    )


@router.get(
    "/{judging_participant_id}",
    summary="특정 ID의 심사 행사 참가자 조회",
    response_model=schemas_v3.JudgingParticipant
)
def get_judging_participant(
    judging_participant_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_judging_participant: Optional[models.JudgingParticipant2] = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.id == judging_participant_id
    ).first()

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    if not current_user.is_admin and db_judging_participant.user_id != current_user.id:
        # 권한 확인
        permissions = [
            permission.first_judging_permission or permission.second_judging_permission
            for permission in current_user.judging_permissions if permission.judging_event_id == db_judging_participant.event_id]
        if not all(permissions):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this participant"
            )

    db_judging_participant.application = json.loads(
        db_judging_participant.application)

    return db_judging_participant


@ router.put(
    "/{judging_participant_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="특정 ID의 심사 행사 참가자 수정"
)
def update_judging_participant(
        judging_participant_id: int,
        judging_participant_update: dict,
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):
    db_judging_participant: Optional[models.JudgingParticipant2] = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.id == judging_participant_id
    ).first()

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

    db_judging_participant.application = json.dumps(
        judging_participant_update,
        ensure_ascii=False
    )
    db.commit()
    db.refresh(db_judging_participant)


@router.put(
    "/{judging_participant_id}/nth_pass/{nth_pass}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="특정 ID의 심사 행사 참가자의 nth_pass 수정"
)
def update_judging_participant_nth_pass(judging_participant_id: int, nth_pass: int,  db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
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
