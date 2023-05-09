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
        models.JudgingResult.participant_id == judging_result_create.participant_id
    ).first()

    if db_judging_result:
        db_judging_result.user_id = current_user.id
        db_judging_result.judging_event_id = judging_result_create.judging_event_id
        db_judging_result.participant_id = judging_result_create.participant_id
        db_judging_result.score1 = judging_result_create.score1
        db_judging_result.score2 = judging_result_create.score2
        db_judging_result.score3 = judging_result_create.score3
        db_judging_result.score4 = judging_result_create.score4
        db_judging_result.score5 = judging_result_create.score5
        db_judging_result.score6 = judging_result_create.score6
        db_judging_result.score7 = judging_result_create.score7
        db_judging_result.score8 = judging_result_create.score8
        db_judging_result.score9 = judging_result_create.score9
        db_judging_result.score10 = judging_result_create.score10
        db_judging_result.other_comment = judging_result_create.other_comment
        db.commit()
    else:
        db_judging_result = models.JudgingResult(
            user_id=current_user.id,
            judging_event_id=judging_result_create.judging_event_id,
            participant_id=judging_result_create.participant_id,
            score1=judging_result_create.score1,
            score2=judging_result_create.score2,
            score3=judging_result_create.score3,
            score4=judging_result_create.score4,
            score5=judging_result_create.score5,
            score6=judging_result_create.score6,
            score7=judging_result_create.score7,
            score8=judging_result_create.score8,
            score9=judging_result_create.score9,
            score10=judging_result_create.score10,
            comment=judging_result_create.other_comment,
        )
        db.add(db_judging_result)
        db.commit()


@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
def update_judging_result(judging_result_update: schemas.JudgingResultUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_judging_result: models.JudgingResult = db.query(models.JudgingResult).filter(
        models.JudgingResult.user_id == current_user.id,
        models.JudgingResult.judging_event_id == judging_result_update.judging_event_id,
        models.JudgingResult.participant_id == judging_result_update.participant_id
    ).first()

    if not db_judging_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="result not found"
        )

    db_judging_result.score1 = judging_result_update.score1
    db_judging_result.score2 = judging_result_update.score2
    db_judging_result.score3 = judging_result_update.score3
    db_judging_result.score4 = judging_result_update.score4
    db_judging_result.score5 = judging_result_update.score5
    db_judging_result.score6 = judging_result_update.score6
    db_judging_result.score7 = judging_result_update.score7
    db_judging_result.score8 = judging_result_update.score8
    db_judging_result.score9 = judging_result_update.score9
    db_judging_result.score10 = judging_result_update.score10
    db_judging_result.other_comment = judging_result_update.other_comment

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
        participants=db_all_judging_result.offset(
            skip).limit(limit).all()
    )


@router.get("/get/{judging_result_id}", response_model=Optional[schemas.JudgingResult])
def get_judging_participant(judging_result_id: int, db: Session = Depends(get_db)):
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
