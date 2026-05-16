from flask import Flask, request, jsonify
import os
import sys
from werkzeug.utils import secure_filename

# Ensure project root is importable
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from AI_Model.nlp_model.predict_nlp import predict_from_text
# voice module imported lazily in endpoint to avoid heavy deps at startup

app = Flask(__name__)

UPLOAD_DIR = os.path.join(PROJECT_ROOT, 'AI_Model', 'api', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

IMAGE_SAVED_DIR = os.path.join(PROJECT_ROOT, 'AI_Model', 'image_model', 'saved_models')
NLP_SAVED_DIR = os.path.join(PROJECT_ROOT, 'AI_Model', 'nlp_model', 'saved_models')

ALLOWED_IMAGE_EXT = {'.jpg', '.jpeg', '.png', '.webp'}
ALLOWED_AUDIO_EXT = {'.wav', '.aiff', '.flac', '.mp3'}


def _save_upload(f):
    filename = secure_filename(f.filename)
    path = os.path.join(UPLOAD_DIR, filename)
    f.save(path)

    ext = os.path.splitext(filename)[1].lower()
    if ext == '.webp':
        try:
            from PIL import Image
            img = Image.open(path).convert('RGB')
            converted = os.path.splitext(path)[0] + '.jpg'
            img.save(converted, format='JPEG')
            try:
                os.remove(path)
            except Exception:
                pass
            return converted
        except Exception:
            # fall back to original path if conversion fails
            return path

    return path


@app.route('/')
def index():
    return jsonify({'status': 'ok'})


@app.route('/predict-image', methods=['POST'])
def predict_image():
    if 'image' not in request.files:
        return jsonify({'error': 'image file required under form field "image"'}), 400
    f = request.files['image']
    ext = os.path.splitext(f.filename)[1].lower()
    if ext not in ALLOWED_IMAGE_EXT:
        return jsonify({'error': f'unsupported image extension {ext}'}), 400
    path = _save_upload(f)
    try:
        # import lazily to avoid requiring heavy deps (tensorflow) unless this
        # endpoint is used
        from AI_Model.image_model.predict import predict_disease
        res = predict_disease(path, saved_dir=IMAGE_SAVED_DIR)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        try:
            os.remove(path)
        except Exception:
            pass
    return jsonify(res)


@app.route('/predict-text', methods=['POST'])
def predict_text():
    data = request.get_json(silent=True) or request.form
    text = None
    if isinstance(data, dict):
        text = data.get('text') or data.get('query')
    else:
        text = request.form.get('text')
    if not text:
        return jsonify({'error': 'text required (JSON {"text": "..."} or form field)'}), 400
    try:
        res = predict_from_text(text, saved_dir=NLP_SAVED_DIR)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify(res)


@app.route('/predict-voice', methods=['POST'])
def predict_voice():
    if 'audio' not in request.files:
        return jsonify({'error': 'audio file required under form field "audio"'}), 400
    f = request.files['audio']
    ext = os.path.splitext(f.filename)[1].lower()
    if ext not in ALLOWED_AUDIO_EXT:
        return jsonify({'error': f'unsupported audio extension {ext}'}), 400
    language = request.form.get('language')
    path = _save_upload(f)
    try:
        # import lazily to avoid requiring SpeechRecognition unless used
        from AI_Model.voice_module.voice_to_text import voice_predict
        res = voice_predict(path, nlp_saved_dir=NLP_SAVED_DIR, language=language)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        try:
            os.remove(path)
        except Exception:
            pass
    return jsonify(res)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
