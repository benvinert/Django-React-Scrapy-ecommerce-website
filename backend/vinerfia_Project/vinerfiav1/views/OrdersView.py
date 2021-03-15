from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.core.serializers import serialize
from django.http import HttpResponse
from ..serializers import OrderSerializer
from ..models import Order,UserAccount
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from djoser.compat import get_user_email
from djoser.conf import settings



def sendEmailOrder(request):
    """
    function send Template to user email with all orders details(Products,prices etc..).

    Args : 

    request : the request with all details of user order

    Returns : 
    
    None
    """

    user = UserAccount.objects.get(email=request.data['email'])
    print(user)
    if settings.SEND_ACTIVATION_EMAIL:
        context = request.data
        to = [get_user_email(user)]
        settings.EMAIL.order_information(request, context).send(to)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToHistoryOrders(request):
    """
    we save order in database
    and send to his email all order details

    Args :

    request : that contains all payload of user and order details


    Returns :

    HttpResponse status if 200 success if 400 failed
    
    """
    serializer = OrderSerializer(data=request.data)
    resp_status = HttpResponse(status=200)
    if(serializer.is_valid()):
        serializer.save()
        sendEmailOrder(request)
    else:
        resp_status = HttpResponse(status=400,content="Bad request")
    print(serializer.errors)
    return resp_status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllOrdersByEmail(request,user_email):

    """
    	search user on database by user_email and Get all orders of user

        after we got all orders ,we converte them to dict by .values and add them to new list

        Args :

        user_email : user email address

        Returns :

        All user orders

    """
    user_orders = Order.objects.filter(user__email=user_email)
    l = [item for item in user_orders.values()]#.values() show me data on dict type
    return JsonResponse({"products" : l})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOneOrderByOrderNumber(request,orderNumber):
    """
    Get order by orderNumber

    Args : 

    orderNumber : to search on database by order number


    Returns :

    all order details(order number, total , subtotal , address etc...) , and products

    """
    order = Order.objects.get(orderNumber=orderNumber)
    orderDetails = model_to_dict(order)
    allProducts = orderDetails.pop('products')
    products = [model_to_dict(product) for product in allProducts]
    return JsonResponse({"orderDetails" : orderDetails,"products" : products})





