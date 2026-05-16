import os

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'agriculture_assistant.db'))
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')

AI_API_URL = os.getenv('AI_API_URL', 'http://127.0.0.1:5000')

UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', os.path.join(basedir, 'uploads'))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
