from email.mime import application
from fastapi import Form
from datetime import datetime, date
from pydantic import BaseModel, validator, EmailStr, constr
from pydantic.types import PositiveInt
from typing import Optional, List, Union, TypeVar, Generic
from pydantic.generics import GenericModel

T = TypeVar("T", bound=BaseModel)


class PublicParticipant(BaseModel):
    id: PositiveInt
    public_event_id: PositiveInt
    application: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class JudgingParticipant(BaseModel):
    id: PositiveInt
    user_id: PositiveInt
    user: Optional[object] = None
    first_judging_result: Optional[object] = None
    second_judging_result: Optional[object] = None
    nth_pass: int
    event_id: PositiveInt
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
    judging_event: None
    participant_id: PositiveInt
    participant: JudgingParticipant
    user_id: PositiveInt
    user: None
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
