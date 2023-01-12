from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, BOOLEAN, func
from sqlalchemy.orm import relationship
from app.database.database import Base
from typing import List


class User(Base):
    __tablename__ = "user"

    id = Column(
        Integer,
        primary_key=True
    )
    name = Column(
        String,
        unique=True,
        nullable=False
    )
    password = Column(
        String,
        nullable=False
    )
    email = Column(
        String,
        unique=True,
        nullable=False
    )
    is_admin = Column(
        BOOLEAN,
        nullable=False,
        default=False
    )
    posts = relationship("Post", back_populates="author")
    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점"
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )


class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, unique=True)
    title = Column(String, nullable=False)
    board_id = Column(Integer, ForeignKey("board.id"))
    board = relationship("Board", back_populates="posts")
    content = Column(String, nullable=False)
    author_name = Column(String, ForeignKey("user.name"))
    author = relationship("User", back_populates="posts")
    files = Column(JSON)
    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점"
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )


class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(String, nullable=False)
    posts = relationship("Post", back_populates="board")
    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점"
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )


class Banner(Base):
    __tablename__ = "banner"

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="회사명"
    )
    name = Column(
        String,
        nullable=False,
        comment="회사명"
    )
    filename = Column(
        String,
        nullable=False,
        comment="파일명"
    )
    link = Column(
        String,
        nullable=False,
        comment="홈페이지 링크"
    )
    year = Column(
        String,
        nullable=False,
        comment="후원 시작 년도"
    )
    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점"
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )
