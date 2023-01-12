from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError

from sqlalchemy.orm import Session
import datetime
from typing import List, Dict
from starlette import status

from app.database import models, schemas, crud
from app.database.database import engine, get_db

from app.routers.v1 import user_router, post_router, board_router, file_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="./app/static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router.router)
app.include_router(post_router.router)
app.include_router(board_router.router)
app.include_router(file_router.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
    print(request, exc_str)
    print(request.body)
    print(request.headers)

    content = {'status_code': 10422, 'message': exc_str, 'data': None}
    return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


@app.get("/")
async def index():
    return f"Notification API (UTC: {datetime.datetime.utcnow().strftime('%Y.%m.%d %H:%M:%S')})"


@app.post("/api/v1/user/create", status_code=status.HTTP_204_NO_CONTENT)
async def create_user(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.
    """
    user = crud.get_existing_user(db=db, user_create=user_create)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="User already exists.")
    crud.create_user(db=db, user_create=user_create)
