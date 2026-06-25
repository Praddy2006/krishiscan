from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import soil, insect

app = FastAPI(
    title="KrishiScan AI Service",
    description="Soil classification and insect detection API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(soil.router, prefix="/predict", tags=["soil"])
app.include_router(insect.router, prefix="/predict", tags=["insect"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "krishiscan-ai"}