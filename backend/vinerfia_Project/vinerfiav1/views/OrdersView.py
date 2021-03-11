from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.core.serializers import serialize
from django.http import HttpResponse
from ..serializers import *
from ..models import *
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from djoser.compat import get_user_email
from djoser.conf import settings





def sendEmailOrder(request):
    user = UserAccount.objects.get(email=request.data['email'])
    print(user)
    if settings.SEND_ACTIVATION_EMAIL:
        context = request.data
        to = [get_user_email(user)]
        settings.EMAIL.order_information(request, context).send(to)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToHistoryOrders(request):
    serializer = OrderSerializer(data=request.data)
    resp_status = HttpResponse(status=200)
    if(serializer.is_valid()):
        serializer.save()
        sendEmailOrder(request)
    else:
        resp_status = HttpResponse(status=400,content="Bad request")
    print(serializer.errors)
    return resp_status


#Return All orders on this userEmail
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllOrdersByEmail(request,user_email):
    user_orders = Order.objects.filter(user__email=user_email)
    l = [item for item in user_orders.values()]#.values() show me data on dict type
    return JsonResponse({"products" : l})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOneOrderByOrderNumber(request,orderNumber):
    order = Order.objects.get(orderNumber=orderNumber)
    orderDetails = model_to_dict(order)
    allProducts = orderDetails.pop('products')
    products = [model_to_dict(product) for product in allProducts]
    return JsonResponse({"orderDetails" : orderDetails,"products" : products})





