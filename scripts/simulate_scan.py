import io
import requests
from PIL import Image

# 1) Call AI API /predict-image
img = Image.new('RGB', (224, 224), color=(34, 139, 34))
buf = io.BytesIO()
img.save(buf, format='JPEG')
buf.seek(0)

ai_url = 'http://127.0.0.1:5000/predict-image'
files = {'image': ('scan.jpg', buf, 'image/jpeg')}
resp = requests.post(ai_url, files=files)
resp.raise_for_status()
pred = resp.json()
print('AI prediction:', pred)

# 2) Create report in backend
report_url = 'http://127.0.0.1:6000/api/reports/'
payload = {
    'crop': 'Tomato',
    'disease': pred.get('disease', 'Unknown'),
    'severity': pred.get('severity', 'unknown'),
    'confidence': pred.get('confidence_percent', 0),
    'location': 'Field A',
}
resp2 = requests.post(report_url, json=payload)
resp2.raise_for_status()
print('Report created:', resp2.json())

# 3) List reports
resp3 = requests.get(report_url)
resp3.raise_for_status()
print('Reports list:', resp3.json()[:3])
