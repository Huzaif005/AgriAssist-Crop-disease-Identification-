import requests
url = 'http://127.0.0.1:5000/predict-text'
payload = {'text':'white powder on leaves'}
resp = requests.post(url, json=payload)
print(resp.status_code)
print(resp.text)
