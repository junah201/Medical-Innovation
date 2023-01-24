from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, BOOLEAN, func, VARCHAR, VARCHAR
from sqlalchemy.orm import relationship
from app.database.database import Base


class User(Base):
    __tablename__ = "user"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        nullable=False,
        comment="유저 고유 번호",
    )
    name = Column(
        VARCHAR(20),
        unique=False,
        nullable=False,
        comment="이름",
    )
    phone = Column(
        VARCHAR(20),
        unique=False,
        nullable=True,
        default="01000000000",
        server_default="01000000000",
        comment="전화번호",
    )
    email = Column(
        VARCHAR(50),
        unique=True,
        nullable=False,
        comment="이메일 주소 (로그인 아이디)",
    )
    password = Column(
        VARCHAR(100),
        nullable=False,
        comment="해쉬된 비밀번호",
    )
    birth = Column(
        VARCHAR(10),
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
    sponsors = relationship("Sponsor", back_populates="user")
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
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, unique=True)
    title = Column(VARCHAR(100), nullable=False)
    board_id = Column(Integer, ForeignKey("board.id"))
    board = relationship("Board", back_populates="posts")
    content = Column(VARCHAR(3000), nullable=False)
    author_name = Column(VARCHAR(20), ForeignKey("user.name"))
    author = relationship("User", back_populates="posts")
    files = Column(VARCHAR(1000))
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
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(VARCHAR(20), nullable=False)
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
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="회사 고유 번호"
    )
    name = Column(
        VARCHAR(30),
        nullable=False,
        comment="회사명"
    )
    filename = Column(
        VARCHAR(40),
        nullable=False,
        comment="파일명"
    )
    link = Column(
        VARCHAR(100),
        nullable=False,
        comment="홈페이지 링크"
    )
    year = Column(
        VARCHAR(4),
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


class Mou(Base):
    __tablename__ = "mou"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="회사 고유 번호"
    )
    name = Column(
        VARCHAR(30),
        nullable=False,
        comment="회사명"
    )
    filename = Column(
        VARCHAR(40),
        nullable=False,
        comment="파일명"
    )
    link = Column(
        VARCHAR(100),
        nullable=False,
        comment="홈페이지 링크"
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


class Sponsor(Base):
    __tablename__ = "sponsor"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="후원 고유 번호"
    )
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="sponsors")
    name = Column(
        VARCHAR(100),
        nullable=False,
        comment="성명 (단체명)"
    )
    phone = Column(
        VARCHAR(20),
        nullable=False,
        comment="전화번호"
    )
    identification_number = Column(
        VARCHAR(100),
        nullable=False,
        comment="주민등록번호 (사업자등록번호)"
    )
    address = Column(
        VARCHAR(100),
        nullable=False,
        comment="주소"
    )
    usage = Column(
        VARCHAR(20),
        nullable=False,
        comment="희망 사용처"
    )
    detail = Column(
        VARCHAR(2000),
        nullable=False,
        comment="기부 내용"
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
