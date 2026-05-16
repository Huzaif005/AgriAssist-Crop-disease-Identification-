from flask import Blueprint, request, jsonify
from backend.extensions import db
from backend.models import Crop

bp = Blueprint('crops', __name__)


@bp.route('/', methods=['POST'], strict_slashes=False)
def create_crop():
    data = request.get_json() or {}
    c = Crop(farmer_id=data.get('farmer_id'), name=data.get('name'), crop_type=data.get('crop_type'))
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201


@bp.route('/<int:crop_id>', methods=['GET'])
def get_crop(crop_id):
    c = Crop.query.get_or_404(crop_id)
    return jsonify(c.to_dict())
