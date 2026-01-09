from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.qc.models import QCReport
from app.qc.schemas import QCReportCreate, QCReportResponse
from app.core.database import Base

Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/qc",
    tags=["Quality Control"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/report", response_model=QCReportResponse)
def create_qc_report(report: QCReportCreate, db: Session = Depends(get_db)):
    qc = QCReport(**report.dict())
    db.add(qc)
    db.commit()
    db.refresh(qc)

    # simple auto-approval logic
    diff = abs(qc.predicted_purity - qc.actual_purity)
    if diff < 1:
        qc.status = "Approved"
    else:
        qc.status = "Rejected"

    db.commit()
    return qc

@router.get("/report/{batch_id}", response_model=list[QCReportResponse])
def get_qc_reports(batch_id: int, db: Session = Depends(get_db)):
    return db.query(QCReport).filter(
        QCReport.batch_id == batch_id
    ).all()
