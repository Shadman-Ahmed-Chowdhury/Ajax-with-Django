from django.shortcuts import render
from django.views.generic import View
from time import time
from django.http import JsonResponse, HttpResponseForbidden, HttpResponse
import requests
# Create your views here.

RUN_URL = "https://api.hackerearth.com/v3/code/run/"
"""
class AjaxHandlerView(View):
    def get(self, request): 
        text = request.GET.get('button_text'); 
        if request.is_ajax(): 
            t = time()
            return JsonResponse({'seconds': t}, status=200)

        return render(request, 'ajaxapp/index.html')

    def post(self, request):
        card_text = request.POST.get('text')
        result = f"I've got: {card_text}"

        return JsonResponse({'data': result}, status=200)
"""
def index(request): 
    return render(request, 'ajaxapp/ide.html')


def runCode(request): 
    if request.is_ajax():
        source = request.POST['source']
        data = {
            'client_secret': '33b6232e8779721ea89df8491d3dc083facddbdd', 
            'async': 0, 
            'source': source,
            'lang': "CPP", 
            'time_limit': 4, 
            'memory_limit': 262100,
        }
        r = requests.post(RUN_URL, data=data)
        return JsonResponse(r.json(), status=200,safe=False)
    else: 
        return HttpResponseForbidden()
        

