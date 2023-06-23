from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/sponsoring_company",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_sponsoring_company(sponsoring_company_create: schemas_v2.SponsoringCompanyCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a create_sponsoring"
        )

    db_sponsoring_company = models.SponsoringCompany(
        name=sponsoring_company_create.name,
        filename=sponsoring_company_create.filename,
        link=sponsoring_company_create.link,
        year=sponsoring_company_create.year,
    )
    db.add(db_sponsoring_company)
    db.commit()


@router.get("/all", response_model=schemas_v2.SponsoringCompanyList)
async def get_sponsoring_companies(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    return crud.get_sponsoring_companies(db=db, skip=skip, limit=limit)


@router.get("/{sponsoring_company_id}", response_model=schemas_v2.SponsoringCompany)
async def get_sponsoring_company_by_id(sponsoring_company_id: int, db: Session = Depends(get_db)):
    db_sponsoring_company = crud.get_sponsoring_company_by_id(
        db=db, sponsoring_company_id=sponsoring_company_id)

    if not db_sponsoring_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    return db_sponsoring_company


@router.put("/{sponsoring_company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_sponsoring_company(sponsoring_company_id: int, sponsoring_company_update: schemas_v2.SponsoringCompanyUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update a sponsoring_company"
        )

    db_sponsoring_company = crud.get_sponsoring_company_by_id(
        db=db, sponsoring_company_id=sponsoring_company_id)

    if not db_sponsoring_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    db_sponsoring_company.name = sponsoring_company_update.name
    db_sponsoring_company.link = sponsoring_company_update.link
    db_sponsoring_company.year = sponsoring_company_update.year
    db_sponsoring_company.filename = sponsoring_company_update.filename
    db.commit()
    db.refresh(db_sponsoring_company)


@router.delete("/{sponsoring_company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def get_sponsoring_companies(sponsoring_company_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a sponsoring_company"
        )

    db_sponsoring_company = crud.get_sponsoring_company_by_id(
        db=db, sponsoring_company_id=sponsoring_company_id)

    if not db_sponsoring_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    if db_sponsoring_company.filename:
        delete_file(db_sponsoring_company.filename, "upload")

    crud.delete_sponsoring_company(
        db=db, sponsoring_company_id=sponsoring_company_id)
