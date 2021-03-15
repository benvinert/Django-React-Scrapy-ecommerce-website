from django.db import models
from datetime import date
from UserAuth.models import UserAccount
# Create your models here.



class Product(models.Model):
    product_code = models.CharField(max_length=20)
    name = models.CharField(max_length=50,default="None")
    price = models.FloatField(default=0.0)
    brand = models.CharField(max_length=50,default="None")
    size = models.CharField(max_length=10,default="None")
    color = models.CharField(max_length=50,default="None")
    gender = models.CharField(max_length=10,default="None")
    image = models.CharField(max_length=200,default="None")

class Order(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    orderNumber = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    address = models.CharField(max_length=40)
    city = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    products = models.ManyToManyField(Product)
    subtotal = models.FloatField(default=0.0)
    shipping = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=0)





        
    

