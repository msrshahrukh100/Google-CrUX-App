import requests
import os

API_KEY = os.getenv("GOOGLE_API_KEY")

def get_crux_metrics(url):
    '''
    Returns 
    - Success/Failure
    - Response
    '''
    success, response = False, None

    headers = {"Content-Type": "application/json"}
    data = {"origin": url}

    res = requests.post(
        f"https://chromeuxreport.googleapis.com/v1/records:queryRecord?key={API_KEY}",
        headers=headers,
        json=data
    )

    if res.status_code == 200:
        success, response = True, res.json()["record"]["metrics"]
    elif res.status_code == 404:
        success, response = False, f"data not found for url: {url}"
    else:
        success, response = False, f"status_code: {res.status_code} response: {res.text}"

    return success, response