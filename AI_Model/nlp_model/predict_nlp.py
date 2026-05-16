import os
import joblib
import argparse
import pandas as pd


def load_pipeline(saved_dir='AI_Model/nlp_model/saved_models'):
    path = os.path.join(saved_dir, 'nlp_model.pkl')
    if not os.path.exists(path):
        raise FileNotFoundError(f'NLP model not found at {path}')
    pipeline = joblib.load(path)
    return pipeline


def treatment_for(disease):
    # simple mapping; extend for hackathon
    mapping = {
        'early_blight': 'Remove affected leaves, apply recommended fungicide, rotate crops',
        'late_blight': 'Remove infected plants, use copper-based fungicides, improve drainage',
        'powdery_mildew': 'Apply sulfur or potassium bicarbonate sprays; improve airflow',
        'healthy': 'No treatment needed',
        'mosaic_virus': 'Remove infected plants; control aphids; use resistant varieties'
    }
    return mapping.get(disease.lower(), 'General care: inspect plant and consult agronomist')


def predict_from_text(text, saved_dir='AI_Model/nlp_model/saved_models'):
    pipeline = load_pipeline(saved_dir)
    # basic clean similar to training
    txt = ''.join(ch for ch in text.lower() if ch.isalnum() or ch.isspace())
    probs = pipeline.predict_proba([txt])[0]
    classes = pipeline.classes_
    best_idx = int(probs.argmax())
    disease = classes[best_idx]
    confidence = float(probs[best_idx]) * 100.0
    treatment = treatment_for(disease)
    return {
        'disease': disease,
        'confidence_percent': round(confidence,2),
        'treatment': treatment
    }

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--text', required=True)
    parser.add_argument('--saved_dir', default='AI_Model/nlp_model/saved_models')
    args = parser.parse_args()
    print(predict_from_text(args.text, args.saved_dir))
