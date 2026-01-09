from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    equipment_code = Column(String, unique=True, nullable=False)
    location = Column(String, nullable=False)

    health_score = Column(Float, default=100.0)
    last_maintenance_date = Column(DateTime, nullable=True)

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class EquipmentFailure(Base):
    __tablename__ = "equipment_failures"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"))
    failure_type = Column(String, nullable=False)
    severity = Column(Integer, nullable=False)  # 1–5
    reported_at = Column(DateTime(timezone=True), server_default=func.now())

    equipment = relationship("Equipment")