NLP Model (Symptoms)

This folder contains a simple TF-IDF + Logistic Regression pipeline for mapping symptom text to disease labels.

Files:
- `symptoms_dataset.csv` : Example dataset (text,label). Customize or expand to 50–100 examples.
- `train_nlp.py` : Train script. Usage:

```bash
python AI_Model/nlp_model/train_nlp.py --csv AI_Model/nlp_model/symptoms_dataset.csv --saved_dir AI_Model/nlp_model/saved_models
```

- `predict_nlp.py` : Load trained pipeline and predict disease, confidence, and a simple treatment suggestion.

```bash
python AI_Model/nlp_model/predict_nlp.py --text "white powder on leaves"
```

- Trained artifacts will be saved to `AI_Model/nlp_model/saved_models/nlp_model.pkl`.

Notes:
- `train_nlp.py` expects CSV columns `text,label`.
- For the hackathon demo, keep dataset small and use clear symptom phrases.
