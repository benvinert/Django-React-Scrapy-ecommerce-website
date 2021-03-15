from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager , PermissionsMixin
# Create your models here.


class UserAccountManager(BaseUserManager):
    ## Override create_user function ##
    def create_user(self,email,name,password=None,birthday=None):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email,name=name,birthday=birthday)

        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser,PermissionsMixin):

    
    email = models.EmailField(max_length=255,unique=True)
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    birthday = models.CharField(max_length=10)
    is_superuser = None

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','birthday','is_staff']
