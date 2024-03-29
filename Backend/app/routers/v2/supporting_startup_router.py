from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/supporting_startup",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_supporting_startup(supporting_startup_create: schemas_v2.SupportingStartupCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a supporting_startup"
        )

    crud.create_supporting_startup(
        db=db, supporting_startup_create=supporting_startup_create)


@router.get("/all", response_model=schemas_v2.SupportingStartupList)
async def get_supporting_startups(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_all_supporting_startup = db.query(models.SupportingStartup).order_by(
        models.SupportingStartup.id.desc())
    return schemas_v2.SupportingStartupList(
        total=db_all_supporting_startup.count(),
        items=db_all_supporting_startup.offset(
            skip).limit(limit).all()
    )


@router.get("/{supporting_startup_id}", response_model=schemas_v2.SupportingStartup)
async def get_supporting_startup(supporting_startup_id: int, db: Session = Depends(get_db)):
    return crud.get_supporting_startup(db=db, supporting_startup_id=supporting_startup_id)


@router.put("/{supporting_startup_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_history(supporting_startup_id: int, supporting_startup_update: schemas_v2.SupportingStartupUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a supporting_startup"
        )

    db_supporting_startup_id = crud.get_supporting_startup(
        db=db, supporting_startup_id=supporting_startup_id)

    if not db_supporting_startup_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    crud.update_supporting_startup(
        db=db,
        supporting_startup_id=supporting_startup_id,
        supporting_startup_update=supporting_startup_update
    )


@router.delete("/{supporting_startup_id}", status_code=status.HTTP_204_NO_CONTENT)
async def get_sponsoring_companies(supporting_startup_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a supporting_startup"
        )

    db_supporting_startup_id = crud.get_supporting_startup(
        db=db, supporting_startup_id=supporting_startup_id)

    if not db_supporting_startup_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    crud.delete_supporting_startup(
        db=db, supporting_startup_id=supporting_startup_id)
