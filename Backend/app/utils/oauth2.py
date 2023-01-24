from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from starlette import status
from app.common.config import JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRES_IN, JWT_ALGORITHM
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, HTTPException, Depends, Response, Request
from app.database import crud, schemas, models
from app.database.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/user/login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )
    return encoded_jwt


def get_sub_by_access_token(token: str):
    payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])

    return payload.get("sub")


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        email: str = get_sub_by_access_token(token)
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db=db, email=email)
    if user is None:
        raise credentials_exception
    return user
