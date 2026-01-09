from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EquipmentCreate(BaseModel):
    name: str
    equipment_code: str
    location: str

class EquipmentResponse(BaseModel):
    id: int
    name: str
    equipment_code: str
    location: str
    health_score: float
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class FailureCreate(BaseModel):
    equipment_id: int
    failure_type: str
    severity: int  # 1 (low) → 5 (critical)

class FailureResponse(BaseModel):
    id: int
    equipment_id: int
    failure_type: str
    severity: int
    reported_at: datetime

    class Config:
        from_attributes = True

