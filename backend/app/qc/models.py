from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base

class QCReport(Base):
    __tablename__ = "qc_reports"

    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, ForeignKey("production_batches.id"))
    predicted_moisture = Column(Float)
    actual_moisture = Column(Float)
    predicted_purity = Column(Float)
    actual_purity = Column(Float)
    status = Column(String, default="Pending")
    remarks = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
