import app.equipment.models
from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.auth_router import router as auth_router
from app.raw_materials.router import router as raw_material_router
from app.production.router import router as production_router
from app.ml.router import router as ml_router
from app.qc.router import router as qc_router
from app.genai.router import router as genai_router
from app.equipment.router import router as equipment_router
from app.inventory.router import router as inventory_router
from app.inventory.models import FinishedGoods
from app.core.database import engine
from app.ai_assistant.router import router as ai_router


FinishedGoods.__table__.create(bind=engine, checkfirst=True)



app = FastAPI(title="PDMS MCC System")



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(raw_material_router)
app.include_router(production_router)
app.include_router(ml_router)
app.include_router(qc_router)
app.include_router(genai_router)
app.include_router(equipment_router)
app.include_router(inventory_router)
app.include_router(ai_router)





@app.get("/")
def root():
    return {"message": "PDMS Backend is running successfully"}
