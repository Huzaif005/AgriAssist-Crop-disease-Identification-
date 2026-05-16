import requests

base = 'http://127.0.0.1:6000'
# create farmer
resp = requests.post(f'{base}/api/farmers/', json={'name':'Test Farmer','email':'test@example.com','phone':'9999999999','location':'Test Land'})
print('POST /api/farmers/ ->', resp.status_code, resp.text)
if resp.status_code == 201:
    data = resp.json()
    fid = data.get('id')
    resp2 = requests.get(f'{base}/api/farmers/{fid}')
    print(f'GET /api/farmers/{fid} ->', resp2.status_code, resp2.text)
else:
    print('Create failed; check server logs')
