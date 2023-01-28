from datetime import datetime
from pydantic import BaseModel, validator, EmailStr, constr
from typing import Optional, List
import json


class UserCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    password: str
    confirm_password: str
    birth: str
    email_enable: bool

    @validator('name', 'phone', 'email', 'password', 'confirm_password', 'birth')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Cannot be empty')
        return v

    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class User(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr
    birth: str
    is_admin: bool
    email_enable: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str


class BoardCreate(BaseModel):
    name: str
    banner_end_at: datetime


class Board(BoardCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PostCreate(BaseModel):
    title: str
    board_id: int
    content: str
    files: List[str]

    @validator('title', 'board_id', 'content')
    def not_empty(cls, v):
        if not v or (type(v) == type("") and not v.strip()):
            raise ValueError('Cannot be empty')
        return v


class PostEdit(BaseModel):
    title: str
    content: str
    board_id: int

    @validator('title', 'board_id', 'content')
    def not_empty(cls, v):
        if not v or (type(v) == type("") and not v.strip()):
            raise ValueError('Cannot be empty')
        return v


class PostUpdate(BaseModel):
    content: str


class Post(PostCreate):
    id: int
    board: Board
    author: Optional[User] = None
    author_name: str
    files: List[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PostList(BaseModel):
    total: int
    posts: list[Post]


class BannerCreate(BaseModel):
    name: str
    filename: str
    link: str
    year: int = 2023
    banner_end_at: datetime


class Banner(BannerCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class MouCreate(BaseModel):
    name: str
    filename: str
    link: str


class Mou(MouCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SponsorCreate(BaseModel):
    name: str
    phone: str
    address: str
    identification_number: str
    usage: str
    detail: str

    @validator('name', 'phone', 'address', 'identification_number', 'usage', 'detail')
    def not_empty(cls, v):
        if not v or (type(v) == type("") and not v.strip()):
            raise ValueError('Cannot be empty')
        return v


class Sponsor(SponsorCreate):
    id: int
    user: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SponsoringCompanyCreate(BaseModel):
    name: str
    filename: str
    link: str
    year: int


class SponsoringCompany(SponsoringCompanyCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
