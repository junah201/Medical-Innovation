from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, BOOLEAN, func, VARCHAR, VARCHAR, DATE
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import INTEGER
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
    content = Column(VARCHAR(10000), nullable=False)
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
        VARCHAR(200),
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
    banner_end_at = Column(
        DateTime,
        nullable=True,
        comment="배너 노출 종료 시점"
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
        VARCHAR(200),
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


class SponsoringCompany(Base):
    __tablename__ = "sponsoring_company"
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
        VARCHAR(200),
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


class Advisor(Base):
    __tablename__ = "advisor"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        comment="자문단 고유 번호"
    )
    name = Column(
        VARCHAR(30),
        nullable=False,
        comment="자문단 위원 이름"
    )
    description = Column(
        VARCHAR(500),
        nullable=False,
        comment="자문단 위원 설명"
    )
    type = Column(
        VARCHAR(20),
        nullable=False,
        comment="자문단 위원 유형"
    )
    filename = Column(
        VARCHAR(200),
        nullable=False,
        comment="이미지 파일명"
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


class PublicEvent(Base):
    __tablename__ = "public_event"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="참가자 고유 번호"
    )
    participants = relationship(
        "Participant",
        back_populates="public_event"
    )
    name = Column(
        VARCHAR(100),
        nullable=False,
        comment="행사 이름 (한글)"
    )
    english_name = Column(
        VARCHAR(100),
        nullable=True,
        comment="행사 이름 (영문)"
    )
    description = Column(
        VARCHAR(2000),
        nullable=False,
        comment="행사 설명"
    )
    thumbnail_filename = Column(
        VARCHAR(200),
        nullable=True,
        comment="썸네일 파일명"
    )
    start_date = Column(
        DATE,
        nullable=False,
        comment="행사 시작 날짜"
    )
    end_date = Column(
        DATE,
        nullable=False,
        comment="행사 종료 날짜"
    )
    join_start_date = Column(
        DATE,
        nullable=False,
        comment="참가 신청 시작 날짜"
    )
    join_end_date = Column(
        DATE,
        nullable=False,
        comment="참가 신청 종료 날짜"
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


class Participant(Base):
    __tablename__ = "participant"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="참가자 고유 번호"
    )
    public_event_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("public_event.id")
    )
    public_event = relationship(
        "PublicEvent",
        back_populates="participants"
    )
    name = Column(
        VARCHAR(50),
        nullable=False,
        comment="참가자 이름 (한글)"
    )
    english_name = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 이름 (영문)"
    )
    gender = Column(
        VARCHAR(10),
        nullable=True,
        comment="참가자 성별"
    )
    birth = Column(
        DATE,
        nullable=True,
        comment="참가자 생년월일"
    )
    phone = Column(
        VARCHAR(20),
        nullable=False,
        comment="참가자 연락처"
    )
    email = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 이메일"
    )
    organization_type = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소속 분류"
    )
    organization_name = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 소속기관명"
    )
    organization_english_name = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소속기관명 (영문)"
    )
    job_position = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 직위"
    )
    address = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소재지"
    )
    final_degree = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 최종 학력"
    )
    engagement_type = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 참여유형"
    )
    participant_motivation = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 참여동기"
    )
    participant_type = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 유형"
    )
    interest_disease = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 관심 질환"
    )
    interest_field = Column(
        VARCHAR(20),
        nullable=True,
        comment="참가자 관심 분야"
    )
    interest_field_detail = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 관심 분야 상세"
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


class AdEmail(Base):
    __tablename__ = "ad_eamil"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="이메일 고유 번호"
    )
    user_id = Column(
        INTEGER(unsigned=True),
        nullable=True,
        comment="사용자 고유 번호"
    )
    email = Column(
        VARCHAR(200),
        nullable=False,
        comment="이메일"
    )
    subscribe = Column(
        BOOLEAN,
        nullable=False,
        default=True,
        comment="구독 여부"
    )
    etc_info = Column(
        VARCHAR(100),
        nullable=True,
        comment="기타 정보"
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


class History(Base):
    # 재단 연혁
    __tablename__ = "history"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="연혁 고유 번호"
    )
    title = Column(
        String(100),
        nullable=False,
        default="",
        comment="연혁 제목"
    )
    content = Column(
        String(3000),
        nullable=False,
        default="",
        comment="연혁 내용"
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


class SupportingStartup(Base):
    # 지원 중인 스타트업
    __tablename__ = "supporting_startup"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="지원 중인 스타트업 고유 번호"
    )
    name = Column(
        String(100),
        nullable=False,
        default="",
        comment="스타트업 이름"
    )
    content = Column(
        String(3000),
        nullable=False,
        default="",
        comment="스타트업 내용"
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


class StartUpInvestingForumEvent(Base):
    __tablename__ = "startup_investing_forum_event"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="스타트업 투자 포럼 고유 번호"
    )
    name = Column(
        String(200),
        nullable=False,
        default="",
        comment="스타트업 투자 포럼 이름"
    )
    year = Column(
        INTEGER(unsigned=True),
        nullable=False,
        comment="스타트업 투자 포럼 연도"
    )
    description = Column(
        String(3000),
        nullable=False,
        default="",
        comment="스타트업 투자 포럼 설명"
    )
    participants = relationship(
        "StartUpInvestingForumParticipant",
        back_populates="event"
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


class StartUpInvestingForumParticipant(Base):
    __tablename__ = "startup_investing_forum_participant"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="스타트업 투자 포럼 참가자 고유 번호"
    )
    user_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("user.id"),
        nullable=True,
        comment="스타트업 투자 포럼 참가자 고유 번호"
    )
    user = relationship(
        "User",
    )
    event_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("startup_investing_forum_event.id"),
    )
    event = relationship(
        "StartUpInvestingForumEvent",
        back_populates="participants"
    )
    name = Column(
        VARCHAR(50),
        nullable=False,
        comment="참가자 이름 (한글)"
    )
    english_name = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 이름 (영문)"
    )
    gender = Column(
        VARCHAR(10),
        nullable=True,
        comment="참가자 성별"
    )
    birth = Column(
        DATE,
        nullable=True,
        comment="참가자 생년월일"
    )
    phone = Column(
        VARCHAR(20),
        nullable=False,
        comment="참가자 연락처"
    )
    email = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 이메일"
    )
    resident_registration_number = Column(
        VARCHAR(13),
        nullable=True,
        comment="참가자 주민등록번호"
    )
    organization_type = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소속 분류"
    )
    organization_name = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 소속기관명"
    )
    organization_english_name = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소속기관명 (영문)"
    )
    job_position = Column(
        VARCHAR(100),
        nullable=False,
        comment="참가자 직위"
    )
    address = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 소재지"
    )
    final_degree = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 최종 학력"
    )
    participant_motivation = Column(
        VARCHAR(100),
        nullable=True,
        comment="참가자 참여동기"
    )
    profile_filename = Column(
        VARCHAR(200),
        nullable=False,
        comment="프로필 파일명"
    )
    zip_filename = Column(
        VARCHAR(200),
        nullable=False,
        comment="압축 파일명"
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


class Popup(Base):
    __tablename__ = "popup"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        comment="팝업 고유 번호"
    )
    title = Column(
        VARCHAR(200),
        nullable=False,
        comment="팝업 제목"
    )
    image_filename = Column(
        VARCHAR(300),
        nullable=False,
        comment="팝업 이미지 파일명"
    )
    link = Column(
        VARCHAR(300),
        nullable=False,
        comment="팝업 링크"
    )
    popup_start_date = Column(
        DATE,
        nullable=False,
        comment="팝업 표시 시작 날짜"
    )
    popup_end_date = Column(
        DATE,
        nullable=False,
        comment="팝업 표시 종료 날짜"
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
