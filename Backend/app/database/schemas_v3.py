from fastapi import Form
from datetime import datetime, date
from pydantic import BaseModel, validator, EmailStr, constr
from pydantic.types import PositiveInt
from typing import Optional, List, Union


class PublicParticipantUpdate(BaseModel):
    application: dict


class PublicParticipant(PublicParticipantUpdate):
    id: PositiveInt
    public_event_id: PositiveInt
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
