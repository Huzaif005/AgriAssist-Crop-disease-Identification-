import os
import time

# ensure project root importable
import sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

# optional: set API key here for the process (or set in your shell)
os.environ.setdefault('SPEECH_API_KEY', 'AIzaSyCns0IPMoCsoI4VmuxhBWprqCVUGnhyfAg')

audio_path = os.path.join('scripts', 'test_audio.wav')

print('Synthesizing test audio to', audio_path)
try:
    import pyttsx3
    engine = pyttsx3.init()
    engine.save_to_file('white powder on leaves', audio_path)
    engine.runAndWait()
    # small delay to ensure file flushed
    time.sleep(0.5)
except Exception as e:
    print('TTS failed:', e)
    raise

print('Running voice prediction')
from AI_Model.voice_module.voice_to_text import voice_predict
res = voice_predict(audio_path, nlp_saved_dir='AI_Model/nlp_model/saved_models', language='en-US')
print('VOICE_PREDICT_RESULT')
print(res)
