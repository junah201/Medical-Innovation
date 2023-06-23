from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
import json
from app.database import crud, schemas_v2, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user
from app.utils.aws_s3 import upload_file, delete_file
from typing import List, Optional

router = APIRouter(
    prefix="/post",
)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_post(post_create: schemas_v2.PostCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to create a post"
        )

    db_post = models.Post(
        title=post_create.title,
        board_id=post_create.board_id,
        content=post_create.content,
        author_name=current_user.name,
        files=json.dumps(post_create.files, ensure_ascii=False),
    )
    db.add(db_post)
    db.commit()


@router.get("/all", response_model=schemas_v2.PostList)
def get_all_posts(skip: int = 0, limit: int = 40, db: Session = Depends(get_db)):
    db_posts = db.query(models.Post)
    total = db_posts.count()
    post_list: models.Post = db_posts.offset(skip).limit(limit).all()
    new_post_list = []
    for post in post_list:
        post.files = json.loads(post.files)
        new_post_list.append(post)
    return schemas_v2.PostList(total=total, items=new_post_list)


@router.get("/{board_id}/all", response_model=schemas_v2.PostList)
def get_posts(board_id: int, skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    db_posts = db.query(models.Post).filter(models.Post.board_id == board_id)
    total = db_posts.count()
    post_list: models.Post = db_posts.offset(skip).limit(limit).all()
    new_post_list = []
    for post in post_list:
        post.files = json.loads(post.files)
        new_post_list.append(post)
    return schemas_v2.PostList(total=total, items=new_post_list)


@router.get("/{post_id}", response_model=schemas_v2.Post)
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
def edit_post(post_id: int, post_edit: schemas_v2.PostEdit, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )

    db_post = crud.get_post_by_post_id(db=db, post_id=post_id)
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} does not exist"
        )

    db_post.title = post_edit.title
    db_post.board_id = post_edit.board_id
    db_post.content = post_edit.content
    db_post.files = json.dumps(post_edit.files, ensure_ascii=False)

    db.commit()
    db.refresh(db_post)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete a post"
        )
    db_post = crud.get_post_by_post_id(db=db, post_id=post_id)
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} does not exist"
        )

    for file in json.loads(db_post.files):
        delete_file(filename=file, folder="upload")

    crud.delete_post(db=db, post_id=post_id)
