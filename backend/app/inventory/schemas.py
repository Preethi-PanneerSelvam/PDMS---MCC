from pydantic import BaseModel
from datetime import datetime

class FinishedGoodsCreate(BaseModel):
    product_name: str
    batch_no: str
    quantity_kg: float
    warehouse_location: str

class FinishedGoodsOut(BaseModel):
    id: int
    product_name: str
    batch_no: str
    quantity_kg: float
    used_quantity_kg: float
    warehouse_location: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
