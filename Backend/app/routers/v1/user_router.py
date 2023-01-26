from datetime import timedelta, datetime

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.verify import verify_password
from app.utils.oauth2 import create_access_token, get_current_user
from app.common.config import ACCESS_TOKEN_EXPIRES_IN

router = APIRouter(
    prefix="/api/v1/user",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def user_create(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.get_existing_user(db=db, user_create=user_create)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Email already exists.")
    crud.create_user(db=db, user_create=user_create)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_email(db, form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or password",
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Email or Password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "status": "success",
        "access_token": access_token,
        "access_token_expires_in": ACCESS_TOKEN_EXPIRES_IN * 60,
        "is_admin": user.is_admin,
    }


@router.get("/all", response_model=list[schemas.User])
def get_all_users(skip: int, limit: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource."
        )

    return crud.get_users(db=db, skip=skip, limit=limit)
