import os
import argparse
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import joblib


def preprocess_text(s):
    if not isinstance(s, str):
        return ''
    s = s.lower()
    # basic cleaning; more can be added
    s = ''.join(ch for ch in s if ch.isalnum() or ch.isspace())
    return s


def train(csv_path, saved_dir, test_size=0.2, random_state=42):
    df = pd.read_csv(csv_path)
    if 'text' not in df.columns or 'label' not in df.columns:
        raise ValueError('CSV must contain columns: text,label')

    df['text_clean'] = df['text'].astype(str).apply(preprocess_text)

    X = df['text_clean'].values
    y = df['label'].values

    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=test_size, random_state=random_state)

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=2000)),
        ('clf', LogisticRegression(max_iter=1000))
    ])

    pipeline.fit(X_train, y_train)

    preds = pipeline.predict(X_val)
    print(classification_report(y_val, preds))

    os.makedirs(saved_dir, exist_ok=True)
    model_path = os.path.join(saved_dir, 'nlp_model.pkl')
    vect_path = os.path.join(saved_dir, 'vectorizer.pkl')
    joblib.dump(pipeline, model_path)

    print(f"Saved NLP pipeline to {model_path}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--csv', required=True)
    parser.add_argument('--saved_dir', default='AI_Model/nlp_model/saved_models')
    args = parser.parse_args()
    train(args.csv, args.saved_dir)
