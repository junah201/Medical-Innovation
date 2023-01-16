from datetime import timedelta, datetime

from fastapi import APIRouter, HTTPException, Depends, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas
from app.database.database import get_db
from app.utils.verify import verify_password
from app.utils.oauth2 import AuthJWT
from app.common.config import ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN

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
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends(),
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

    access_token = Authorize.create_access_token(
        subject=str(user.email),
        expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN),
    )

    refresh_token = Authorize.create_refresh_token(
        subject=str(user.email),
        expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN),
    )

    response.set_cookie(
        key='access_token',
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRES_IN * 60,
        expires=ACCESS_TOKEN_EXPIRES_IN * 60,
        path='/',
        domain=None,
        secure=False,
        httponly=True,
        samesite='lax'
    )
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        max_age=REFRESH_TOKEN_EXPIRES_IN * 60,
        expires=REFRESH_TOKEN_EXPIRES_IN * 60,
        path='/',
        domain=None,
        secure=False,
        httponly=True,
        samesite='lax'
    )
    response.set_cookie(
        key='logged_in',
        value='True',
        max_age=ACCESS_TOKEN_EXPIRES_IN * 60,
        expires=ACCESS_TOKEN_EXPIRES_IN * 60,
        path='/',
        domain=None,
        secure=False,
        httponly=False,
        samesite='lax'
    )

    return {"status": "success", "access_token": access_token, "refresh_token": refresh_token}


@router.get('/refresh')
def refresh(response: Response, request: Request, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    try:
        Authorize.jwt_refresh_token_required()

        current_user_email = Authorize.get_jwt_subject()
        if not current_user_email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not refresh token",
            )
        user = crud.get_user_by_email(db, current_user_email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Could not refresh access token',
            )
        access_token = Authorize.create_access_token(
            subject=str(user.email),
            expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN),
        )
    except Exception as e:
        error = e.__class__.__name__
        if error == 'MissingTokenError':
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail='Please provide refresh token')
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    response.set_cookie(
        key='access_token',
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRES_IN * 60,
        expires=ACCESS_TOKEN_EXPIRES_IN * 60,
        path='/',
        domain=None,
        secure=False,
        httponly=True,
        samesite='lax'
    )
    response.set_cookie(
        key='logged_in',
        value='True',
        max_age=ACCESS_TOKEN_EXPIRES_IN * 60,
        expires=ACCESS_TOKEN_EXPIRES_IN * 60,
        path='/',
        domain=None,
        secure=False,
        httponly=False,
        samesite='lax'
    )
    return {'access_token': access_token}


@router.get("/logout", status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    Authorize.jwt_required()
    user_email = Authorize.get_jwt_subject()
    db_user = crud.get_user_by_email(db, user_email)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='User no longer exist',
        )

    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)
    return {"status": "success"}
