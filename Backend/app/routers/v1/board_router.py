from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status

from app.database import crud, schemas
from app.database.database import get_db

router = APIRouter(
    prefix="/api/v1/board",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_board(board_create: schemas.BoardCreate, db: Session = Depends(get_db)):
    crud.create_board(db=db, board_create=board_create)


@router.get("/all", response_model=list[schemas.Board])
def get_boards(skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    db_boards = crud.get_boards(db=db, skip=skip, limit=limit)
    if not db_boards:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No boards found"
        )
    return db_boards
