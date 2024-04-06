from django.shortcuts import render
from stockticker_website.models import Stock

def home(request):
    stocks = Stock.objects.all()
    return render(request, 'home.html', {'stocks': stocks})
