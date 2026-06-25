from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.insect import InsectPredictionResponse
from PIL import Image
import io
import random

router = APIRouter()

INSECT_CLASSES = [
    {"name": "earthworm",     "type": "beneficial", "impact": "Improves soil aeration and fertility"},
    {"name": "ground_beetle", "type": "beneficial", "impact": "Natural pest predator"},
    {"name": "aphid",         "type": "harmful",    "impact": "Damages plant roots and stems"},
    {"name": "cutworm",       "type": "harmful",    "impact": "Destroys seedlings at soil level"},
    {"name": "millipede",     "type": "beneficial", "impact": "Breaks down organic matter"},
]

@router.post("/insect", response_model=InsectPredictionResponse)
async def predict_insect(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    try:
        Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image")

    # TODO: Replace with real model — mock for now
    detected = random.choice(INSECT_CLASSES)
    return InsectPredictionResponse(
        insect_name=detected["name"],
        insect_type=detected["type"],
        confidence=round(random.uniform(0.72, 0.97), 4),
        impact=detected["impact"],
        management="Consult a local agronomist for pest management advice."
        if detected["type"] == "harmful"
        else "Encourage presence — beneficial for soil health.",
    )