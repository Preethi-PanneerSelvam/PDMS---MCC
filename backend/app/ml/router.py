from fastapi import APIRouter
from app.ml.schemas import (
    QualityPredictionRequest,
    QualityPredictionResponse
)
from app.ml.predictor import predict_quality

router = APIRouter(
    prefix="/ml",
    tags=["ML Quality"]
)

@router.post("/predict-quality", response_model=QualityPredictionResponse)
def predict(request: QualityPredictionRequest):
    return predict_quality(
        request.raw_material_properties,
        request.process_parameters
    )
