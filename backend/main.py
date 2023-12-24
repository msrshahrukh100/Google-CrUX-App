from fastapi import FastAPI
from utils import get_crux_metrics
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metrics")
def get_url_metrics(url: str):
    print(f"received query with url: {url}")
    if not url.startswith("http"):
        url = "https://" + url
    success, response = get_crux_metrics(url)
    return {"success": success, "response": response}
    