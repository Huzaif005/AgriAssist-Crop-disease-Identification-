import requests

base = 'http://127.0.0.1:6000'

resp = requests.post(
    f'{base}/api/reports/',
    json={
        'crop': 'Tomato',
        'disease': 'Test Disease',
        'severity': 'low',
        'confidence': 88.5,
        'location': 'Field A',
    },
)
print('POST', resp.status_code, resp.text)

resp2 = requests.get(f'{base}/api/reports/')
print('GET', resp2.status_code)
print(resp2.text[:500])
