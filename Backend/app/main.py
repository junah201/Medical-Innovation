from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError

from starlette import status
import datetime

from app.database import models
from app.database.database import engine
from app.routers.v1 import (
    user_router,
    post_router,
    board_router,
    file_router,
    sponsor_router,
    advisor_router,
    mou_router,
    banner_router,
    sponsoring_company_router,
    public_event_router,
    participant_router,
)

models.Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI()

app.mount("/static", StaticFiles(directory="./app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://medical-innovation.vercel.app",
        "https://www.medicalinnovation.co.kr",
        "https://medicalinnovation.or.kr",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)
app.include_router(post_router.router)
app.include_router(board_router.router)
app.include_router(file_router.router)
app.include_router(sponsor_router.router)
app.include_router(advisor_router.router)
app.include_router(mou_router.router)
app.include_router(banner_router.router)
app.include_router(sponsoring_company_router.router)
app.include_router(public_event_router.router)
app.include_router(participant_router.router)


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
