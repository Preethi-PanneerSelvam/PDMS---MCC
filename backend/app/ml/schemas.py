from pydantic import BaseModel
from typing import Dict

class QualityPredictionRequest(BaseModel):
    raw_material_properties: Dict
    process_parameters: Dict

class QualityPredictionResponse(BaseModel):
    moisture: float
    particle_size: float
    purity: float
    pass_probability: float
