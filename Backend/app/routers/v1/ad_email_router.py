from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, BackgroundTasks
from sqlalchemy.orm import Session

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.email import send_email

from typing import List, Optional

router = APIRouter(
    prefix="/api/v1/ad_email",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_ad_email(ad_email_create: schemas.AdEmailCreate,  db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a ad_email"
        )

    db_ad_email: Optional[models.AdEmail] = db.query(models.AdEmail).filter(
        models.AdEmail.email == ad_email_create.email).first()

    if db_ad_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    crud.create_ad_email(db=db, ad_email_create=ad_email_create)


@router.get("/all", response_model=schemas.AdEmailList)
def get_ad_emails(skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    return crud.get_ad_emails(db=db, skip=skip, limit=limit)


@router.get("/get/{ad_email_id}", response_model=schemas.AdEmail)
def get_ad_email(ad_email_id: int, db: Session = Depends(get_db)):
    db_ad_email = crud.get_ad_email(db=db, ad_email_id=ad_email_id)
    if not db_ad_email:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ad_email not found"
        )
    return db_ad_email


@router.delete("/delete/{ad_email_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ad_email(ad_email_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a ad_email"
        )

    db_ad_email = crud.get_ad_email(db=db, ad_email_id=ad_email_id)
    if not db_ad_email:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ad_email not found"
        )

    crud.delete_ad_email(db=db, ad_email_id=ad_email_id)


@router.put("/update/{ad_email_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_ad_email(ad_email_id: int, ad_email_update: schemas.AdEmailCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a ad_email"
        )
    crud.update_ad_email(
        db=db, ad_email_id=ad_email_id, ad_email_update=ad_email_update)


@router.post("/send/all", status_code=status.HTTP_200_OK)
def send_ad_email_all(
    background_tasks: BackgroundTasks,
    email_content: schemas.AdEmailContent = Depends(schemas.AdEmailContent),
    files: Optional[List[UploadFile]] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a ad_email"
        )

    if not files:
        files = []

    db_ad_emails = crud.get_ad_emails(db=db, skip=0, limit=10000000)

    for db_ad_email in db_ad_emails.ad_emails:
        background_tasks.add_task(
            send_email,
            receiver_address=db_ad_email.email,
            subject=email_content.title,
            content=email_content.content,
            files=files
        )


@router.post("/send/one", status_code=status.HTTP_200_OK)
async def send_ad_email_one(email_content: schemas.AdEmailContent = Depends(schemas.AdEmailContent), files: List[UploadFile] = None, current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to send a test ad_email"
        )

    if not files:
        files = []

    send_email(
        receiver_address=email_content.email,
        subject=email_content.title,
        content=email_content.content,
        files=files
    )
