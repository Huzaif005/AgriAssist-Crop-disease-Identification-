# AI-Based Crop Disease Identification System

An end‑to‑end web app for detecting crop diseases from images, text symptoms, and voice inputs, with report storage and history.

## Features
- Image‑based disease detection with severity and confidence
- Text symptom classification with treatment suggestions
- Voice input (speech‑to‑text + prediction)
- Report generation and history view
- React UI with Vite proxy to backend and AI APIs

## Architecture
- **Frontend:** React + TypeScript (Vite)
- **Backend API:** Flask + SQLAlchemy (SQLite)
- **AI API:** Flask + TensorFlow (image) + scikit‑learn (text) + SpeechRecognition (voice)

Default ports:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:6000`
- AI API: `http://localhost:5000`

## Project Structure
- [Frontend](Frontend)
- [backend](backend)
- [AI_Model](AI_Model)
- [scripts](scripts)

## Prerequisites
- Node.js 18+
- Python 3.10+
- (Optional) Git for version control

## Quick Start (Windows / PowerShell)

### 1) Create and activate a virtual environment
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2) Install Python dependencies
```powershell
pip install -r requirements.txt
pip install -r backend/requirements.txt
```

### 3) Initialize the database
```powershell
python -m backend.init_db
```

### 4) Start the backend API (port 6000)
```powershell
python -m backend.app
```

### 5) Start the AI API (port 5000)
```powershell
python -m AI_Model.api.app
```

### 6) Start the frontend (port 3000)
```powershell
cd Frontend
npm install
npm run dev
```

## API Endpoints

### Backend (port 6000)
- `GET /api/reports`  
- `POST /api/reports`
- `GET /api/farmers`
- `GET /api/crops`
- `GET /api/weather`
- `GET /health`

### AI API (port 5000)
- `POST /predict-image` (multipart form: `image`)
- `POST /predict-text` (JSON: `{ "text": "..." }`)
- `POST /predict-voice` (multipart form: `audio`, optional `language`)

See details in [AI_Model/api/README.md](AI_Model/api/README.md).

## Models
- Image model: [AI_Model/image_model/saved_models/crop_disease_model.h5](AI_Model/image_model/saved_models/crop_disease_model.h5)
- Class map: [AI_Model/image_model/saved_models/class_indices.json](AI_Model/image_model/saved_models/class_indices.json)

To train the NLP model (required for text/voice predictions):
```powershell
python AI_Model/nlp_model/train_nlp.py --csv AI_Model/nlp_model/symptoms_dataset.csv
```

## Configuration
Environment variables (optional):
- `DATABASE_URL` (default: SQLite in backend folder)
- `SECRET_KEY`
- `AI_API_URL` (default: `http://127.0.0.1:5000`)
- `UPLOAD_FOLDER`

## Notes
- Voice prediction uses Google Speech API and requires internet access.
- The Vite proxy is configured in [Frontend/vite.config.ts](Frontend/vite.config.ts).

## More Docs
- Backend: [backend/README.md](backend/README.md)
- Frontend: [Frontend/README.md](Frontend/README.md)
- AI API: [AI_Model/api/README.md](AI_Model/api/README.md)
