from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/api/v1/popup",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_popup(popup_create: schemas.PopupCreate = Depends(schemas.PopupCreate), file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create popup"
        )

    image_filename = upload_file(file, "upload")

    crud.create_popup(
        db=db,
        popup_create=popup_create,
        image_filename=image_filename
    )


@router.get("/all", response_model=schemas.PopupList)
async def get_popups(skip: int = 0, limit: int = 40, db: Session = Depends(get_db), ):
    return crud.get_popups(db=db, skip=skip, limit=limit)


@router.get("/all/active", response_model=schemas.PopupList)
async def get_active_popups(db: Session = Depends(get_db), ):
    return crud.get_active_popups(db=db)


@router.get("/get/{popup_id}", response_model=schemas.Popup)
async def get_popup(popup_id: int, db: Session = Depends(get_db)):
    db_popup = crud.get_popup(db=db, popup_id=popup_id)
    if not db_popup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_popup


@router.put("/update/content/{popup_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_popup(popup_id: int, popup_update: schemas.PopupUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit this popup"
        )

    db_popup = crud.get_popup(db=db, popup_id=popup_id)
    if not db_popup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    crud.update_popup_content(
        db=db,
        popup_id=popup_id,
        popup_update=popup_update
    )


@router.put("/update/image/{popup_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_popup(popup_id: int, file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit this popup"
        )

    db_popup = crud.get_popup(db=db, popup_id=popup_id)
    if not db_popup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    delete_file(db_popup.image_filename, "upload")
    image_filename = upload_file(file, "upload")

    crud.update_popup_image(
        db=db,
        popup_id=popup_id,
        image_filename=image_filename
    )


@router.delete("/{popup_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_popup(popup_id: int, db: Session = Depends(get_db)):
    db_popup = crud.get_popup(db=db, popup_id=popup_id)
    if not db_popup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    if db_popup.image_filename:
        delete_file(db_popup.image_filename, "popup")

    crud.delete_popup(db=db, popup_id=popup_id)
