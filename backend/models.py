from datetime import datetime
from backend.extensions import db


class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    phone = db.Column(db.String(32))
    location = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email, 'phone': self.phone}


class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'), nullable=False)
    name = db.Column(db.String(128))
    crop_type = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'farmer_id': self.farmer_id, 'name': self.name, 'crop_type': self.crop_type}


class CropReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer)
    crop_id = db.Column(db.Integer)
    image_url = db.Column(db.String(512))
    disease_detected = db.Column(db.String(128))
    confidence_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'disease': self.disease_detected, 'confidence': self.confidence_score}


class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer)
    title = db.Column(db.String(256))
    message = db.Column(db.Text)
    severity = db.Column(db.String(32))
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'message': self.message}


class ScanReport(db.Model):
    __tablename__ = 'scan_reports'
    id = db.Column(db.Integer, primary_key=True)
    crop = db.Column(db.String(128))
    disease = db.Column(db.String(128))
    severity = db.Column(db.String(32))
    confidence = db.Column(db.Float)
    location = db.Column(db.String(256))
    image_url = db.Column(db.String(512))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'crop': self.crop,
            'disease': self.disease,
            'severity': self.severity,
            'confidence': self.confidence,
            'location': self.location,
            'image_url': self.image_url,
            'date': self.created_at.isoformat()
        }
