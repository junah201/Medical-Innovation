from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse, FileResponse
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
from app.utils.email import send_email

import io
import openpyxl
import csv

router = APIRouter(
    prefix="/api/v1/judging_result",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_judging_result(judging_result_create: schemas.JudgingResultCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_participant_event = crud.get_judging_event(
        db=db, judging_event_id=judging_result_create.judging_event_id)

    if not db_judging_participant_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_judging_participant = crud.get_judging_participant(
        db=db, judging_participant_id=judging_result_create.participant_id)

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="participant not found"
        )

    db_judging_result = db.query(models.JudgingResult).filter(
        models.JudgingResult.user_id == current_user.id,
        models.JudgingResult.judging_event_id == judging_result_create.judging_event_id,
        models.JudgingResult.participant_id == judging_result_create.participant_id,
        models.JudgingResult.nth == judging_result_create.nth
    ).first()

    total_score = 0
    total_score += judging_result_create.technical_score1
    total_score += judging_result_create.technical_score2
    total_score += judging_result_create.technical_score3
    total_score += judging_result_create.technical_score4
    total_score += judging_result_create.technical_score5
    total_score += judging_result_create.technical_score6
    total_score += judging_result_create.marketability_score1
    total_score += judging_result_create.marketability_score2
    total_score += judging_result_create.marketability_score3
    total_score += judging_result_create.marketability_score4
    total_score += judging_result_create.business_score1
    total_score += judging_result_create.business_score2
    total_score += judging_result_create.business_score3
    total_score += judging_result_create.business_score4
    total_score += judging_result_create.business_score5
    total_score += judging_result_create.business_score6
    total_score += judging_result_create.business_score7
    total_score += judging_result_create.business_score8
    total_score += judging_result_create.other_score1



    if db_judging_result:
        db_judging_result.user_id = current_user.id
        db_judging_result.judging_event_id = judging_result_create.judging_event_id
        db_judging_result.participant_id = judging_result_create.participant_id
        db_judging_result.technical_score1 = judging_result_create.technical_score1
        db_judging_result.technical_score2 = judging_result_create.technical_score2
        db_judging_result.technical_score3 = judging_result_create.technical_score3
        db_judging_result.technical_score4 = judging_result_create.technical_score4
        db_judging_result.technical_score5 = judging_result_create.technical_score5
        db_judging_result.technical_score6 = judging_result_create.technical_score6
        db_judging_result.marketability_score1 = judging_result_create.marketability_score1
        db_judging_result.marketability_score2 = judging_result_create.marketability_score2
        db_judging_result.marketability_score3 = judging_result_create.marketability_score3
        db_judging_result.marketability_score4 = judging_result_create.marketability_score4
        db_judging_result.business_score1 = judging_result_create.business_score1
        db_judging_result.business_score2 = judging_result_create.business_score2
        db_judging_result.business_score3 = judging_result_create.business_score3
        db_judging_result.business_score4 = judging_result_create.business_score4
        db_judging_result.business_score5 = judging_result_create.business_score5
        db_judging_result.business_score6 = judging_result_create.business_score6
        db_judging_result.business_score7 = judging_result_create.business_score7
        db_judging_result.business_score8 = judging_result_create.business_score8
        db_judging_result.other_score1 = judging_result_create.other_score1
        db_judging_result.other_comment = judging_result_create.other_comment
        db_judging_result.total_score = total_score
        db.commit()
    else:
        db_judging_result = models.JudgingResult(
            user_id=current_user.id,
            judging_event_id=judging_result_create.judging_event_id,
            participant_id=judging_result_create.participant_id,
            nth=judging_result_create.nth,
            technical_score1=judging_result_create.technical_score1,
            technical_score2=judging_result_create.technical_score2,
            technical_score3=judging_result_create.technical_score3,
            technical_score4=judging_result_create.technical_score4,
            technical_score5=judging_result_create.technical_score5,
            technical_score6=judging_result_create.technical_score6,
            marketability_score1=judging_result_create.marketability_score1,
            marketability_score2=judging_result_create.marketability_score2,
            marketability_score3=judging_result_create.marketability_score3,
            marketability_score4=judging_result_create.marketability_score4,
            business_score1=judging_result_create.business_score1,
            business_score2=judging_result_create.business_score2,
            business_score3=judging_result_create.business_score3,
            business_score4=judging_result_create.business_score4,
            business_score5=judging_result_create.business_score5,
            business_score6=judging_result_create.business_score6,
            business_score7=judging_result_create.business_score7,
            business_score8=judging_result_create.business_score8,
            other_score1 = judging_result_create.other_score1,
            other_comment=judging_result_create.other_comment,
            total_score = total_score
        )
        db.add(db_judging_result)
        db.commit()



@router.get("/{judging_event_id}/all", response_model=schemas.JudgingResultList)
def get_judging_results(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_judging_event = crud.get_judging_event(
        db=db, judging_event_id=judging_event_id)

    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_all_judging_result = db.query(models.JudgingResult).filter(models.JudgingResult.judging_event_id == judging_event_id).order_by(
        models.JudgingResult.id.desc())

    results = []
    for db_judging_result in db_all_judging_result.offset(skip).limit(limit).all():
        tmp = db_judging_result
        tmp.participant_name = tmp.participant.name

        results.append(tmp)

    return schemas.JudgingResultList(
        total=db_all_judging_result.count(),
        results=results
    )


@router.get("/get/{judging_result_id}", response_model=Optional[schemas.JudgingResult])
def get_judging_participant_by_id(judging_result_id: int, db: Session = Depends(get_db)):
    return db.query(models.JudgingResult).filter(
        models.JudgingResult.id == judging_result_id
    ).first()


@router.get("/get", response_model=Optional[schemas.JudgingResult])
def get_judging_participant(judging_event_id: int, participant_id: int, nth: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_result: Optional[models.JudgingResult] = db.query(models.JudgingResult).filter(
        models.JudgingResult.judging_event_id == judging_event_id,
        models.JudgingResult.participant_id == participant_id,
        models.JudgingResult.nth == nth,
        models.JudgingResult.user_id == current_user.id
    ).first()

    if not db_judging_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="result not found"
        )

    return db_judging_result

@router.get("/{judging_event_id}/all/excel")
def get_all_participant_excel_by_event_id(judging_event_id: int, db: Session = Depends(get_db)):
    db_judging_results: List[models.JudgingResult] = db.query(models.JudgingResult).filter(
        models.JudgingResult.judging_event_id == judging_event_id).all()
    
    file_content = ",".join(
        [
            "N차 심사", "",
            "평가자 ID", "평가자 이름", "평가자 이메일","",
            "심사 대상자 ID", "심사 대상자 이름", "심사 대상자 이메일", "",
            "총점", "",
            "우월성", "혁신성", "차별성", "기술 경쟁강도", "파급성", "혁신성", "",
            "시장진입 가능성", "시장 경쟁강도", "시장 경쟁의 변화", "시장의 성장전망", "", 
            "예상 시장 점유율", "사업화 준비기간", "사업화 소요자금", "생산 용이성", "매출 성장추세", "수익성", "파생적 매출", "신제품 출현 가능성","",
            "기타 고려 사항" , "종합의견"
        ]
    )
    
    file_content += "\n"

    for db_judgint_result in db_judging_results:
        file_content += ",".join(
            [
                str(item) for item in [
                    db_judgint_result.nth, "",
                    db_judgint_result.user.id, db_judgint_result.user.name, db_judgint_result.user.email, "",
                    db_judgint_result.participant.id, db_judgint_result.participant.name, db_judgint_result.participant.email, "",
                    db_judgint_result.total_score, "",
                    db_judgint_result.technical_score1, db_judgint_result.technical_score2, db_judgint_result.technical_score3, db_judgint_result.technical_score4, db_judgint_result.technical_score5, db_judgint_result.technical_score6,  "",
                    db_judgint_result.marketability_score1, db_judgint_result.marketability_score2, db_judgint_result.marketability_score3, db_judgint_result.marketability_score4, "",
                    db_judgint_result.business_score1, db_judgint_result.business_score2, db_judgint_result.business_score3, db_judgint_result.business_score4, db_judgint_result.business_score5, db_judgint_result.business_score6, db_judgint_result.business_score7, db_judgint_result.business_score8, "",
                    db_judgint_result.other_score1, db_judgint_result.other_comment
                ]
            ]
        )

        file_content += "\n"

    workbook = openpyxl.Workbook()
    worksheet = workbook.active
    reader = csv.reader(io.StringIO(file_content))
    for row in reader:
        worksheet.append(row)

    workbook.save("results.xlsx")

    return FileResponse("results.xlsx")