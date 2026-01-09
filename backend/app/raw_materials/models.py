from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON
from datetime import datetime

from app.core.database import Base

class RawMaterial(Base):
    __tablename__ = "raw_materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    supplier = Column(String, nullable=False)
    batch_no = Column(String, nullable=False, unique=True)

    quantity_kg = Column(Float, nullable=False)
    used_quantity_kg = Column(Float, default=0)

    properties = Column(JSON)
    is_active = Column(Boolean, default=True)

    received_at = Column(DateTime, default=datetime.utcnow)
