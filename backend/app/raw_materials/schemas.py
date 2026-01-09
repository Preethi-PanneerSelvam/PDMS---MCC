from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Dict

class RawMaterialCreate(BaseModel):
    name: str
    supplier: str
    batch_no: str
    quantity_kg: float
    properties: Dict

class RawMaterialResponse(BaseModel):
    id: int
    name: str
    supplier: str
    batch_no: str
    quantity_kg: float
    used_quantity_kg: float
    properties: Dict
    is_active: bool
    received_at: datetime

    model_config = ConfigDict(from_attributes=True)
