Voice Module

This module converts farmer voice recordings into text and maps common Marathi/Hindi keywords to English before sending the text to the NLP pipeline.

Files:
- `voice_to_text.py` : Functions:
  - `audio_to_text(audio_path, language=None)` — uses `SpeechRecognition` + Google Web Speech to convert audio to text. Accepts WAV/AIFF files.
  - `map_devanagari_to_english(text)` — simple token replacement using the included mapping.
  - `voice_predict(audio_path)` — end-to-end: audio -> text -> mapping -> NLP predict (loads `AI_Model/nlp_model/saved_models/nlp_model.pkl`).

Usage example:

```bash
python AI_Model/voice_module/voice_to_text.py --audio examples/voice1.wav --language mr-IN
```

Notes:
- Google recognizer requires internet access. For offline use, replace with an offline STT engine.
- Extend `MAPPING` in `voice_to_text.py` with more Marathi/Hindi terms as needed.
