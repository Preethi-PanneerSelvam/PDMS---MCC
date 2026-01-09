from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.inventory import models, schemas
from app.auth.auth_router import get_db

router = APIRouter(prefix="/inventory", tags=["Inventory"])

@router.post("/", response_model=schemas.FinishedGoodsOut)
def create_finished_goods(
    payload: schemas.FinishedGoodsCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.FinishedGoods)
        .filter(models.FinishedGoods.batch_no == payload.batch_no)
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Batch already exists")

    fg = models.FinishedGoods(
        product_name=payload.product_name,
        batch_no=payload.batch_no,
        quantity_kg=payload.quantity_kg,
        warehouse_location=payload.warehouse_location,
    )

    db.add(fg)
    db.commit()
    db.refresh(fg)
    return fg

@router.get("/", response_model=list[schemas.FinishedGoodsOut])
def get_inventory(db: Session = Depends(get_db)):
    return db.query(models.FinishedGoods).all()

@router.post("/{fg_id}/dispatch")
def dispatch_goods(
    fg_id: int,
    quantity: float,
    db: Session = Depends(get_db),
):
    fg = db.query(models.FinishedGoods).filter(models.FinishedGoods.id == fg_id).first()

    if not fg or not fg.is_active:
        raise HTTPException(status_code=404, detail="Item not found")

    if fg.used_quantity_kg + quantity > fg.quantity_kg:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    fg.used_quantity_kg += quantity

    if fg.used_quantity_kg >= fg.quantity_kg:
        fg.is_active = False

    db.commit()
    return {"message": "Dispatch successful"}
