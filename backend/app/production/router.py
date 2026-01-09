from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.production.models import ProductionBatch
from app.production.schemas import ProductionBatchCreate, ProductionBatchResponse
from app.core.database import Base
from datetime import datetime

Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/production",
    tags=["Production"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/batch", response_model=ProductionBatchResponse)
def create_batch(batch: ProductionBatchCreate, db: Session = Depends(get_db)):
    existing = db.query(ProductionBatch).filter(
        ProductionBatch.batch_no == batch.batch_no
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Batch already exists")

    new_batch = ProductionBatch(**batch.dict())
    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)
    return new_batch

@router.get("/batch", response_model=list[ProductionBatchResponse])
def get_batches(db: Session = Depends(get_db)):
    return db.query(ProductionBatch).all()

@router.put("/batch/{batch_id}/complete")
def complete_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(ProductionBatch).filter(
        ProductionBatch.id == batch_id
    ).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")

    batch.status = "Completed"
    batch.end_time = datetime.utcnow()
    db.commit()
    return {"message": "Batch completed"}
