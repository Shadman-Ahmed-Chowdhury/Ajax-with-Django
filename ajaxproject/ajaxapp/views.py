from django.shortcuts import render
from django.views.generic import View
from time import time
from django.http import JsonResponse
# Create your views here.

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
        

