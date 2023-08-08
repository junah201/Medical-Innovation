from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from starlette import status
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
import io
import openpyxl
import csv

router = APIRouter(
    prefix="/judging_2nd_result",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_judging_2nd_result(judging_result_create: schemas_v2.Judging2ndResult, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
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

    db_juging_2nd_result: models.Judging2ndResult = db.query(models.Judging2ndResult).filter(
        models.Judging2ndResult.user_id == current_user.id,
        models.Judging2ndResult.judging_event_id == judging_result_create.judging_event_id,
        models.Judging2ndResult.participant_id == judging_result_create.participant_id
    ).first()

    total_score = sum([
        judging_result_create.efficacy_and_stability_score1,
        judging_result_create.efficacy_and_stability_score2,
        judging_result_create.efficacy_and_stability_score3,
        judging_result_create.efficacy_and_stability_score4,
        judging_result_create.technical_score1,
        judging_result_create.technical_score2,
        judging_result_create.technical_score3,
        judging_result_create.business_score1,
        judging_result_create.business_score2,
        judging_result_create.business_score3,
        judging_result_create.business_score4,
        judging_result_create.business_score5,
        judging_result_create.business_score6,
        judging_result_create.other_score1,
    ])

    if db_judging_result:
        db_judging_result.user_id = current_user.id
        db_judging_result.judging_event_id = judging_result_create.judging_event_id
        db_judging_result.participant_id = judging_result_create.participant_id

        db_judging_result.efficacy_and_stability_score1 = judging_result_create.efficacy_and_stability_score1
        db_judging_result.efficacy_and_stability_score2 = judging_result_create.efficacy_and_stability_score2
        db_judging_result.efficacy_and_stability_score3 = judging_result_create.efficacy_and_stability_score3
        db_judging_result.efficacy_and_stability_score4 = judging_result_create.efficacy_and_stability_score4
        db_judging_result.technical_score1 = judging_result_create.technical_score1
        db_judging_result.technical_score2 = judging_result_create.technical_score2
        db_judging_result.technical_score3 = judging_result_create.technical_score3
        db_judging_result.business_score1 = judging_result_create.business_score1
        db_judging_result.business_score2 = judging_result_create.business_score2
        db_judging_result.business_score3 = judging_result_create.business_score3
        db_judging_result.business_score4 = judging_result_create.business_score4
        db_judging_result.business_score5 = judging_result_create.business_score5
        db_judging_result.business_score6 = judging_result_create.business_score6
        db_judging_result.other_score1 = judging_result_create.other_score1
        db_judging_result.other_comment = judging_result_create.other_comment
        db_judging_result.total_score = total_score
        db.commit()
    else:
        db_judging_result = models.Judging2ndResult(
            user_id=current_user.id,
            judging_event_id=judging_result_create.judging_event_id,
            participant_id=judging_result_create.participant_id,
            efficacy_and_stability_score1=judging_result_create.efficacy_and_stability_score1,
            efficacy_and_stability_score2=judging_result_create.efficacy_and_stability_score2,
            efficacy_and_stability_score3=judging_result_create.efficacy_and_stability_score3,
            efficacy_and_stability_score4=judging_result_create.efficacy_and_stability_score4,
            technical_score1=judging_result_create.technical_score1,
            technical_score2=judging_result_create.technical_score2,
            technical_score3=judging_result_create.technical_score3,
            business_score1=judging_result_create.business_score1,
            business_score2=judging_result_create.business_score2,
            business_score3=judging_result_create.business_score3,
            business_score4=judging_result_create.business_score4,
            business_score5=judging_result_create.business_score5,
            business_score6=judging_result_create.business_score6,
            other_score1=judging_result_create.other_score1,
            other_comment=judging_result_create.other_comment,
            total_score=total_score
        )
        db.add(db_judging_result)
        db.commit()


@router.post("/admin", status_code=status.HTTP_204_NO_CONTENT)
def admin_create_judging_2nd_result(judging_result_create: schemas_v2.Judging2ndResultAdminCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not admin"
        )

    user = db.query(models.User).filter(
        models.User.id == judging_result_create.user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )

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

    db_juging_2nd_result: models.Judging2ndResult = db.query(models.Judging2ndResult).filter(
        models.Judging2ndResult.user_id == user.id,
        models.Judging2ndResult.judging_event_id == judging_result_create.judging_event_id,
        models.Judging2ndResult.participant_id == judging_result_create.participant_id
    ).first()

    total_score = sum([
        judging_result_create.efficacy_and_stability_score1,
        judging_result_create.efficacy_and_stability_score2,
        judging_result_create.efficacy_and_stability_score3,
        judging_result_create.efficacy_and_stability_score4,
        judging_result_create.technical_score1,
        judging_result_create.technical_score2,
        judging_result_create.technical_score3,
        judging_result_create.business_score1,
        judging_result_create.business_score2,
        judging_result_create.business_score3,
        judging_result_create.business_score4,
        judging_result_create.business_score5,
        judging_result_create.business_score6,
        judging_result_create.other_score1,
    ])

    if db_juging_2nd_result:
        db_juging_2nd_result.user_id = user.id
        db_juging_2nd_result.judging_event_id = judging_result_create.judging_event_id
        db_juging_2nd_result.participant_id = judging_result_create.participant_id

        db_juging_2nd_result.efficacy_and_stability_score1 = judging_result_create.efficacy_and_stability_score1
        db_juging_2nd_result.efficacy_and_stability_score2 = judging_result_create.efficacy_and_stability_score2
        db_juging_2nd_result.efficacy_and_stability_score3 = judging_result_create.efficacy_and_stability_score3
        db_juging_2nd_result.efficacy_and_stability_score4 = judging_result_create.efficacy_and_stability_score4
        db_juging_2nd_result.technical_score1 = judging_result_create.technical_score1
        db_juging_2nd_result.technical_score2 = judging_result_create.technical_score2
        db_juging_2nd_result.technical_score3 = judging_result_create.technical_score3
        db_juging_2nd_result.business_score1 = judging_result_create.business_score1
        db_juging_2nd_result.business_score2 = judging_result_create.business_score2
        db_juging_2nd_result.business_score3 = judging_result_create.business_score3
        db_juging_2nd_result.business_score4 = judging_result_create.business_score4
        db_juging_2nd_result.business_score5 = judging_result_create.business_score5
        db_juging_2nd_result.business_score6 = judging_result_create.business_score6
        db_juging_2nd_result.other_score1 = judging_result_create.other_score1
        db_juging_2nd_result.other_comment = judging_result_create.other_comment
        db_juging_2nd_result.total_score = total_score
        db.commit()
    else:
        db_juging_2nd_result = models.Judging2ndResult(
            user_id=user.id,
            judging_event_id=judging_result_create.judging_event_id,
            participant_id=judging_result_create.participant_id,
            efficacy_and_stability_score1=judging_result_create.efficacy_and_stability_score1,
            efficacy_and_stability_score2=judging_result_create.efficacy_and_stability_score2,
            efficacy_and_stability_score3=judging_result_create.efficacy_and_stability_score3,
            efficacy_and_stability_score4=judging_result_create.efficacy_and_stability_score4,
            technical_score1=judging_result_create.technical_score1,
            technical_score2=judging_result_create.technical_score2,
            technical_score3=judging_result_create.technical_score3,
            business_score1=judging_result_create.business_score1,
            business_score2=judging_result_create.business_score2,
            business_score3=judging_result_create.business_score3,
            business_score4=judging_result_create.business_score4,
            business_score5=judging_result_create.business_score5,
            business_score6=judging_result_create.business_score6,
            other_score1=judging_result_create.other_score1,
            other_comment=judging_result_create.other_comment,
            total_score=total_score
        )
        db.add(db_juging_2nd_result)
        db.commit()


@router.get("/{judging_event_id}/all", response_model=schemas_v2.Judging2ndResultList)
def get_judging_2nd_results(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_judging_event = crud.get_judging_event(
        db=db, judging_event_id=judging_event_id)

    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="event not found"
        )

    db_all_judging_result = db.query(models.Judging2ndResult).filter(models.Judging2ndResult.judging_event_id == judging_event_id).order_by(
        models.Judging2ndResult.id.desc())

    results = []
    for db_judging_result in db_all_judging_result.offset(skip).limit(limit).all():
        tmp = db_judging_result
        tmp.participant_name = tmp.participant.name

        results.append(tmp)

    return schemas_v2.Judging2ndResultList(
        total=db_all_judging_result.count(),
        items=results
    )


@router.get("/get", response_model=Optional[schemas_v2.Judging2ndResult])
def get_judging_2nd_participant(judging_event_id: int, participant_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_result: Optional[models.Judging2ndResult] = db.query(models.Judging2ndResult).filter(
        models.Judging2ndResult.judging_event_id == judging_event_id,
        models.Judging2ndResult.participant_id == participant_id,
        models.Judging2ndResult.user_id == current_user.id
    ).first()

    if not db_judging_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="result not found"
        )

    return db_judging_result


@router.get("/{judging_result_id}", response_model=Optional[schemas_v2.Judging2ndResult])
def get_judging_participant_by_id(judging_result_id: int, db: Session = Depends(get_db)):
    return db.query(models.Judging2ndResult).filter(
        models.Judging2ndResult.id == judging_result_id
    ).first()


@router.delete("/{judging_result_id}", status_code=status.HTTP_204_NO_CONTENT)
def get_judging_participant_by_id(judging_result_id: int, db: Session = Depends(get_db)):
    db.query(models.Judging2ndResult).filter(
        models.Judging2ndResult.id == judging_result_id
    ).delete()

# @router.get("/{judging_event_id}/all/excel")
# def get_all_participant_excel_by_event_id(judging_event_id: int, db: Session = Depends(get_db)):
#     db_judging_results: List[models.Judging2ndResult] = db.query(models.Judging2ndResult).filter(
#         models.Judging2ndResult.judging_event_id == judging_event_id).all()

#     file_content = ",".join(
#         [
#             "N차 심사", "",
#             "평가자 ID", "평가자 이름", "평가자 이메일", "",
#             "심사 대상자 ID", "심사 대상자 이름", "심사 대상자 이메일", "",
#             "총점", "",
#             "우월성", "혁신성", "차별성", "기술 경쟁강도", "파급성", "혁신성", "",
#             "시장진입 가능성", "시장 경쟁강도", "시장 경쟁의 변화", "시장의 성장전망", "",
#             "예상 시장 점유율", "사업화 준비기간", "사업화 소요자금", "생산 용이성", "매출 성장추세", "수익성", "파생적 매출", "신제품 출현 가능성", "",
#             "기타 고려 사항", "종합의견"
#         ]
#     )

#     file_content += "\n"

#     for db_judgint_result in db_judging_results:
#         file_content += ",".join(
#             [
#                 str(item) for item in [
#                     db_judgint_result.nth, "",
#                     db_judgint_result.user.id, db_judgint_result.user.name, db_judgint_result.user.email, "",
#                     db_judgint_result.participant.id, db_judgint_result.participant.name, db_judgint_result.participant.email, "",
#                     db_judgint_result.total_score, "",
#                     db_judgint_result.technical_score1, db_judgint_result.technical_score2, db_judgint_result.technical_score3, db_judgint_result.technical_score4, db_judgint_result.technical_score5, db_judgint_result.technical_score6,  "",
#                     db_judgint_result.marketability_score1, db_judgint_result.marketability_score2, db_judgint_result.marketability_score3, db_judgint_result.marketability_score4, "",
#                     db_judgint_result.business_score1, db_judgint_result.business_score2, db_judgint_result.business_score3, db_judgint_result.business_score4, db_judgint_result.business_score5, db_judgint_result.business_score6, db_judgint_result.business_score7, db_judgint_result.business_score8, "",
#                     db_judgint_result.other_score1, db_judgint_result.other_comment
#                 ]
#             ]
#         )

#         file_content += "\n"

#     workbook = openpyxl.Workbook()
#     worksheet = workbook.active
#     reader = csv.reader(io.StringIO(file_content))
#     for row in reader:
#         worksheet.append(row)

#     workbook.save("results.xlsx")

#     return FileResponse("results.xlsx")
