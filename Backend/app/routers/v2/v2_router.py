from fastapi import APIRouter

from app.routers.v2 import (
    file_router,
    advisor_router,
)

router = APIRouter(
    prefix="/api/v2",
    tags=["v2"]
)

router.include_router(file_router.router)
router.include_router(advisor_router.router)