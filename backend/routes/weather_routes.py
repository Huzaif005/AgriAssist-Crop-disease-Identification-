from flask import Blueprint, request, jsonify
from backend.services.weather_service import get_current_weather

bp = Blueprint('weather', __name__)


@bp.route('/current', methods=['POST'])
def current():
    data = request.get_json() or {}
    lat = data.get('latitude')
    lon = data.get('longitude')
    res = get_current_weather(lat, lon)
    return jsonify(res)
