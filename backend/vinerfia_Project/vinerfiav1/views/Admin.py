from django.core.mail import EmailMultiAlternatives,get_connection
from django.template.loader import get_template
from rest_framework.decorators import api_view
from django.http import JsonResponse
from vinerfia_Project.settings import EMAIL_HOST_USER
from UserAuth.models import UserAccount
from django.forms.models import model_to_dict
from vinerfiav1.models import Order






@api_view(['POST'])
def sendEmailAllUsers(request):
    src = request.data['from']

    dest = request.data['to']
    message = request.data['message']
    htmly = get_template('email.html').render({"message" : message,"from" : src})
    message = EmailMultiAlternatives(to=dest,from_email=EMAIL_HOST_USER)
    message.attach_alternative(htmly, "text/html")
    message.send()
    return JsonResponse({"status" : "success"})

@api_view(['GET'])
def getAllUsers(request):
    allUsers = UserAccount.objects.all()
    listUsers = []
    for user in allUsers:
        listUsers.append(model_to_dict(user,exclude=['password','groups','user_permissions','is_staff','last_login']))
    return JsonResponse({"Users" : listUsers})
