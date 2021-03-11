from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from datetime import datetime
from django.http import HttpResponse
from pymongo import MongoClient
from bson.json_util import dumps,loads
import json
from ..serializers import *
from ..models import *
from django.views.decorators.cache import cache_page
from django.forms.models import model_to_dict
import scrapy
from scrapy.crawler import CrawlerProcess,CrawlerRunner
from mySpiders.moshe.spiders import nikescrapy,adidasscrapy,nikescrapy2,nikescrapy3,nikescrapy4,rebook
import multiprocessing as mp
from twisted.internet import defer, reactor
from .PostsView import getPosts









#######Connection to Database##########
db_name = 'Products2' #Database Name
CLIENT = MongoClient('localhost', 27017)
db_obj = CLIENT[db_name]
DB_NAME_STATUS = 0 ### to switch every sync with scrapy
#######################################
Adidas = db_obj["Adidas"]
Puma = db_obj["Puma"]
Rebook = db_obj["rebook"]
Nike = db_obj["Nike"]
listCompanys = [Adidas,Rebook,Nike,Puma]

#####Posts Database#####
DATABASE = CLIENT["Posts"]
PostsCollection = DATABASE['Posts']
########################




def sendQuery(query,listResults):
    for each_company in listCompanys:
        listResults += each_company.find(query)

def checkIfNeedToSort(sizes):
    #if list is int or float so we need to sort
    doSort = True
    #if one str exists in list so we dont sorted the list
    for check_str_num in sizes:
        if(type(check_str_num) == str):
            doSort = False
            break
    if(doSort):
        sizes = sorted(sizes)


def checkIfSizesDecimalOrChar(listResults,sizes):
    def is_number(num):
        return num.replace(".","").isdigit()

    for each_item in listResults:
        for size in each_item['sizes']:
            #Check if we remove dot(.) so all characters are digit ? Example : XL != 41.5, so we just add XL 
            if(is_number(size)):
                #Check if all Characters on string are decimal, so if we have dot(.) it's false
                if(size.isdecimal()):
                    sizes.add(int(size))
                else:
                    sizes.add(float(size))
            else:
                sizes.add(size)


@api_view(['GET'])
@permission_classes([AllowAny])
# @cache_page(60)
def getItemsFromProSide(request,**kwargs):
    listResults = []
    print(kwargs)
    #if its "All" so it's give me all clothing
    if(kwargs['gender'] == "kids"):
        if(kwargs['category'] == "All"):
            query = {"kids_gender" : kwargs['kids_gender'],"which_style" : kwargs['param'],"$nor" : [{"Category" : {"$regex" : ".*" + "shoe" + ".*","$options" : "i"}}]}
        else:
            query = {"kids_gender" : kwargs['kids_gender'] ,"which_style" : kwargs['param'] ,"Category" : {"$regex" : ".*" + kwargs['category'] + ".*"}}
        sendQuery(query,listResults)
    elif(kwargs['category'] == "All"):
        query = {"gender" : kwargs['gender'],"$nor" : [{"Category" : {"$regex" : ".*" + "shoe" + ".*","$options" : "i"}},{"which_style" : {"$regex" : ".*" + "slide" + ".*|.*sandal.*","$options" : "i"}}]}
        sendQuery(query,listResults)
    #if we have Param/Style of item
    elif(kwargs.get('param')):
        if(kwargs['param'] == "slide"):
            query = {"gender" : kwargs['gender'],"Category" : {"$regex" : ".*" + kwargs['category'] + ".*"},"name" : {"$regex" : ".*" + kwargs['param'] + ".*","$options" : 'i'}}
        else:
            query = {"gender" : kwargs['gender'],"Category" : {"$regex" : ".*" + kwargs['category'] + ".*"},"which_style" : {"$regex" : ".*" + kwargs['param'] + ".*","$options" : 'i'}}
        sendQuery(query,listResults)

    elif(kwargs['category'] == "top"):
        query = {"gender" : kwargs['gender'],"Category" : {"$regex" : ".*" + kwargs['category'] + ".*|.*t-shirt.*"}}
        sendQuery(query,listResults)
    ####if all conditions are false so we got all shoes
    else:
        query = {"gender" : kwargs['gender'],"Category" : {"$regex" : ".*" + kwargs['category'] + ".*"}}
        sendQuery(query,listResults)


    #this part is handled to give us all sizes of items
    sizes = {}
    sizes = set(sizes)
    checkIfSizesDecimalOrChar(listResults,sizes)
    sizes = list(sizes)#Converte from Set to List
    checkIfNeedToSort(sizes)#If least one str exists in the list so we dont sort the list
    sizes = [str(eachSize) for eachSize in sizes]
    higherPrice = max(each['price'] for each in listResults)
    lowerPrice = min(each['price'] for each in listResults)
    print(len(listResults))
    products = {"Products" : listResults,"maxPrice" : higherPrice,"minPrice" : lowerPrice,"sizes" : sizes}
    return JsonResponse(products)


def assembleQuery(listParams,nameOfParam,queryListParams,finalListQuerys):
    if(len(listParams) != 0):
        for param in listParams:
            queryListParams.append({nameOfParam: {"$regex" : ".*" + param['title'][param['title'].find(":")+1:] + ".*","$options" : 'i'} })
        finalListQuerys.append({"$match" : {"$or" : queryListParams}})

@api_view(['GET'])
def searchItem(request,**kwargs):
    #{$or : [{gender : "men"},{gender : "women"}] , $or : [{Category : "shoes"},{Category : "jackets"}]}
    jsonParams = json.loads(kwargs['params'])
    queryListCategory = []
    queryListGender = []
    queryListColor = []
    queryListBrand = []
    finalListQuerys = []
    print(kwargs)
    assembleQuery(jsonParams['category'],"Category",queryListParams=queryListCategory,finalListQuerys=finalListQuerys)
    assembleQuery(jsonParams['gender'],"gender",queryListParams=queryListGender,finalListQuerys=finalListQuerys)
    assembleQuery(jsonParams['color'],"color",queryListParams=queryListColor,finalListQuerys=finalListQuerys)
    assembleQuery(jsonParams['brand'],"brand",queryListParams=queryListBrand,finalListQuerys=finalListQuerys)
    listResults = []
    # After make query we send it to execute
    for each_company in listCompanys:
        listResults += each_company.aggregate(finalListQuerys)
    ########################################

    #serialize sizes list to be unique and not duplicate for CLIENT side#
    sizes = {}
    sizes = set(sizes)
    checkIfSizesDecimalOrChar(listResults,sizes)
    sizes = list(sizes)
    checkIfNeedToSort(sizes)#If least one str exists in the list so we can't sort the list
    sizes = [str(eachSize) for eachSize in sizes]
    #####################################################################

    higherPrice = max(each['price'] for each in listResults)
    lowerPrice = min(each['price'] for each in listResults)
    products = {"Products" : listResults,"maxPrice" : higherPrice,"minPrice" : lowerPrice,"sizes" : sizes}
    print(len(listResults))
    return JsonResponse(products)



@api_view(['GET'])
def getItemById(request,product_code):
    listResults = []
    print(product_code)
    query = {"product_code" : product_code}
    sendQuery(query,listResults)
    postsProduct = getPosts(request=None,product_code=product_code)
    product = listResults[0]
    product['postsProduct'] = postsProduct
    return JsonResponse(product)


def multiProc(spidy):
    runner = CrawlerRunner()
    d = runner.crawl(spidy)
    print("yes")
    d.addBoth(lambda _: reactor.stop())
    reactor.run()



def startScrapRotation():
    listSpiders = [nikescrapy.NikescrapySpider,adidasscrapy.AdidasscrapySpider,nikescrapy2.Nikescrapy2Spider,rebook.RebookSpider]
    try:
        with mp.Pool() as pool:
            pool.map(multiProc,listSpiders)
        CLIENT.drop_database(db_name)
        if(DB_NAME_STATUS == 0):
            globals()['db_name'] = 'Products2'
            globals()['DB_NAME_STATUS'] += 1
        elif(DB_NAME_STATUS == 1):
            globals()['db_name'] = 'Products'
            globals()['DB_NAME_STATUS'] -= 1
    except:
        return JsonResponse({"Status" : "Failed"})
    
    globals()['db_obj'] = CLIENT[globals()['db_name']]
    print(db_obj)

    globals()['Adidas'] = db_obj["Adidas"]
    globals()['Rebook'] = db_obj["Rebook"]
    globals()['Nike'] = db_obj["Nike"]
    globals()['listCompanys'] = [Nike,Adidas]
    return JsonResponse({"Status" : "Success"})



#@permission_classes([IsAuthenticated])
@api_view(['GET'])
def startScrapingRotation(request):
    def setInterval(func,time):
        eventObj = threading.Event()
        firstTime = 1
        while firstTime == 1 or not eventObj.wait(time):#when time is not none so it return true true true , 
            firstTime = 0
            func()#when timer is None it return False and start the func() and after he done func() it comes back to while() and set again time
    setInterval(startScrapRotation,60)#Five Minutes
    return JsonResponse({"OperateStatus" : "Start Interval"})