from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, BOOLEAN, func
from sqlalchemy.orm import relationship
from app.database.database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        nullable=False,
        comment="유저 고유 번호",
    )
    name = Column(
        String(20),
        unique=False,
        nullable=False,
        comment="이름",
    )
    phone = Column(
        String(20),
        unique=False,
        nullable=True,
        default="01000000000",
        server_default="01000000000",
        comment="전화번호",
    )
    email = Column(
        String(50),
        unique=True,
        nullable=False,
        comment="이메일 주소 (로그인 아이디)",
    )
    password = Column(
        String(60),
        nullable=False,
        comment="해쉬된 비밀번호",
    )
    birth = Column(
        String(10),
        nullable=False,
        default="1900-01-01",
        server_default="1900-01-01",
        comment="생년월일",
    )
    is_admin = Column(
        BOOLEAN,
        nullable=False,
        default=False,
        comment="관리자 여부",
    )
    email_enable = Column(
        BOOLEAN,
        nullable=False,
        default=True,
        comment="이메일 수신 여부",
    )
    posts = relationship("Post", back_populates="author")
    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점",
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )

    class Config:
        orm_mode = True


class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, unique=True)
    title = Column(String(100), nullable=False)
    board_id = Column(Integer, ForeignKey("board.id"))
    board = relationship("Board", back_populates="posts")
    content = Column(String(3000), nullable=False)
    author_name = Column(String(20), ForeignKey("user.name"))
    author = relationship("User", back_populates="posts")
    files = Column(String(1000))
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

    class Config:
        orm_mode = True


class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(String(20), nullable=False)
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

    class Config:
        orm_mode = True


class Banner(Base):
    __tablename__ = "banner"

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="회사 고유 번호"
    )
    name = Column(
        String(30),
        nullable=False,
        comment="회사명"
    )
    filename = Column(
        String(40),
        nullable=False,
        comment="파일명"
    )
    link = Column(
        String(100),
        nullable=False,
        comment="홈페이지 링크"
    )
    year = Column(
        String(4),
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

    class Config:
        orm_mode = True
