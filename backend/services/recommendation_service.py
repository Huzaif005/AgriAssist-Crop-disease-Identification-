def recommend_for(disease_name):
    # Simple mapping for demo
    mapping = {
        'powdery_mildew': 'Apply sulfur sprays and improve airflow',
        'early_blight': 'Remove affected leaves and apply fungicide',
    }
    return mapping.get(disease_name, 'General crop care: inspect and follow best practices')
