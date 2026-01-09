from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.auth_router import get_db
from app.equipment import models, schemas

router = APIRouter(prefix="/equipment", tags=["Equipment"])

@router.post("/", response_model=schemas.EquipmentResponse)
def create_equipment(
    equipment: schemas.EquipmentCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Equipment)
        .filter(models.Equipment.equipment_code == equipment.equipment_code)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Equipment already exists")

    new_equipment = models.Equipment(**equipment.dict())
    db.add(new_equipment)
    db.commit()
    db.refresh(new_equipment)
    return new_equipment


@router.get("/", response_model=list[schemas.EquipmentResponse])
def get_all_equipment(db: Session = Depends(get_db)):
    return db.query(models.Equipment).all()

@router.post("/failure", response_model=schemas.FailureResponse)
def log_failure(
    failure: schemas.FailureCreate,
    db: Session = Depends(get_db),
):
    equipment = db.query(models.Equipment).get(failure.equipment_id)

    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")

    # 🔻 Health decay logic
    decay = failure.severity * 5
    equipment.health_score = max(0, equipment.health_score - decay)

    failure_entry = models.EquipmentFailure(**failure.dict())
    db.add(failure_entry)
    db.commit()
    db.refresh(failure_entry)

    return failure_entry
