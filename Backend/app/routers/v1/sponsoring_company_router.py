from fastapi import APIRouter, HTTPException, Depends, File,  UploadFile, status
from sqlalchemy.orm import Session
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List

router = APIRouter(
    prefix="/api/v1/sponsoring_company",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_sponsoring_company(sponsoring_company_create: schemas.SponsoringCompanyCreate = Depends(schemas.SponsoringCompanyCreate),  file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a create_sponsoring"
        )

    filename = ""
    if file:
        filename = upload_file(file, "upload")

    crud.create_sponsoring_company(
        db=db, sponsoring_company_create=sponsoring_company_create, filename=filename)


@router.get("/all", response_model=List[schemas.SponsoringCompany])
async def get_sponsoring_companies(db: Session = Depends(get_db)):
    db_sponsoring_companies = crud.get_sponsoring_companies(db=db)
    if not db_sponsoring_companies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )
    return db_sponsoring_companies


@router.get("/get/{sponsoring_company_id}", response_model=schemas.SponsoringCompany)
async def get_sponsoring_company_by_id(sponsoring_company_id: int, db: Session = Depends(get_db)):
    db_sponsoring_company = crud.get_sponsoring_company_by_id(
        db=db, sponsoring_company_id=sponsoring_company_id)

    if not db_sponsoring_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not found"
        )

    return db_sponsoring_company


@router.put("/update/{sponsoring_company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_sponsoring_company(sponsoring_company_id: int, sponsoring_company_update: schemas.SponsoringCompanyUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
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

    crud.update_sponsoring_company(
        db=db,
        sponsoring_company_id=sponsoring_company_id,
        sponsoring_company_update=sponsoring_company_update
    )


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
