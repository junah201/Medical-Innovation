import json
from pprint import pprint
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import models, schemas_v3
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional

router = APIRouter(
    prefix="/judging_result",
)


@router.post(
    "/{event_id}/{participant_id}/{nth}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="심사 결과 등록 및 수정"
)
def create_judging_result(
    event_id: int,
    participant_id: int,
    nth: int,
    judging_result_create: dict,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_judging_event: Optional[models.JudgingEvent] = db.query(models.JudgingEvent).filter(
        models.JudgingEvent.id == event_id).first()

    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 심사 행사를 찾을 수 없습니다."
        )

    db_judging_participant: Optional[models.JudgingParticipant2] = db.query(models.JudgingParticipant2).filter(
        models.JudgingParticipant2.id == participant_id).first()

    if not db_judging_participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 행사 참가자를 찾을 수 없습니다."
        )

    db_judging_result = db.query(models.JudgingResult2).filter(
        models.JudgingResult2.user_id == current_user.id,
        models.JudgingResult2.judging_event_id == event_id,
        models.JudgingResult2.participant_id == participant_id,
        models.JudgingResult2.nth == nth
    ).first()

    total_score = 0
    for key, item in judging_result_create.items():
        if isinstance(item, int):
            total_score += item
        elif isinstance(item, str) and item.isdigit():
            total_score += int(item)

    if db_judging_result:
        db_judging_result.results = json.dumps(
            judging_result_create,
            ensure_ascii=False
        )
        db_judging_result.total_score = total_score
        db.commit()
    else:
        db_judging_result = models.JudgingResult2(
            user_id=current_user.id,
            judging_event_id=event_id,
            participant_id=participant_id,
            nth=nth,
            results=json.dumps(
                judging_result_create,
                ensure_ascii=False
            ),
            total_score=total_score
        )
        db.add(db_judging_result)
        db.commit()


@router.get(
    "/{judging_event_id}/all",
    response_model=schemas_v3.JudgingResultList,
    summary="특정 심사 행사의 심사 결과 목록 조회"
)
def get_judging_results(judging_event_id: int, skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_judging_event = db.query(models.JudgingEvent).filter(
        models.JudgingEvent.id == judging_event_id).first()

    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 심사 행사를 찾을 수 없습니다."
        )

    db_all_judging_result = db.query(models.JudgingResult2).filter(models.JudgingResult2.judging_event_id == judging_event_id).order_by(
        models.JudgingResult2.id.desc())

    results: List[models.JudgingResult2] = db_all_judging_result.offset(
        skip).limit(limit).all()

    for db_judging_result in results:
        db_judging_result.results = json.loads(db_judging_result.results)
        if isinstance(db_judging_result.participant.application, str):
            db_judging_result.participant.application = json.loads(
                db_judging_result.participant.application)

    return schemas_v3.JudgingResultList(
        total=db_all_judging_result.count(),
        items=results
    )


@router.get(
    "/get",
    response_model=Optional[schemas_v3.JudgingResult],
    summary="특정 심사 결과 조회"
)
def get_judging_participant_nth(
    judging_event_id: int,
    participant_id: int,
    nth: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_judging_result: Optional[models.JudgingResult2] = db.query(models.JudgingResult2).filter(
        models.JudgingResult2.judging_event_id == judging_event_id,
        models.JudgingResult2.participant_id == participant_id,
        models.JudgingResult2.nth == nth,
        models.JudgingResult2.user_id == current_user.id
    ).first()

    if not db_judging_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 심사 결과를 찾을 수 없습니다."
        )

    db_judging_result.results = json.loads(db_judging_result.results)
    db_judging_result.participant.application = json.loads(
        db_judging_result.participant.application)

    return db_judging_result


@router.get(
    "/{judging_result_id}",
    response_model=Optional[schemas_v3.JudgingResult],
    summary="특정 ID의 심사 결과 조회"
)
def get_judging_participant_by_id(judging_result_id: int, db: Session = Depends(get_db)):
    result: Optional[models.JudgingResult2] = db.query(models.JudgingResult2).filter(
        models.JudgingResult2.id == judging_result_id
    ).first()

    if not result:
        return None

    result.results = json.loads(result.results)
    return result
