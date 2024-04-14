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


# @router.get("/{public_event_id}/all/excel")
# def get_all_participant_excel_by_event_id(public_event_id: int, db: Session = Depends(get_db)):
#     db_participants: List[models.Participant] = db.query(models.Participant).filter(
#         models.Participant.public_event_id == public_event_id).all()

#     workbook = openpyxl.Workbook()
#     worksheet = workbook.active

#     worksheet.append(
#         ["id", "이름", "영문 이름", "성별", "생년월일", "연락처", "이메일", "참가자 소속 분류", "참가자 소속기관명", "참가자 소속기관명 (영문)", "참가자 직위", "참가자 소재지",
#          "참가자 최종 학력", "참가자 참여유형", "참가자 참여동기", "참가자 유형", "참가자 관심 질환", "참가자 관심 분야", "참가자 관심 분야 상세", "생성 시점", "마지막 수정 시점"]
#     )

#     for db_participant in db_participants:
#         worksheet.append(
#             [
#                 str(item) if item is not None else "" for item in [
#                     db_participant.id,
#                     db_participant.name,
#                     db_participant.english_name,
#                     db_participant.gender,
#                     db_participant.birth,
#                     db_participant.phone,
#                     db_participant.email,
#                     db_participant.organization_type,
#                     db_participant.organization_name,
#                     db_participant.organization_english_name,
#                     db_participant.job_position,
#                     db_participant.address,
#                     db_participant.final_degree,
#                     db_participant.engagement_type,
#                     db_participant.participant_motivation,
#                     db_participant.participant_type,
#                     db_participant.interest_disease,
#                     db_participant.interest_field,
#                     db_participant.interest_field_detail,
#                     db_participant.created_at,
#                     db_participant.updated_at,
#                 ]
#             ]
#         )

#     file_name = "참가자목록.xlsx"
#     encoded_file_name = urllib.parse.quote(file_name.encode("utf-8"))

#     workbook.save(file_name)

#     return FileResponse(
#         "참가자목록.xlsx",
#         media_type='application/octet-stream',
#         filename=f"참가자목록.xlsx"
#     )


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
