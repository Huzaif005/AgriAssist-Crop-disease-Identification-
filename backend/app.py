import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# import shared extensions
from backend.extensions import db


def create_app(config_obj=None):
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    env_path = os.path.join(project_root, '.env')
    if os.path.exists(env_path):
        load_dotenv(env_path)

    app = Flask(__name__, instance_relative_config=False)
    CORS(app)

    # load config
    if config_obj:
        app.config.from_object(config_obj)
    else:
        app.config.from_pyfile('config.py', silent=True)

    # DB
    db.init_app(app)

    # register blueprints
    from backend.routes.farmer_routes import bp as farmer_bp
    from backend.routes.crop_routes import bp as crop_bp
    from backend.routes.weather_routes import bp as weather_bp
    from backend.routes.report_routes import bp as report_bp

    app.register_blueprint(farmer_bp, url_prefix='/api/farmers')
    app.register_blueprint(crop_bp, url_prefix='/api/crops')
    app.register_blueprint(weather_bp, url_prefix='/api/weather')
    app.register_blueprint(report_bp, url_prefix='/api/reports')

    @app.route('/health')
    def health():
        return {'status': 'ok'}

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=6000, debug=True)
