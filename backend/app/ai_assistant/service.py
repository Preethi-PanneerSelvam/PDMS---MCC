from sqlalchemy.orm import Session

from app.raw_materials.models import RawMaterial
from app.equipment.models import Equipment
from app.inventory.models import FinishedGoods


def answer_raw_material_question(db: Session) -> str:
    low_materials = (
        db.query(RawMaterial)
        .filter(
            RawMaterial.is_active == True,
            RawMaterial.used_quantity_kg / RawMaterial.quantity_kg >= 0.7
        )
        .all()
    )

    if not low_materials:
        return "All raw materials are sufficiently stocked."

    names = [rm.name for rm in low_materials]
    return f"Low stock alert for raw materials: {', '.join(names)}."


def answer_equipment_question(db: Session) -> str:
    equipments = db.query(Equipment).filter(Equipment.is_active == True).all()

    if not equipments:
        return "No active equipment data available."

    unhealthy = [e.name for e in equipments if e.health_score < 60]

    if unhealthy:
        return f"Attention required for equipment: {', '.join(unhealthy)}."

    return "All equipment units are operating within healthy parameters."


def answer_plant_summary(db: Session) -> str:
    raw_count = db.query(RawMaterial).filter(RawMaterial.is_active == True).count()
    equip_count = db.query(Equipment).filter(Equipment.is_active == True).count()
    inventory_count = db.query(FinishedGoods).filter(FinishedGoods.is_active == True).count()

    return (
        f"Plant Status Summary:\n"
        f"- Active Raw Materials: {raw_count}\n"
        f"- Active Equipment Units: {equip_count}\n"
        f"- Active Finished Goods Batches: {inventory_count}\n"
        f"Overall plant operations are stable."
    )


def generate_ai_response(question: str, db: Session) -> str:
    q = question.lower()

    if "raw material" in q or "raw" in q:
        return answer_raw_material_question(db)

    if "equipment" in q or "machine" in q:
        return answer_equipment_question(db)

    if "summarize" in q or "status" in q or "plant" in q:
        return answer_plant_summary(db)

    return (
        "I can help with raw materials, equipment health, inventory status, "
        "and overall plant summaries. Please ask a specific question."
    )
