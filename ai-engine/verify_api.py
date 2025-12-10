import requests
import json

try:
    response = requests.post(
        "http://127.0.0.1:8000/generate",
        json={"message": "Hello"}
    )
    print(response.status_code)
    print(response.text)
except Exception as e:
    print(e)
