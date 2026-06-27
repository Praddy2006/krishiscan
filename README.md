# KrishiScan 🌱
AI-powered soil intelligence and crop advisory system.

## What This Project Does
- Upload soil image → AI detects soil type → shows crop recommendations
- Upload insect image → AI classifies as Beneficial/Harmful/Neutral
- Voice + Text chatbot for farming advice in 6 Indian languages
- Weather alerts via Telegram

## Project Structure
```
krishiscan/
├── frontend/         React + Vite + Tailwind (UI)
├── backend/          Java Spring Boot (API + Auth) — not needed for basic demo
├── ai-service/       Python FastAPI (ML models)
└── docker-compose.yml
```

## Quick Start (Minimum Setup for Demo)
You only need frontend + ai-service running for a full demo. Backend is optional.

### Prerequisites
- Node.js 20+
- Python 3.11+
- Git

### Step 1 — Clone
```bash
git clone https://github.com/Praddy2006/krishiscan.git
cd krishiscan
```

### Step 2 — Get the ML Models
The .pt model files are too large for GitHub. Download from Google Drive and place here:
```
ai-service/ml_models/soil_classifier.pt
ai-service/ml_models/insect_classifier.pt
```
soil_classes.json and insect_classes.json are already in the repo.

### Step 3 — Run AI Service
```bash
cd ai-service

# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python -m venv venv
source venv/bin/activate

# Install
pip install fastapi uvicorn python-multipart Pillow numpy
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Run
uvicorn app.main:app --reload --port 8000
```
Test: http://localhost:8000/health
Docs: http://localhost:8000/docs

### Step 4 — Run Frontend
Open a new terminal:
```bash
cd frontend
npm install
```

Create file frontend/.env:
```
VITE_GROQ_API_KEY=get_from_pradyumna
VITE_TELEGRAM_BOT_TOKEN=get_from_pradyumna
VITE_TELEGRAM_CHAT_ID=get_from_pradyumna
```

```bash
npm run dev
```
Open: http://localhost:5173

## Two Terminals Required
```
Terminal 1 — AI Service:
cd ai-service → activate venv → uvicorn app.main:app --reload --port 8000

Terminal 2 — Frontend:
cd frontend → npm run dev
```

## Pages
| Page | URL | What it does |
|---|---|---|
| Home | / | Landing page |
| Soil Scan | /scan | Upload soil image → soil type + crops |
| Result | /result/latest | Soil analysis result |
| Insect Scan | /insect | Upload insect image → beneficial or harmful |
| Farm Assistant | /chat | Voice + text chatbot (Groq) |
| Weather | /weather | Weather alerts + Telegram |

## AI Models
| Model | Classes | Accuracy |
|---|---|---|
| Soil Classifier | Alluvial, Arid, Black, Laterite, Mountain, Red, Yellow | 97.16% |
| Insect Classifier | Beneficial, Harmful, Neutral | ~90%+ |

Both use EfficientNet-B0. Training notebooks in ai-service/notebooks/

## API Endpoints (port 8000)
```
GET  /health           service status
POST /predict/soil     soil type from image
POST /predict/insect   insect classification from image
GET  /docs             interactive API docs
```

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| AI Service | FastAPI, PyTorch, EfficientNet-B0 |
| Backend | Spring Boot 3, PostgreSQL (not wired yet) |
| Chatbot | Groq LLaMA 3.3 + Whisper |
| Weather | Open-Meteo (free, no key needed) |
| Alerts | Telegram Bot API |

## Environment Variables
```
VITE_GROQ_API_KEY        from console.groq.com
VITE_TELEGRAM_BOT_TOKEN  from @BotFather on Telegram
VITE_TELEGRAM_CHAT_ID    your Telegram chat ID
```

## Common Issues
**AI service won't start**
→ Make sure venv is activated
→ Python must be 3.11+

**Soil scan fails**
→ ai-service must be running on port 8000
→ soil_classifier.pt must exist in ai-service/ml_models/

**Chatbot not responding**
→ Check VITE_GROQ_API_KEY in frontend/.env
→ Restart npm run dev after editing .env

**Tailwind not loading**
→ postcss.config.js must exist in frontend/
→ Run npm install again

**Blank page**
→ F12 → check console errors
→ Run npm install in frontend/

## Current Architecture
Frontend (port 5173) → calls FastAPI (port 8000) directly
Spring Boot (port 8080) → not connected yet, planned for auth + history

## Key Files
```
frontend/src/pages/ScanPage.jsx          soil upload
frontend/src/pages/ResultPage.jsx        soil result (reads sessionStorage)
frontend/src/pages/InsectScanPage.jsx    insect upload + result
frontend/src/pages/ChatPage.jsx          Groq voice chatbot
ai-service/app/models/soil_classifier.py     EfficientNet soil wrapper
ai-service/app/models/insect_classifier.py   EfficientNet insect wrapper
ai-service/app/routers/soil.py               /predict/soil endpoint
ai-service/app/routers/insect.py             /predict/insect endpoint
```

## For Claude
Monorepo with 3 services. Frontend calls FastAPI directly on port 8000 (Spring Boot bypassed for now). Soil scan stores result in sessionStorage and navigates to /result/latest. Both AI models are EfficientNet-B0 fine-tuned, loaded from ai-service/ml_models/. Chatbot uses Groq LLaMA 3.3 for text and Groq Whisper for voice transcription.