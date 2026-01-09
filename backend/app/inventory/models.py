from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from app.core.database import Base

class FinishedGoods(Base):
    __tablename__ = "finished_goods"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False)
    batch_no = Column(String, unique=True, nullable=False)

    quantity_kg = Column(Float, nullable=False)
    used_quantity_kg = Column(Float, default=0.0)

    warehouse_location = Column(String, nullable=False)

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
