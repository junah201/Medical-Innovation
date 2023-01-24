from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/api/v1/sponsor",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_post(sponsor_create: schemas.SponsorCreate,  current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
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
