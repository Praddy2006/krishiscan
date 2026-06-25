from pydantic import BaseModel

class InsectPredictionResponse(BaseModel):
    insect_name: str
    insect_type: str
    confidence: float
    impact: str
    management: str