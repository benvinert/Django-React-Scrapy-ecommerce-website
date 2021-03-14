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
    """
    run on all Collections(Adidas,Nike,Rebook,Puma) and send them query

    Args :

    query(dict) : contain query

    listResults(list) : initially empty list but would contain the result of query
    """
    for each_company in listCompanys:
        listResults += each_company.find(query)

def checkIfNeedToSort(sizes):
    """
    if on sizes exists least one str we don't sort sizes

    Args : 

    sizes(set) : contains all unique sizes of products

    Returns :

    Sorted/Not Sorted set
    """

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
    """
    because all sizes of product is str , so we need converte them to numbers(int,float)

    so it runs on each size on product and check if he int,float,char and add him to sizes with his type

    Args : 

    listResults(list) : list of all products we got from database

    sizes(set) : empty set(to save on unique each size)
    """

    def is_number(num):

        """
        Example : "42.5" will be 425

        Returns clean number without dot(".")
        """
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
    """
        Analyst the kwargs dict and choose which query send to database.

        *if key "category" is : "All" means get all clothing(not shoes)
        *if key "which_style" is kids : options : toddler, little, older , if not so which_style would be style about shoes(Running,golf,basketball)


        Examples : 

        Example 1 : {gender : "kids" , kids_gender : "girls" , which_style : older ,category : "All"}
        we will got all clothing of older girls 

        Example 2 : {gender : "men" , category : "jackets"}
        we will got mens jacket    

        Example 3 : {gender : "men" , category : "shoes", which_style : "running"}
        we will got men shoes only with style running

        Returns :

        Json object, key : "products" contains all products,"max" : maximum price , "min" : minimum price , "sizes" : all unique sizes of products

    """
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
    sizes = list(sizes)
    checkIfNeedToSort(sizes)#If least one str exists in the list so we dont sort the list
    sizes = [str(eachSize) for eachSize in sizes]#converting all sizes again to str
    higherPrice = max(each['price'] for each in listResults)
    lowerPrice = min(each['price'] for each in listResults)
    print(len(listResults))
    products = {"Products" : listResults,"maxPrice" : higherPrice,"minPrice" : lowerPrice,"sizes" : sizes}
    return JsonResponse(products)


def assembleQuery(listParams,nameOfParam,queryListParams,finalListQuerys):
    """
    assemble the query by all custom parameters.

    Args :

    listParams(list) : list it has all params of custom query of client

    nameOfParam("Category" , "gender" , "color" , "brand") : key

    queryListParams(list) : initially empty but would contain all querys of nameOfParam

    finalListQuerys(list) : will contain the final query to send to database

    Returns : None
    """
    if(len(listParams) != 0):
        for param in listParams:
            queryListParams.append({nameOfParam: {"$regex" : ".*" + param['title'][param['title'].find(":")+1:] + ".*","$options" : 'i'} })
        finalListQuerys.append({"$match" : {"$or" : queryListParams}})

@api_view(['GET'])
def searchItem(request,**kwargs):
    """
    search items by a custom query of client(kwargs)
    
    Example1 :
    {'params': '{"category":[{"title":"category:shoe"}],"style":[],"gender":[{"title":"gender:women"},{"title":"gender:kids"}],"color":[],"brand":[]}'}

    we got shoes of womens and kids 

    Example2 :
    {'params': '{"category":[{"title":"category:shoe"},{"title":"category:hoodie"}],"style":[],"gender":[{"title":"gender:kids"}],"color":[],"brand":[{"title":"brand:rebook"}]}'}

    we got shoes & hoodies of kids , and brand rebook

    each param is a array that contains object with title and we seperate the key and value 

    Example3 : 
    
    {"title":"category:shoe"} to "category" : "shoe" 

    Returns : 

    dict of all products that meet the requirements , minimum and maximum of price , unique sizes of all products
    """
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
    """
    Get product by Id

    Args : 

    product_code(str) : code of product are need to find 

    Returns : 

    dict product
    """
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