from fastapi import Form
from datetime import datetime
from pydantic import BaseModel, validator, EmailStr, constr
from typing import Optional, List, Union


def form_body(cls):
    cls.__signature__ = cls.__signature__.replace(
        parameters=[
            arg.replace(default=Form(...))
            for arg in cls.__signature__.parameters.values()
        ]
    )
    return cls


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


class Board(BoardCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@form_body
class PostCreate(BaseModel):
    title: str
    board_id: int
    content: str

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


class Post(BaseModel):
    id: int
    title: str
    board_id: int
    content: str
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


@form_body
class BannerCreate(BaseModel):
    name: str
    link: str
    year: int = 2023
    banner_end_at: datetime


class BannerEdit(BaseModel):
    name: str
    link: str
    banner_end_at: datetime


class Banner(BaseModel):
    id: int
    name: str
    filename: str
    link: str
    year: int = 2023
    banner_end_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@form_body
class MouCreate(BaseModel):
    name: str
    link: str


class Mou(BaseModel):
    id: int
    name: str
    link: str
    filename: str
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
    user: Union[User, dict,  None]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@form_body
class SponsoringCompanyCreate(BaseModel):
    name: str
    link: str
    year: int


class SponsoringCompany(BaseModel):
    id: int
    name: str
    filename: str
    link: str
    year: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@form_body
class AdvisorCreate(BaseModel):
    name: str
    type: str
    description: str


class AdvisorUpdate(BaseModel):
    name: str
    type:  str
    description: str


class Advisor(BaseModel):
    id: int
    name: str
    type: str
    description: str
    filename: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
