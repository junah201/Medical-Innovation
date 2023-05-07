from sqlalchemy.orm import Session
from app.database import models, schemas
from app.utils.verify import hash_password
from datetime import datetime
import json
from typing import List, Optional


def create_user(db: Session, user_create: schemas.UserCreate):
    utcnow = datetime.utcnow()
    db_user = models.User(
        name=user_create.name,
        phone=user_create.phone,
        email=user_create.email,
        password=hash_password(user_create.password),
        birth=user_create.birth,
        email_enable=user_create.email_enable,
        is_admin=False,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_user)
    db.commit()


def get_existing_user(db: Session, user_create: schemas.UserCreate):
    return db.query(models.User).filter(
        models.User.email == user_create.email
    ).first()


def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 20) -> schemas.UserList:
    db_users = db.query(models.User).order_by(models.User.created_at.desc())
    return schemas.UserList(total=db_users.count(), users=db_users.offset(skip).limit(limit).all())


def create_mou(db: Session, mou_create: schemas.MouCreate, filename: Optional[str] = ""):
    utcnow = datetime.utcnow()
    db_mou = models.Mou(
        name=mou_create.name,
        filename=filename,
        link=mou_create.link,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_mou)
    db.commit()


def delete_mou(db: Session, mou_id: int):
    db.query(models.Mou).filter(models.Mou.id == mou_id).delete()
    db.commit()


def get_mous(db: Session):
    db_mous = db.query(models.Mou).order_by(models.Mou.name.desc())
    return db_mous.all()


def get_mou(db: Session, mou_id: int) -> Optional[models.Mou]:
    return db.query(models.Mou).filter(models.Mou.id == mou_id).first()


def update_mou(db: Session, mou_id: int, mou_update: schemas.MouUpdate):
    db_mou = db.query(models.Mou).filter(models.Mou.id == mou_id).first()
    db_mou.name = mou_update.name
    db_mou.link = mou_update.link
    db.commit()


def create_board(db: Session, board_create: schemas.BoardCreate):
    utcnow = datetime.utcnow()
    db_board = models.Board(
        name=board_create.name,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_board)
    db.commit()


def get_boards(db: Session, skip: int = 0, limit: int = 15):
    db_boards = db.query(models.Board).order_by(models.Board.created_at.desc())
    return db_boards.offset(skip).limit(limit).all()


def create_post(db: Session, post_create: schemas.PostCreate, author_name: str, filenames: List[str] = []):
    db_post = models.Post(
        title=post_create.title,
        board_id=post_create.board_id,
        content=post_create.content,
        author_name=author_name,
        files=json.dumps(filenames, ensure_ascii=False),
    )
    db.add(db_post)
    db.commit()


def edit_post(db: Session, post_id: int, post_edit: schemas.PostEdit):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    db_post.title = post_edit.title
    db_post.board_id = post_edit.board_id
    db_post.content = post_edit.content
    db.commit()


def get_posts(db: Session, skip: int = 0, limit: int = 15) -> tuple[int, list[models.Post]]:
    db_posts = db.query(models.Post).order_by(models.Post.created_at.desc())
    return db_posts.count(), db_posts.offset(skip).limit(limit).all()


def get_posts_by_board_id(db: Session, board_id: int, skip: int = 0, limit: int = 15) -> tuple[int, list[models.Post]]:
    db_posts = db.query(models.Post).filter(
        models.Post.board_id == board_id).order_by(models.Post.created_at.desc())
    return db_posts.count(), db_posts.offset(skip).limit(limit).all()


def get_post_by_post_id(db: Session, post_id: int) -> models.Post:
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def delete_post(db: Session, post_id: int) -> None:
    db.query(models.Post).filter(models.Post.id == post_id).delete()
    db.commit()


def get_active_banners(db: Session) -> List[models.Banner]:
    return db.query(models.Banner).order_by(models.Banner.banner_end_at.desc()).filter(models.Banner.banner_end_at > datetime.utcnow()).all()


def get_banners(db: Session, skip: int, limit: int) -> schemas.BannerList:
    db_banners = db.query(models.Banner).order_by(
        models.Banner.banner_end_at.desc())
    return schemas.BannerList(total=db_banners.count(), banners=db_banners.offset(skip).limit(limit).all())


def get_banner_by_id(db: Session, banner_id: int) -> models.Banner:
    return db.query(models.Banner).filter(models.Banner.id == banner_id).first()


def create_banner(db: Session, banner_create: schemas.BannerCreate, filename: str = ""):
    utcnow = datetime.utcnow()
    db_banner = models.Banner(
        name=banner_create.name,
        filename=filename,
        link=banner_create.link,
        year=banner_create.year,
        banner_end_at=banner_create.banner_end_at,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_banner)
    db.commit()


def edit_banner(db: Session, banner_id: int, banner_edit: schemas.BannerEdit):
    db_banner = db.query(models.Banner).filter(
        models.Banner.id == banner_id).first()
    db_banner.name = banner_edit.name
    db_banner.link = banner_edit.link
    db_banner.banner_end_at = banner_edit.banner_end_at
    db.commit()


def delete_banner(db: Session, banner_id: int) -> None:
    db.query(models.Banner).filter(models.Banner.id == banner_id).delete()
    db.commit()


def create_sponsor(db: Session, sponsor_create: schemas.SponsorCreate, user_id: int):
    utcnow = datetime.utcnow()
    db_sponsor = models.Sponsor(
        user_id=user_id,
        name=sponsor_create.name,
        phone=sponsor_create.phone,
        identification_number=sponsor_create.identification_number,
        address=sponsor_create.address,
        usage=sponsor_create.usage,
        detail=sponsor_create.detail,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_sponsor)
    db.commit()


def get_all_sponsors(db: Session, skip: int = 0, limit: int = 200) -> list[models.Sponsor]:
    db_sponsors = db.query(models.Sponsor).order_by(
        models.Sponsor.created_at.desc())
    return db_sponsors.offset(skip).limit(limit).all()


def get_sponsoring_companies(db: Session, skip: int = 0, limit: int = 200) -> schemas.SponsoringCompanyList:
    db_sponsoring_companies = db.query(models.SponsoringCompany).order_by(
        models.SponsoringCompany.year.desc())
    return schemas.SponsoringCompanyList(total=db_sponsoring_companies.count(), sponsoring_companies=db_sponsoring_companies.offset(skip).limit(limit).all())


def create_sponsoring_company(db: Session, sponsoring_company_create: schemas.SponsoringCompanyCreate, filename: str = ""):
    utcnow = datetime.utcnow()
    db_sponsoring_company = models.SponsoringCompany(
        name=sponsoring_company_create.name,
        filename=filename,
        link=sponsoring_company_create.link,
        year=sponsoring_company_create.year,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_sponsoring_company)
    db.commit()


def get_sponsoring_company_by_id(db: Session, sponsoring_company_id: int) -> Optional[models.SponsoringCompany]:
    return db.query(models.SponsoringCompany).filter(models.SponsoringCompany.id == sponsoring_company_id).first()


def update_sponsoring_company(db: Session, sponsoring_company_id: int, sponsoring_company_update: schemas.SponsoringCompanyUpdate):
    db_sponsoring_company = db.query(models.SponsoringCompany).filter(
        models.SponsoringCompany.id == sponsoring_company_id).first()
    db_sponsoring_company.name = sponsoring_company_update.name
    db_sponsoring_company.link = sponsoring_company_update.link
    db_sponsoring_company.year = sponsoring_company_update.year
    db.commit()


def delete_sponsoring_company(db: Session, sponsoring_company_id: int) -> None:
    db.query(models.SponsoringCompany).filter(
        models.SponsoringCompany.id == sponsoring_company_id).delete()
    db.commit()


def create_advisor(db: Session, advisor_create: schemas.AdvisorCreate, filename: str) -> None:
    utcnow = datetime.utcnow()
    db_advisor = models.Advisor(
        name=advisor_create.name,
        type=advisor_create.type,
        filename=filename,
        description=advisor_create.description,
        created_at=utcnow,
        updated_at=utcnow
    )
    db.add(db_advisor)
    db.commit()


def get_advisors(db: Session, skip: int = 0, limit: int = 300) -> schemas.AdvisorList:
    db_advisors = db.query(models.Advisor).order_by(
        models.Advisor.name)
    return schemas.AdvisorList(total=db_advisors.count(), advisors=db_advisors.offset(skip).limit(limit).all())


def get_advisor(db: Session, advisor_id: int):
    return db.query(models.Advisor).filter(models.Advisor.id == advisor_id).first()


def update_advisor_content(db: Session, advisor_id: int, advisor_update: schemas.AdvisorUpdate):
    db_advisor = db.query(models.Advisor).filter(
        models.Advisor.id == advisor_id).first()
    db_advisor.name = advisor_update.name
    db_advisor.type = advisor_update.type
    db_advisor.description = advisor_update.description
    db.commit()


def update_advisor_image(db: Session, advisor_id: int, filename: str):
    db_advisor = db.query(models.Advisor).filter(
        models.Advisor.id == advisor_id).first()
    db_advisor.filename = filename
    db.commit()


def delete_advisor(db: Session, advisor_id: int) -> None:
    db.query(models.Advisor).filter(
        models.Advisor.id == advisor_id).delete()
    db.commit()


def create_public_event(db: Session, public_event_create: schemas.PublicEventCreate, filename: Optional[str] = None):
    db_public_event = models.PublicEvent(
        name=public_event_create.name,
        english_name=public_event_create.english_name,
        description=public_event_create.description,
        thumbnail_filename=filename,
        start_date=public_event_create.start_date,
        end_date=public_event_create.end_date,
        join_start_date=public_event_create.join_start_date,
        join_end_date=public_event_create.join_end_date,
    )
    db.add(db_public_event)
    db.commit()


def get_public_events(db: Session, skip: int = 0, limit: int = 40) -> schemas.PublicEventList:
    db_public_events = db.query(models.PublicEvent).order_by(
        models.PublicEvent.start_date.desc())
    return schemas.PublicEventList(total=db_public_events.count(), events=db_public_events.offset(skip).limit(limit).all())


def get_public_event(db: Session, public_event_id: int) -> Optional[models.PublicEvent]:
    return db.query(models.PublicEvent).filter(models.PublicEvent.id == public_event_id).first()


def update_public_event(db: Session, public_event_id: int, public_event_update: schemas.PublicEventContentUpdate) -> None:
    db_public_event: models.PublicEvent = db.query(models.PublicEvent).filter(
        models.PublicEvent.id == public_event_id).first()

    if not db_public_event:
        return None

    db_public_event.name = public_event_update.name
    db_public_event.english_name = public_event_update.english_name
    db_public_event.description = public_event_update.description
    db_public_event.start_date = public_event_update.start_date
    db_public_event.end_date = public_event_update.end_date
    db_public_event.join_start_date = public_event_update.join_start_date
    db_public_event.join_end_date = public_event_update.join_end_date
    db.commit()


def get_all_participant_by_event_id(db: Session, public_event_id: int, skip: int = 0, limit: int = 40) -> schemas.ParticipantList:
    db_participants = db.query(models.Participant).filter(
        models.Participant.public_event_id == public_event_id)
    return schemas.ParticipantList(total=db_participants.count(), participants=db_participants.offset(skip).limit(limit).all())


def get_participant(db: Session, participant_id: int) -> Optional[models.Participant]:
    return db.query(models.Participant).filter(models.Participant.id == participant_id).first()


def create_participant(db: Session, public_event_id: int, participant_create: schemas.ParticipantCreate) -> None:
    db_participant = models.Participant(
        public_event_id=public_event_id,
        name=participant_create.name,
        english_name=participant_create.english_name,
        gender=participant_create.gender,
        birth=participant_create.birth,
        phone=participant_create.phone,
        email=participant_create.email,
        organization_type=participant_create.organization_type,
        organization_name=participant_create.organization_name,
        organization_english_name=participant_create.organization_english_name,
        job_position=participant_create.job_position,
        address=participant_create.address,
        final_degree=participant_create.final_degree,
        engagement_type=participant_create.engagement_type,
        participant_motivation=participant_create.participant_motivation,
        participant_type=participant_create.participant_type,
        interest_disease=participant_create.interest_disease,
        interest_field=participant_create.interest_field,
        interest_field_detail=participant_create.interest_field_detail,
    )
    db.add(db_participant)
    db.commit()


def create_ad_email(db: Session, ad_email_create: schemas.AdEmailCreate) -> None:
    db_ad_email = models.AdEmail(
        user_id=ad_email_create.user_id,
        email=ad_email_create.email,
        subscribe=ad_email_create.subscribe,
        etc_info=ad_email_create.etc_info,
    )
    db.add(db_ad_email)
    db.commit()


def get_ad_emails(db: Session, skip: int = 0, limit: int = 40) -> schemas.AdEmailList:
    db_ad_emails = db.query(models.AdEmail).order_by(
        models.AdEmail.created_at.desc())
    return schemas.AdEmailList(total=db_ad_emails.count(), ad_emails=db_ad_emails.offset(skip).limit(limit).all())


def get_ad_email(db: Session, ad_email_id: int) -> Optional[models.AdEmail]:
    return db.query(models.AdEmail).filter(models.AdEmail.id == ad_email_id).first()


def delete_ad_email(db: Session, ad_email_id: int) -> None:
    db.query(models.AdEmail).filter(
        models.AdEmail.id == ad_email_id).delete()
    db.commit()


def update_ad_email(db: Session, ad_email_id: int, ad_email_update: schemas.AdEmailCreate) -> None:
    db_ad_email: models.AdEmail = db.query(models.AdEmail).filter(
        models.AdEmail.id == ad_email_id).first()

    if not db_ad_email:
        return None

    db_ad_email.user_id = ad_email_update.user_id
    db_ad_email.email = ad_email_update.email
    db_ad_email.subscribe = ad_email_update.subscribe
    db_ad_email.etc_info = ad_email_update.etc_info
    db.commit()


def create_history(db: Session, history_create: schemas.HistoryCreate) -> None:
    db_history = models.History(
        title=history_create.title,
        content=history_create.content
    )
    db.add(db_history)
    db.commit()


def get_all_history(db: Session, skip: int = 0, limit: int = 40) -> schemas.HistoryList:
    db_all_history = db.query(models.History).order_by(
        models.History.title.desc())
    return schemas.HistoryList(
        total=db_all_history.count(),
        histories=db_all_history.offset(skip).limit(limit).all()
    )


def get_history(db: Session, history_id: int) -> Optional[models.History]:
    return db.query(models.History).filter(models.History.id == history_id).first()


def get_history_by_id(db: Session, history_id: int) -> Optional[models.History]:
    return db.query(models.History).filter(models.History.id == history_id).first()


def delete_history(db: Session, history_id: int):
    db.query(models.History).filter(models.History.id == history_id).delete()
    db.commit()


def update_history(db: Session, history_id: int, history_update: schemas.HistoryUpdate) -> None:
    db_history = db.query(models.History).filter(
        models.History.id == history_id).first()
    db_history.title = history_update.title
    db_history.content = history_update.content
    db.commit()


def create_supporting_startup(db: Session, supporting_startup_create: schemas.SupportingStartupCreate) -> None:
    db_supporting_startup = models.SupportingStartup(
        name=supporting_startup_create.name,
        content=supporting_startup_create.content,
        link=supporting_startup_create.link,
    )
    db.add(db_supporting_startup)
    db.commit()


def get_supporting_startups(db: Session, skip: int = 0, limit: int = 40) -> schemas.SupportingStartupList:
    db_all_supporting_startup = db.query(models.SupportingStartup).order_by(
        models.SupportingStartup.id.desc())
    return schemas.SupportingStartupList(
        total=db_all_supporting_startup.count(),
        supporting_startups=db_all_supporting_startup.offset(
            skip).limit(limit).all()
    )


def get_supporting_startup(db: Session, supporting_startup_id: int) -> Optional[models.SupportingStartup]:
    return db.query(models.SupportingStartup).filter(models.SupportingStartup.id == supporting_startup_id).first()


def update_supporting_startup(db: Session, supporting_startup_id: int, supporting_startup_update: schemas.SupportingStartupUpdate) -> None:
    db_supporting_startup = db.query(models.SupportingStartup).filter(
        models.SupportingStartup.id == supporting_startup_id).first()
    db_supporting_startup.name = supporting_startup_update.name
    db_supporting_startup.content = supporting_startup_update.content
    db_supporting_startup.link = supporting_startup_update.link
    db.commit()


def delete_supporting_startup(db: Session, supporting_startup_id: int):
    db.query(models.SupportingStartup).filter(
        models.SupportingStartup.id == supporting_startup_id).delete()
    db.commit()


def create_private_event(db: Session, private_event_create: schemas.PrivateEventCreate) -> None:
    db_private_event = models.PrivateEvent(
        name=private_event_create.name,
        join_start_date=private_event_create.join_start_date,
        join_end_date=private_event_create.join_end_date,
        description=private_event_create.description,
    )
    db.add(db_private_event)
    db.commit()


def get_private_events(db: Session, skip: int = 0, limit: int = 40) -> schemas.PrivateEventList:
    db_all_private_event = db.query(
        models.PrivateEvent).order_by(models.PrivateEvent.id.desc())
    return schemas.PrivateEventList(
        total=db_all_private_event.count(),
        events=db_all_private_event.offset(
            skip).limit(limit).all()
    )


def get_private_event(db: Session, private_event_id: int) -> Optional[models.PrivateEvent]:
    return db.query(models.PrivateEvent).filter(models.PrivateEvent.id == private_event_id).first()


def update_private_event(
    db: Session,
    private_event_id: int,
    private_event_update: schemas.PrivateEventUpdate,
):
    db_private_event: models.PrivateEvent = db.query(models.PrivateEvent).filter(
        models.PrivateEvent.id == private_event_id).first()
    db_private_event.name = private_event_update.name
    db_private_event.join_start_date = private_event_update.join_start_date
    db_private_event.join_end_date = private_event_update.join_end_date
    db_private_event.description = private_event_update.description
    db.commit()


def delete_private_event(db: Session, private_event_id: int):
    db.query(models.PrivateEvent).filter(
        models.PrivateEvent.id == private_event_id).delete()
    db.commit()


def create_private_participant(
        db: Session,
        private_participant_create: schemas.PrivateParticipantCreate,
        user_id: int
) -> None:
    db_private_participant = models.PrivateParticipant(
        user_id=user_id,
        event_id=private_participant_create.event_id,
        name=private_participant_create.name,
        english_name=private_participant_create.english_name,
        gender=private_participant_create.gender,
        birth=private_participant_create.birth,
        phone=private_participant_create.phone,
        email=private_participant_create.email,
        organization_type=private_participant_create.organization_type,
        organization_name=private_participant_create.organization_name,
        organization_english_name=private_participant_create.organization_english_name,
        job_position=private_participant_create.job_position,
        address=private_participant_create.address,
        final_degree=private_participant_create.final_degree,
        participant_motivation=private_participant_create.participant_motivation,
        profile_filename=private_participant_create.profile_filename,
        zip_filename=private_participant_create.zip_filename,
    )
    db.add(db_private_participant)
    db.commit()


def get_private_participants(db: Session, private_event_id: int, skip: int = 0, limit: int = 40) -> schemas.PrivateParticipantList:
    db_all_private_participant = db.query(models.PrivateParticipant).filter(models.PrivateParticipant.event_id == private_event_id).order_by(
        models.PrivateParticipant.id.desc())
    return schemas.PrivateParticipantList(
        total=db_all_private_participant.count(),
        participants=db_all_private_participant.offset(
            skip).limit(limit).all()
    )


def get_private_participant(db: Session, private_participant_id: int) -> Optional[models.PrivateParticipant]:
    return db.query(models.PrivateParticipant).filter(models.PrivateParticipant.id == private_participant_id).first()


def create_popup(db: Session, popup_create: schemas.PopupCreate, image_filename: str) -> None:
    db_popup = models.Popup(
        title=popup_create.title,
        link=popup_create.link,
        popup_start_date=popup_create.popup_start_date,
        popup_end_date=popup_create.popup_end_date,
        image_filename=image_filename
    )
    db.add(db_popup)
    db.commit()


def get_popup(db: Session, popup_id: int) -> Optional[models.Popup]:
    return db.query(models.Popup).filter(models.Popup.id == popup_id).first()


def get_popups(db: Session, skip: int = 0, limit: int = 40) -> schemas.PopupList:
    db_popups = db.query(models.Popup).order_by(
        models.Popup.popup_start_date.desc())
    return schemas.PopupList(
        total=db_popups.count(),
        popups=db_popups.offset(skip).limit(limit).all()
    )


def get_active_popups(db: Session) -> schemas.PopupList:
    now = datetime.now().date()
    db_popups = db.query(models.Popup).order_by(
        models.Popup.popup_start_date.desc()
    ).filter(
        models.Popup.popup_start_date <= now
    ).filter(
        models.Popup.popup_end_date >= now
    )
    return schemas.PopupList(
        total=db_popups.count(),
        popups=db_popups.all()
    )


def update_popup_content(db: Session, popup_id: int, popup_update: schemas.PopupUpdate) -> None:
    db_popup = get_popup(db, popup_id)
    db_popup.title = popup_update.title
    db_popup.link = popup_update.link
    db_popup.popup_start_date = popup_update.popup_start_date
    db_popup.popup_end_date = popup_update.popup_end_date
    db.commit()


def update_popup_image(db: Session, popup_id: int, image_filename: str) -> None:
    db_popup = get_popup(db, popup_id)
    db_popup.image_filename = image_filename
    db.commit()


def delete_popup(db: Session, popup_id: int) -> None:
    db.query(models.Popup).filter(
        models.Popup.id == popup_id).delete()
    db.commit()

def get_judging_event(db: Session, judging_event_id : int ) -> Optional[models.JudgingEvent]:
    return db.query(models.JudgingEvent).filter(models.JudgingEvent.id == judging_event_id).first()