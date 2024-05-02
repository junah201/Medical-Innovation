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
        application=json.dumps(
            participant_create,
            ensure_ascii=False
        )
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


@router.get("/{event_id}/all/excel")
def get_all_participant_excel_by_event_id(event_id: int, db: Session = Depends(get_db)):
    db_event: Optional[models.PublicEvent] = db.query(models.PublicEvent).filter(
        models.PublicEvent.id == event_id
    ).first()

    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_all_participant: List[models.PublicParticipant] = db.query(models.PublicParticipant).filter(
        models.PublicParticipant.public_event_id == event_id
    ).all()

    workbook = openpyxl.Workbook()
    worksheet = workbook.active

    tmp = [
        ("이름", "name"),
        ("영문 이름", "english_name"),
        ("성별", "gender"),
        ("생년월일", "birth"),
        ("전화번호", "phone"),
        ("이메일", "email"),
        ("소속 분류", "organization_type"),
        ("소속기관명", "organization_name"),
        ("소속기관명 (영문)", "organization_english_name"),
        ("직위", "job_position"),
        ("소재지", "address"),
        ("최종 학력", "final_degree"),
        ("참여동기", "participant_motivation"),
        ("참여유형", "participant_type"),
        ("관심 질환", "interest_disease"),
        ("관심 분야", "interest_field"),
        ("관심 분야 상세", "interest_field_detail"),
    ]
    worksheet.append(["id", *[item[0] for item in tmp], "생성 시점", "마지막 수정 시점"])

    for p in db_all_participant:
        application = p.application
        if isinstance(p.application, str):
            application = json.loads(p.application)

        worksheet.append(
            [
                p.id,
                *[
                    str(application.get(item[1], ""))
                    for item in tmp
                ],
                str(p.created_at),
                str(p.updated_at),
            ]
        )

    for column in worksheet.columns:
        max_length = 0
        column_letter = column[0].column_letter
        for cell in column:
            try:
                max_length = max(max_length, len(str(cell.value)))
            except:
                pass
        adjusted_width = (min(20, max_length) + 2) * 1.2
        worksheet.column_dimensions[column_letter].width = adjusted_width

    workbook.save("참가자목록.xlsx")

    return FileResponse(
        "참가자목록.xlsx",
        media_type='application/octet-stream',
        filename=f"참가자목록.xlsx"
    )
