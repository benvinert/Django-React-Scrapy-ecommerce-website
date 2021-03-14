from django.core.mail import EmailMultiAlternatives,get_connection
from django.template.loader import get_template
from rest_framework.decorators import api_view
from django.http import JsonResponse
from vinerfia_Project.settings import EMAIL_HOST_USER
from UserAuth.models import UserAccount
from django.forms.models import model_to_dict
from vinerfiav1.models import Order
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendEmailAllUsers(request):

    """
    Admin sends an email to the users he has marked

    variables :

    dest(list) : emails to send them message
    message(str) : message to send

    """
    src = request.data['from']

    dest = request.data['to']
    message = request.data['message']
    htmly = get_template('email.html').render({"message" : message,"from" : src})
    message = EmailMultiAlternatives(to=dest,from_email=EMAIL_HOST_USER)
    message.attach_alternative(htmly, "text/html")
    message.send()
    return JsonResponse({"status" : "success"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllUsers(request):
    """ 
    Send query to database and get all users

    Returns : 

    Dict with list of all users

    """
    allUsers = UserAccount.objects.all()
    listUsers = []
    for user in allUsers:
        listUsers.append(model_to_dict(user,exclude=['password','groups','user_permissions','is_staff','last_login']))
    return JsonResponse({"Users" : listUsers})
