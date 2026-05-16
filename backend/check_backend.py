import requests, sys
try:
    resp = requests.get('http://127.0.0.1:6000/health', timeout=5)
    print(resp.status_code)
    print(resp.text)
except Exception as e:
    print('ERROR', str(e))
    sys.exit(1)
