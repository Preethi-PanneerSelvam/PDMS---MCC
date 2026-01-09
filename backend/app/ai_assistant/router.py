from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.ai_assistant.schemas import ChatRequest, ChatResponse
from app.ai_assistant.service import generate_ai_response
from app.auth.auth_router import get_db

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(
    payload: ChatRequest,
    db: Session = Depends(get_db),
):
    """
    Gen AI chat endpoint.
    Context will be enriched in later phases.
    """

    context = "Plant production, inventory, equipment, and QC data."

    answer = generate_ai_response(payload.question, db)


    return {"answer": answer}
