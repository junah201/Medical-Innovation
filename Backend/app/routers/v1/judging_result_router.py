from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from typing import List, Optional
from app.utils.email import send_email

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

    return schemas.JudgingResultList(
        total=db_all_judging_result.count(),
        results=db_all_judging_result.offset(
            skip).limit(limit).all()
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
