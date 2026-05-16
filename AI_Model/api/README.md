AI API

This small Flask app exposes three endpoints used by the backend/member demos:

- `POST /predict-image` — multipart form: `image` file. Returns JSON `{disease, confidence_percent, severity}`.
- `POST /predict-text` — JSON or form with `text` field. Returns JSON `{disease, confidence_percent, treatment}`.
- `POST /predict-voice` — multipart form: `audio` file (WAV/AIFF/MP3). Optional form field `language` (e.g. `mr-IN` or `hi-IN`). Returns JSON `{original_text, mapped_text, disease, confidence_percent}`.

Quick start (from project root):

```powershell
pip install -r requirements.txt
python AI_Model/api/app.py
```

Example CURL calls:

Image:

```bash
curl -X POST -F "image=@/path/to/leaf.jpg" http://localhost:5000/predict-image
```

Text:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"white powder on leaves"}' http://localhost:5000/predict-text
```

Voice:

```bash
curl -X POST -F "audio=@/path/to/voice.wav" -F "language=mr-IN" http://localhost:5000/predict-voice
```

Notes:
- Ensure models exist in `AI_Model/image_model/saved_models/crop_disease_model.h5` and `AI_Model/nlp_model/saved_models/nlp_model.pkl` before calling endpoints.
- The app saves uploads briefly under `AI_Model/api/uploads/` and deletes them after prediction.
- Google Speech API requires internet access for the voice endpoint.
