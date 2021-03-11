from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.core.serializers import serialize
from ..serializers import *
from ..models import *
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from datetime import datetime
from django.http import HttpResponse
from pymongo import MongoClient


client = MongoClient('localhost', 27017)
DATABASE = client["Posts"]
PostsCollection = DATABASE['Posts']


def getPosts(request,product_code):
    result = PostsCollection.find({"product_code" : product_code})
    print("HEREEEE")
    if(request == None):
        return list(result)
    return JsonResponse({"Posts" : list(result)})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPost(request):
    request.data['date'] = datetime.today().strftime('%Y-%m-%d')##set the date of the post
    postSerializer = PostSerializer(data=request.data)
    response = HttpResponse(status=200)
    if(postSerializer.is_valid()):
        print("Success")
        postID = PostsCollection.find({}).count() + 1
        ObjPost = postSerializer.data
        ObjPost.update({"_id" : postID})
        PostsCollection.insert_one(ObjPost)
    else:
        print("Failed")
        response = HttpResponse(status=400)

    print(postSerializer.errors)
    return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editPost(request):
    request.data['date'] = datetime.today().strftime('%Y-%m-%d')##set the date of the post
    response = HttpResponse(status=200)
    ###########edit only content and date############
    try:
        newvalues = { "$set": { 'content': request.data['content'],"date" : request.data['date'] } } 
        PostsCollection.update_one({"_id" : request.data['_id']},newvalues)
    except:
        response = HttpResponse(status=500)
    return response
        

    


    

