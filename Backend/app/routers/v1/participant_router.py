from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import StreamingResponse, FileResponse
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional
import io
import codecs
import openpyxl
import csv

router = APIRouter(
    prefix="/api/v1/participant",
)


@router.post("/{public_event_id}/create", status_code=status.HTTP_204_NO_CONTENT)
def create_participant(public_event_id: int, participant_create: schemas.ParticipantCreate, db: Session = Depends(get_db)):
    crud.create_participant(
        db=db,
        public_event_id=public_event_id,
        participant_create=participant_create,
    )


@router.get("/{public_event_id}/all", response_model=schemas.ParticipantList)
def get_all_participant_by_event_id(public_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_all_participant_by_event_id(db=db, public_event_id=public_event_id, skip=skip, limit=limit)


@router.get("/{public_event_id}/all/excel")
def get_all_participant_excel_by_event_id(public_event_id: int, db: Session = Depends(get_db)):
    db_participants: List[models.Participant] = db.query(models.Participant).filter(
        models.Participant.public_event_id == public_event_id).all()
    file_content = ",".join(["id", "이름", "영문 이름", "성별", "생년월일", "연락처", "이메일", "참가자 소속 분류", "참가자 소속기관명", "참가자 소속기관명 (영문)", "참가자 직위", "참가자 소재지",
                             "참가자 최종 학력", "참가자 참여유형", "참가자 참여동기", "참가자 유형", "참가자 관심 질환", "참가자 관심 분야", "참가자 관심 분야 상세", "생성 시점", "마지막 수정 시점"])
    file_content += "\n"

    for db_participant in db_participants:
        file_content += ",".join(
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
                    db_participant.engagement_type,
                    db_participant.participant_motivation,
                    db_participant.participant_type,
                    db_participant.interest_disease,
                    db_participant.interest_field,
                    db_participant.interest_field_detail,
                    db_participant.created_at,
                    db_participant.updated_at,
                ]
            ]
        )

        file_content += "\n"

    workbook = openpyxl.Workbook()
    worksheet = workbook.active
    reader = csv.reader(io.StringIO(file_content))
    for row in reader:
        worksheet.append(row)

    workbook.save("참가자목록.xlsx")

    return FileResponse(
        "참가자목록.xlsx",
        media_type='application/octet-stream',
        filename=f"참가자목록.xlsx"
    )


@router.get("/get/{participant_id}", response_model=schemas.PublicEvent)
def get_participant(participant_id: int, db: Session = Depends(get_db)):
    return crud.get_participant(db=db, participant_id=participant_id)
