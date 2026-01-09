from fastapi import APIRouter
from app.genai.schemas import GenAIRequest, GenAIResponse
from app.genai.generator import generate_qc_summary

router = APIRouter(
    prefix="/genai",
    tags=["Gen AI"]
)

@router.post("/qc-summary", response_model=GenAIResponse)
def generate_summary(data: GenAIRequest):
    summary = generate_qc_summary(
        data.batch_id,
        data.predicted_purity,
        data.actual_purity,
        data.status
    )
    return {"summary": summary}
