from datetime import timedelta, datetime

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas
from app.database.database import get_db

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "ff00e6676b6e7d5e7dd5e4070c3ee4fbeed4e68a7706728c6519e2a9d6fa8b38"
ALGORITHM = "HS256"

router = APIRouter(
    prefix="/api/v1/user",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def user_create(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.get_existing_user(db=db, user_create=user_create)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="User already exists.")
    crud.create_user(db=db, user_create=user_create)


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not crud.pwd_context.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    data = {
        "sub": user.name,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return schemas.Token(
        access_token=access_token,
        token_type="bearer",
        username=user.name
    )
