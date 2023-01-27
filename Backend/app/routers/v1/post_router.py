from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/api/v1/post",
)


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_post(post_create: schemas.PostCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a post"
        )
    crud.create_post(
        db=db,
        post_create=post_create,
        author_name=current_user.name
    )


@router.get("/all", response_model=schemas.PostList)
def get_all_posts(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    total, post_list = crud.get_posts(db=db, skip=skip, limit=limit)
    new_post_list = []
    for post in post_list:
        post.files = json.loads(post.files)
        new_post_list.append(post)
    return schemas.PostList(total=total, posts=new_post_list)


@router.get("/{board_id}/all", response_model=schemas.PostList)
def get_posts(board_id: int, skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    total, post_list = crud.get_posts_by_board_id(
        db=db, skip=skip, limit=limit, board_id=board_id)
    new_post_list = []
    for post in post_list:
        post.files = json.loads(post.files)
        new_post_list.append(post)
    return schemas.PostList(total=total, posts=new_post_list)


@router.get("/{post_id}", response_model=schemas.Post)
def get_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post_by_post_id(db=db, post_id=post_id)
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} does not exist"
        )
    db_post.files = json.loads(db_post.files)

    return db_post


@router.put("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def edit_post(post_id: int, post_edit: schemas.PostEdit, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    crud.edit_post(db=db, post_id=post_id, post_edit=post_edit)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    crud.delete_post(db=db, post_id=post_id)
