from backend.app import create_app
from backend.extensions import db

app = create_app()
with app.app_context():
    # import models inside the app context to ensure the SQLAlchemy
    # instance is initialized with the Flask app before models register
    from backend import models  # noqa: F401
    db.create_all()
    print('DB initialized')
