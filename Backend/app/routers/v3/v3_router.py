from fastapi import APIRouter

from app.routers.v3 import (
    public_participant_router
)

router = APIRouter(
    prefix="/api/v3",
    tags=["v3"]
)


router.include_router(public_participant_router.router)
