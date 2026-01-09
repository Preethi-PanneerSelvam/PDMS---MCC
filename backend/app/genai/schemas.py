from pydantic import BaseModel

class GenAIRequest(BaseModel):
    batch_id: int
    predicted_purity: float
    actual_purity: float
    status: str

class GenAIResponse(BaseModel):
    summary: str
