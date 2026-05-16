import os
import re
import joblib
import speech_recognition as sr
import pydub


MAPPING = {
    # Marathi / Hindi -> English (extend as needed)
    "पिवळे": "yellow",
    "पीला": "yellow",
    "डाग": "spots",
    "दाग": "spots",
    "कुज": "rot",
    "सड़": "rot",
    "पाणी": "water",
    "पिवळ्या": "yellow",
}


def audio_to_text(audio_path, language=None):
    """Convert WAV/AIFF audio file to text using Google Web Speech API.
    Returns empty string on unintelligible audio.
    Optionally pass `language` like 'hi-IN' or 'mr-IN'."""
    try:
        import speech_recognition as sr
    except Exception as e:
        raise RuntimeError('speech_recognition package is required for audio processing') from e

    r = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = r.record(source)

    # support passing an API key via environment variable SPEECH_API_KEY
    key = os.getenv('SPEECH_API_KEY')
    try:
        if language:
            if key:
                return r.recognize_google(audio, key=key, language=language)
            return r.recognize_google(audio, language=language)
        else:
            if key:
                return r.recognize_google(audio, key=key)
            return r.recognize_google(audio)
    except sr.UnknownValueError:
        return ""
    except sr.RequestError as e:
        raise RuntimeError(f"Speech API error: {e}")


def contains_devanagari(text):
    return bool(re.search('[\u0900-\u097F]', text))


def map_devanagari_to_english(text, mapping=MAPPING):
    # naive token replacement; preserves spacing
    def replace_token(token):
        return mapping.get(token, token)
    tokens = re.split(r'(\s+)', text)  # keep separators
    mapped = ''.join(replace_token(t) for t in tokens)
    return mapped


def voice_predict(audio_path, nlp_saved_dir='AI_Model/nlp_model/saved_models', language=None):
    """Full flow: audio -> text -> (map languages) -> NLP predict pipeline

    Returns dict: {original_text, mapped_text, disease, confidence_percent}
    """
    text = audio_to_text(audio_path, language=language)
    mapped = text
    if contains_devanagari(text):
        mapped = map_devanagari_to_english(text)

    model_path = os.path.join(nlp_saved_dir, 'nlp_model.pkl')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f'NLP model not found at {model_path}')

    pipeline = joblib.load(model_path)
    txt = ''.join(ch for ch in mapped.lower() if ch.isalnum() or ch.isspace())
    probs = pipeline.predict_proba([txt])[0]
    classes = pipeline.classes_
    best_idx = int(probs.argmax())
    disease = classes[best_idx]
    confidence = float(probs[best_idx]) * 100.0

    return {
        'original_text': text,
        'mapped_text': mapped,
        'disease': disease,
        'confidence_percent': round(confidence, 2)
    }


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--audio', required=True, help='Path to WAV/AIFF file')
    parser.add_argument('--nlp_saved_dir', default='AI_Model/nlp_model/saved_models')
    parser.add_argument('--language', default=None, help="Optional language hint like 'hi-IN' or 'mr-IN'")
    args = parser.parse_args()
    print(voice_predict(args.audio, nlp_saved_dir=args.nlp_saved_dir, language=args.language))
