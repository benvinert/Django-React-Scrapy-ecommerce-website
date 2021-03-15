from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()



class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id','email','name','password','birthday')
        read_only_fields = ['email']