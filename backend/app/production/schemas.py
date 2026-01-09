from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class ProductionBatchCreate(BaseModel):
    batch_no: str
    raw_material_id: int
    process_parameters: Optional[Dict]

class ProductionBatchResponse(BaseModel):
    id: int
    batch_no: str
    raw_material_id: int
    process_parameters: Optional[Dict]
    status: str
    start_time: datetime
    end_time: Optional[datetime]

    class Config:
        from_attributes = True
