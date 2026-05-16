from flask import Blueprint, request, jsonify
from backend.extensions import db
from backend.models import Farmer

bp = Blueprint('farmers', __name__)


@bp.route('/', methods=['POST'], strict_slashes=False)
def create_farmer():
    data = request.get_json() or {}
    f = Farmer(name=data.get('name'), email=data.get('email'), phone=data.get('phone'), location=data.get('location'))
    db.session.add(f)
    db.session.commit()
    return jsonify(f.to_dict()), 201


@bp.route('/<int:farmer_id>', methods=['GET'])
def get_farmer(farmer_id):
    f = Farmer.query.get_or_404(farmer_id)
    return jsonify(f.to_dict())
