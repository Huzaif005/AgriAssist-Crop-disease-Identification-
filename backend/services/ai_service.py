import os
import requests

from backend.config import AI_API_URL


def predict_image_local(image_path):
    url = f"{AI_API_URL}/predict-image"
    with open(image_path, 'rb') as f:
        files = {'image': (os.path.basename(image_path), f, 'image/jpeg')}
        resp = requests.post(url, files=files)
    resp.raise_for_status()
    return resp.json()


def predict_text_local(text):
    url = f"{AI_API_URL}/predict-text"
    resp = requests.post(url, json={'text': text})
    resp.raise_for_status()
    return resp.json()
