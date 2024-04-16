import json
import pprint
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas_v3, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
import openpyxl
from typing import List, Optional
import urllib

router = APIRouter(
    prefix="/public_participant",
)


@router.post("/{public_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def create_participant(public_event_id: int, participant_create: dict, db: Session = Depends(get_db)):
    db_public_event: Optional[models.PublicEvent] = db.query(models.PublicEvent).filter(
        models.PublicEvent.id == public_event_id).first()

    if not db_public_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"해당 행사(id={public_event_id})를 찾을 수 없습니다."
        )

    db_public_participant = models.PublicParticipant(
        public_event_id=public_event_id,
        application=participant_create
    )
    db.add(db_public_participant)
    db.commit()


@router.get("/{public_event_id}/all")
def get_all_participant_by_event_id(public_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_participants = db.query(models.PublicParticipant)\
        .filter(models.PublicParticipant.public_event_id == public_event_id)\
        .order_by(models.PublicParticipant.id.desc())

    data = db_participants.offset(skip).limit(limit).all()
    for item in data:
        item.application = json.loads(item.application)

    return dict(
        total=db_participants.count(),
        items=data
    )


@router.get("/{participant_id}")
def get_participant(participant_id: int, db: Session = Depends(get_db)):
    db_public_participant: Optional[models.PublicParticipant] = db.query(models.PublicParticipant).filter(
        models.PublicParticipant.id == participant_id).first()

    if not db_public_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participant not found"
        )

    db_public_participant.application = json.loads(
        db_public_participant.application
    )

    return db_public_participant


@router.put("/{participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_participant(participant_id: int, participant_update: dict, db: Session = Depends(get_db)):
    db_public_participant: models.PublicParticipant = db.query(models.PublicParticipant).filter(
        models.PublicParticipant.id == participant_id).first()

    if not db_public_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participant not found"
        )

    db_public_participant.application = json.dumps(
        participant_update,
        ensure_ascii=False
    )

    db.commit()
    db.refresh(db_public_participant)


@router.delete("/{participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_participant(participant_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a public_participant"
        )

    db_public_participant: models.PublicParticipant = db.query(models.PublicParticipant).filter(
        models.PublicParticipant.id == participant_id).first()

    if not db_public_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participant not found"
        )

    db.delete(db_public_participant)
    db.commit()


@router.get(
    "/{judging_event_id}/nth_pass/{nth_pass}/all",
    response_model=schemas_v3.JudgingParticipantList,
    summary="특정 심사 행사의 nth_pass에 해당하는 참가자 리스트를 가져옵니다. (n 이상 심사 패스)"
)
def get_judging_participants(
    judging_event_id: int,
    nth_pass: int,
    skip: int = 0,
    limit: int = 40,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
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
                for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id
            ]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )
        else:
            permissions = [
                permission.second_judging_permission
                for permission in current_user.judging_permissions if permission.judging_event_id == judging_event_id
            ]
            if not all(permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You do not have permission to access this participant"
                )

    db_all_judging_participant = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.event_id == judging_event_id,
        models.JudgingParticipant2.nth_pass >= nth_pass
    )

    results: List[models.JudgingParticipant2] = db_all_judging_participant.offset(
        skip).limit(limit).all()

    for participant in results:
        results.first_judging_result = db.query(models.JudgingResult2).filter(
            models.JudgingResult.nth == 1,
            models.JudgingResult.participant_id == participant.id,
            models.JudgingResult.user_id == current_user.id,
            models.JudgingResult.judging_event_id == judging_event_id
        ).first()
        results.second_judging_result = db.query(models.JudgingResult2).filter(
            models.JudgingResult.nth == 2,
            models.JudgingResult.participant_id == participant.id,
            models.JudgingResult.user_id == current_user.id,
            models.JudgingResult.judging_event_id == judging_event_id
        ).first()

    return schemas_v3.JudgingParticipantList(
        total=db_all_judging_participant.count(),
        items=results
    )
