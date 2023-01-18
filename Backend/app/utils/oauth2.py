import base64
from typing import List
from fastapi import Depends, HTTPException, status
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.common.config import JWT_PUBLIC_KEY, JWT_PRIVATE_KEY
from app.database import models
from app.database.database import get_db


class Settings(BaseModel):
    authjwt_algorithm: str = "RS256"
    authjwt_decode_algorithms: List[str] = ["RS256"]
    authjwt_token_location: set = {'cookies', 'headers'}
    authjwt_access_cookie_key: str = 'access_token'
    authjwt_refresh_cookie_key: str = 'refresh_token'
    authjwt_cookie_csrf_protect: bool = False
    authjwt_public_key: str = base64.b64decode(
        JWT_PUBLIC_KEY).decode('utf-8')
    authjwt_private_key: str = base64.b64decode(
        JWT_PRIVATE_KEY).decode('utf-8')


@AuthJWT.load_config
def get_config():
    return Settings()
