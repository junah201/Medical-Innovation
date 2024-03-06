from datetime import timedelta, datetime

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
import openpyxl
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.verify import verify_password
from app.utils.oauth2 import create_access_token, get_current_user
from app.common.config import ACCESS_TOKEN_EXPIRES_IN

router = APIRouter(
    prefix="/user",
)


@router.post("/signup", status_code=status.HTTP_204_NO_CONTENT)
def user_create(user_create: schemas_v2.UserCreate, db: Session = Depends(get_db)):
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
            detail="Incorrect Email or Password",
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


@router.get("/me", response_model=schemas_v2.User)
def get_user_me(current_user: models.User = Depends(get_current_user)):
    return current_user


@router.get("/all", response_model=schemas_v2.UserList)
def get_all_users(skip: int, limit: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource."
        )

    db_users = db.query(models.User).order_by(models.User.id.desc())
    total = db_users.count()
    user_list: models.User = db_users.offset(skip).limit(limit).all()

    return schemas_v2.UserList(
        total=total,
        items=user_list
    )


@router.get("/all/excel")
def get_all_users_excel(db: Session = Depends(get_db)):
    users = db.query(models.User).all()

    workbook = openpyxl.Workbook()
    sheet = workbook.active

    sheet.append([
        "ID",
        "이름",
        "전화번호",
        "이메일",
        "생년월일",
        "이메일 수신 여부",
    ])

    for user in users:
        sheet.append([
            str(v) for v in [
                user.id,
                user.name,
                user.phone,
                user.email,
                user.birth,
                user.email_enable,
            ]
        ])

    workbook.save("유저목록.xlsx")
    return FileResponse("유저목록.xlsx")


@router.get("/{user_id}", response_model=schemas_v2.User)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource."
        )

    db_User: models.User = crud.get_user_by_id(db=db, id=user_id)

    if not db_User:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return db_User


@router.put("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_user(user_id: int, user_update: schemas_v2.UserUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource."
        )

    db_user: models.User = db.query(models.User).filter(
        models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    db_user.name = user_update.name or db_user.name
    db_user.phone = user_update.phone or db_user.phone
    db_user.birth = user_update.birth or db_user.birth
    db_user.email_enable = user_update.email_enable or db_user.email_enable
    db.commit()


@router.put("/{user_id}/judging_permission/{judging_event_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_user_judging_permission(user_id: int, judging_event_id: int, judging_permission_create: schemas_v2.JudgingPermissionCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource."
        )

    db_user: models.User = db.query(models.User).filter(
        models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    db_judging_event: models.JudgingEvent = db.query(models.JudgingEvent).filter(
        models.JudgingEvent.id == judging_event_id).first()

    if not db_judging_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Judging event not found."
        )

    db_judging_permission: models.JudgingPermission = db.query(models.JudgingPermission).filter(
        models.JudgingPermission.user_id == user_id, models.JudgingPermission.judging_event_id == judging_event_id).first()

    if not db_judging_permission:
        db_judging_permission = models.JudgingPermission(
            user_id=user_id,
            judging_event_id=judging_event_id,
            first_judging_permission=judging_permission_create.first_judging_permission,
            second_judging_permission=judging_permission_create.second_judging_permission,
        )
        db.add(db_judging_permission)
        db.commit()
    else:
        db_judging_permission.first_judging_permission = judging_permission_create.first_judging_permission
        db_judging_permission.second_judging_permission = judging_permission_create.second_judging_permission
        db.commit()
