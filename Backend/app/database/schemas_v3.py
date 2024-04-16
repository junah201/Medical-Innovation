from email.mime import application
from fastapi import Form
from datetime import datetime, date
from pydantic import BaseModel, validator, EmailStr, constr
from pydantic.types import PositiveInt
from typing import Optional, List, Union, TypeVar, Generic
from pydantic.generics import GenericModel

from app.database.schemas_v2 import JudgingEvent

T = TypeVar("T", bound=BaseModel)


class LimitedUser(BaseModel):
    id: PositiveInt
    name: str

    class Config:
        orm_mode = True


class LimitedJudgingEvent(BaseModel):
    id: PositiveInt
    name: str
    judging_1st_form_type: str
    judging_2nd_form_type: str

    class Config:
        orm_mode = True


class PublicParticipant(BaseModel):
    id: PositiveInt
    public_event_id: PositiveInt
    application: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class LimitedJudgingResult(BaseModel):
    id: PositiveInt
    total_score: int

    class Config:
        orm_mode = True


class JudgingParticipant(BaseModel):
    id: PositiveInt
    user_id: PositiveInt
    user: LimitedUser
    first_judging_result: Optional[LimitedJudgingResult] = None
    second_judging_result: Optional[LimitedJudgingResult] = None
    nth_pass: int
    event_id: PositiveInt
    event: LimitedJudgingEvent
    application: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class JudgingParticipantList(BaseModel):
    total: int
    items: List[JudgingParticipant]


class JudgingResult(BaseModel):
    id: PositiveInt
    judging_event_id: PositiveInt
    judging_event: LimitedJudgingEvent
    participant_id: PositiveInt
    participant: JudgingParticipant
    user_id: PositiveInt
    user: LimitedUser
    nth: int
    total_score: int
    results: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class JudgingResultList(BaseModel):
    total: int
    items: List[JudgingResult]
