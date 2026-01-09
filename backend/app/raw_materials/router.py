from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.auth.auth_router import get_db

from .models import RawMaterial
from .schemas import RawMaterialCreate, RawMaterialResponse

from app.auth.dependencies import get_current_user
from app.users.models import User
from app.auth.permissions import require_roles

router = APIRouter(prefix="/raw-materials", tags=["Raw Materials"])

@router.post("/", response_model=RawMaterialResponse)
def create_raw_material(
    data: RawMaterialCreate,
    db: Session = Depends(get_db),
    user=Depends(require_roles("admin"))
):
    rm = RawMaterial(**data.dict())
    db.add(rm)
    db.commit()
    db.refresh(rm)
    return rm


@router.get("/", response_model=List[RawMaterialResponse])
def list_raw_materials(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), user=Depends(require_roles("admin", "operator", "viewer"))):
    return db.query(RawMaterial).all()


@router.put("/{rm_id}/consume", response_model=RawMaterialResponse)
def consume_raw_material(
    rm_id: int,
    used_qty: float,
    db: Session = Depends(get_db),
    user=Depends(require_roles("operator", "admin"))
):
    rm = db.query(RawMaterial).filter(RawMaterial.id == rm_id).first()

    if not rm:
        raise HTTPException(status_code=404, detail="Raw material not found")

    if rm.used_quantity_kg + used_qty > rm.quantity_kg:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    rm.used_quantity_kg += used_qty

    if rm.used_quantity_kg >= rm.quantity_kg:
        rm.is_active = False

    db.commit()
    db.refresh(rm)
    return rm
