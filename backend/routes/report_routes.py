from flask import Blueprint, request, jsonify
from backend.extensions import db
from backend.models import ScanReport

bp = Blueprint('reports', __name__)


@bp.route('/', methods=['GET'], strict_slashes=False)
def list_reports():
    reports = ScanReport.query.order_by(ScanReport.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reports])


@bp.route('/', methods=['POST'], strict_slashes=False)
def create_report():
    data = request.get_json() or {}
    crop = data.get('crop') or 'Unknown'
    disease = data.get('disease')
    severity = data.get('severity')
    confidence = data.get('confidence')
    location = data.get('location') or 'Unknown'
    image_url = data.get('image_url')

    if not disease or confidence is None:
        return jsonify({'error': 'disease and confidence are required'}), 400

    report = ScanReport(
        crop=crop,
        disease=disease,
        severity=severity or 'unknown',
        confidence=float(confidence),
        location=location,
        image_url=image_url,
    )
    db.session.add(report)
    db.session.commit()
    return jsonify(report.to_dict()), 201
