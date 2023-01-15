from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.database import models, schemas
from datetime import datetime
import json
from typing import List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user_create: schemas.UserCreate):
    utcnow = datetime.utcnow()
    db_user = models.User(
        name=user_create.name,
        password=pwd_context.hash(user_create.password),
        email=user_create.email,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_user)
    db.commit()


def get_existing_user(db: Session, user_create: schemas.UserCreate):
    return db.query(models.User).filter(
        (models.User.name == user_create.name) |
        (models.User.email == user_create.email)
    ).first()


def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.name == name).first()


def create_board(db: Session, board_create: schemas.BoardCreate):
    utcnow = datetime.utcnow()
    db_board = models.Board(
        name=board_create.name,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_board)
    db.commit()


def get_boards(db: Session, skip: int = 0, limit: int = 15):
    db_boards = db.query(models.Board).order_by(models.Board.created_at.desc())
    return db_boards.offset(skip).limit(limit).all()


def create_post(db: Session, post_create: schemas.PostCreate):
    db_post = models.Post(
        title=post_create.title,
        board_id=post_create.board_id,
        content=post_create.content,
        author_name=post_create.author_name,
        files=json.dumps(post_create.files, ensure_ascii=False),
    )

    db.add(db_post)
    db.commit()


def update_post(db: Session, post_id: int, post_content: str):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    db_post.content = post_content
    db.commit()


def get_posts_by_board_id(db: Session, board_id: int, skip: int = 0, limit: int = 15) -> tuple[int, list[models.Post]]:
    db_posts = db.query(models.Post).filter(
        models.Post.board_id == board_id).order_by(models.Post.created_at.desc())
    return db_posts.count(), db_posts.offset(skip).limit(limit).all()


def get_post_by_post_id(db: Session, post_id: int) -> models.Post:
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def get_banners(db: Session) -> List[models.Banner]:
    return db.query(models.Banner).order_by(models.Banner.year.desc()).all()


def create_banner(db: Session, banner_create: schemas.BannerCreate):
    utcnow = datetime.utcnow()
    db_banner = models.Banner(
        name=banner_create.name,
        filename=banner_create.filename,
        link=banner_create.link,
        year=banner_create.year,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_banner)
    db.commit()
