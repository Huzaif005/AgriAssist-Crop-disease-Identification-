Smart Agriculture Assistant - Backend

This folder contains a minimal scaffold for the backend described in the plan.

Quick start (from project root):

```powershell
python -m venv venv_backend
.\venv_backend\Scripts\Activate.ps1
pip install -r backend/requirements.txt
cp backend/.env.example .env
python -c "from backend.app import create_app; from backend.models import db; app=create_app();\nwith app.app_context(): db.create_all(); print('DB initialized')"
python backend/app.py
```

The backend exposes a small set of endpoints under `/api/*`. The AI integration forwards requests to the AI API (default `http://127.0.0.1:5000`).
