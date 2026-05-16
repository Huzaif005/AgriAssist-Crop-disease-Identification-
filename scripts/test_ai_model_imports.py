import os, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

try:
    import AI_Model.api.app as app_mod
    import AI_Model.image_model.predict as img_mod
    import AI_Model.nlp_model.predict_nlp as nlp_mod
    import AI_Model.voice_module.voice_to_text as voice_mod
    print('IMPORTS_OK')
except Exception as e:
    print('IMPORT_ERROR', e)
    raise
