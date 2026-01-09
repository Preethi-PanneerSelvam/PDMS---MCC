from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base

class ProductionBatch(Base):
    __tablename__ = "production_batches"

    id = Column(Integer, primary_key=True, index=True)
    batch_no = Column(String, unique=True, index=True, nullable=False)
    raw_material_id = Column(Integer, ForeignKey("raw_materials.id"))
    process_parameters = Column(JSON)
    status = Column(String, default="Started")
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
