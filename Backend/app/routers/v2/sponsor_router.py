from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/sponsor",
)


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
def create_sponsor(sponsor_create: schemas_v2.SponsorCreate,  current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    crud.create_sponsor(
        db=db,
        sponsor_create=sponsor_create,
        user_id=current_user.id
    )


@router.get("/all", response_model=schemas_v2.SponsorList)
def get_all_sponsors(skip: int = 0, limit: int = 200, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    db_sponsors = db.query(models.Sponsor).order_by(models.Sponsor.id.desc())

    return schemas_v2.SponsorList(
        total=db_sponsors.count(),
        items=db_sponsors.offset(skip).limit(limit).all(),
    )
