from fastapi import APIRouter

from app.routers.v2 import (
    file_router,
    advisor_router,
    post_router,
    banner_router,
    sponsoring_company_router,
    mou_router,
    user_router,
    public_event_router,
    public_participant_router,
    private_event_router,
    sponsor_router,
    private_participant_router,
    judging_event_router,
    judging_participant_router,
    judging_result_router,
    ad_email_router,
    history_router,
)

router = APIRouter(
    prefix="/api/v2",
    tags=["v2"]
)

router.include_router(file_router.router)
router.include_router(advisor_router.router)
router.include_router(post_router.router)
router.include_router(banner_router.router)
router.include_router(sponsoring_company_router.router)
router.include_router(mou_router.router)
router.include_router(user_router.router)
router.include_router(public_event_router.router)
router.include_router(public_participant_router.router)
router.include_router(private_event_router.router)
router.include_router(sponsor_router.router)
router.include_router(private_participant_router.router)
router.include_router(judging_event_router.router)
router.include_router(judging_participant_router.router)
router.include_router(judging_result_router.router)
router.include_router(ad_email_router.router)
router.include_router(history_router.router)
