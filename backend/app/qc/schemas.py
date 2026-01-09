from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class QCReportCreate(BaseModel):
    batch_id: int
    predicted_moisture: float
    actual_moisture: float
    predicted_purity: float
    actual_purity: float
    remarks: Optional[str]

class QCReportResponse(BaseModel):
    id: int
    batch_id: int
    predicted_moisture: float
    actual_moisture: float
    predicted_purity: float
    actual_purity: float
    status: str
    remarks: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
