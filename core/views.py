from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
import pymongo

# Create your views here.
def index(request):
    response = []
    my_client = pymongo.MongoClient('localhost', 27017)
    dbname = my_client['Reforger']
    collection_name = dbname["Character"]
    character_details = collection_name.find({})

    for r in character_details:
        if "m_pTransformation" in r:
            response.append(r["m_pTransformation"]["m_vOrigin"])

    context = { 'characters': response}

    return render(request, 'index.html', context)

def character_positions(request):
    response = []
    my_client = pymongo.MongoClient('localhost', 27017)
    dbname = my_client['Reforger']
    collection_name = dbname["Character"]
    character_details = collection_name.find({})
    for r in character_details:
        if "m_pTransformation" in r:
            response.append(r["m_pTransformation"]["m_vOrigin"])
    return JsonResponse(
        {'characters': response}
    )