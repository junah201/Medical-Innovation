from sqlalchemy.orm import Session
from app.database import models, schemas
from app.utils.verify import hash_password
from datetime import datetime
import json
from typing import List


def create_user(db: Session, user_create: schemas.UserCreate):
    utcnow = datetime.utcnow()
    db_user = models.User(
        name=user_create.name,
        phone=user_create.phone,
        email=user_create.email,
        password=hash_password(user_create.password),
        birth=user_create.birth,
        email_enable=user_create.email_enable,
        is_admin=False,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_user)
    db.commit()


def get_existing_user(db: Session, user_create: schemas.UserCreate):
    return db.query(models.User).filter(
        models.User.email == user_create.email
    ).first()


def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()


def create_mou(db: Session, mou_create: schemas.MouCreate):
    utcnow = datetime.utcnow()
    db_mou = models.Mou(
        name=mou_create.name,
        filename=mou_create.filename,
        link=mou_create.link,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_mou)
    db.commit()


def get_mous(db: Session):
    db_mous = db.query(models.Mou).order_by(models.Mou.name.desc())
    return db_mous.all()


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


def create_post(db: Session, post_create: schemas.PostCreate, author_name: str):
    db_post = models.Post(
        title=post_create.title,
        board_id=post_create.board_id,
        content=post_create.content,
        author_name=author_name,
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
    return db.query(models.Banner).order_by(models.Banner.banner_end_at.desc()).filter(models.Banner.banner_end_at > datetime.utcnow()).all()


def create_banner(db: Session, banner_create: schemas.BannerCreate):
    utcnow = datetime.utcnow()
    db_banner = models.Banner(
        name=banner_create.name,
        filename=banner_create.filename,
        link=banner_create.link,
        year=banner_create.year,
        banner_end_at=banner_create.banner_end_at,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_banner)
    db.commit()


def create_sponsor(db: Session, sponsor_create: schemas.SponsorCreate, user_id: int):
    utcnow = datetime.utcnow()
    db_sponsor = models.Sponsor(
        user_id=user_id,
        name=sponsor_create.name,
        phone=sponsor_create.phone,
        identification_number=sponsor_create.identification_number,
        address=sponsor_create.address,
        usage=sponsor_create.usage,
        detail=sponsor_create.detail,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_sponsor)
    db.commit()


def get_sponsoring_companies(db: Session) -> List[models.Banner]:
    return db.query(models.SponsoringCompany).order_by(models.SponsoringCompany.year.desc()).all()


def create_sponsoring_company(db: Session, sponsoring_company_create: schemas.SponsoringCompanyCreate):
    utcnow = datetime.utcnow()
    db_sponsoring_company = models.SponsoringCompany(
        name=sponsoring_company_create.name,
        filename=sponsoring_company_create.filename,
        link=sponsoring_company_create.link,
        year=sponsoring_company_create.year,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_sponsoring_company)
    db.commit()
