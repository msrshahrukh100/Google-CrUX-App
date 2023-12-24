from django.shortcuts import render
from django.http import JsonResponse
from .utils import get_crux_metrics
# Create your views here.

def get_url_metrics(request):
    url = request.GET.get("url")
    print(f"received query with url: {url}")
    if not url.startswith("http"):
        url = "https://" + url
    success, response = get_crux_metrics(url)
    return JsonResponse({"success": success, "response": response})