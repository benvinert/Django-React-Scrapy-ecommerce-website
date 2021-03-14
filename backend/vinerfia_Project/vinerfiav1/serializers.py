from rest_framework import serializers
from .models import *
from UserAuth.serializers import UserCreateSerializer
from UserAuth.models import UserAccount
import json
from django.contrib.auth import get_user_model


class PostSerializer(serializers.Serializer):
    date = serializers.DateField()
    content =serializers.CharField()
    author = serializers.CharField()
    product_code = serializers.CharField()



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['products','email','address','city','name','subtotal','shipping','total','subtotal','quantity']

        

    def create(self,validated_data):
        print("VALIDATE")
        JSON_Validate_data = json.loads(json.dumps(validated_data))#Converte to dict
        print(JSON_Validate_data)
        user_email = JSON_Validate_data.pop('email')
        json_products = JSON_Validate_data.pop('products')
        user = UserAccount.objects.get(email=user_email)
        print(user)
        # create a order object
        OrderObj = Order.objects.create(user=user,address=JSON_Validate_data['address'],
        name=JSON_Validate_data['name'],
        city=JSON_Validate_data['city'],
        subtotal=JSON_Validate_data['subtotal'],
        shipping=JSON_Validate_data['shipping'],
        total=JSON_Validate_data['total'],
        quantity=JSON_Validate_data['quantity'])
        # add to the order object products
        for each_product in json_products:
            try:
                #check if product already exists on DB if not so we create new product
                product_exists = Product.objects.get(product_code=each_product['product_code'],size=each_product['size'])
                print("Find ::" , type(product_exists))
                OrderObj.products.add(product_exists)
            except:
                OrderObj.products.create(product_code=each_product['product_code'],
                name=each_product['name'],
                price=each_product['price'],
                brand=each_product['brand'],
                size=each_product['size'],
                color=each_product['color'],
                gender=each_product['gender'],
                image=each_product['image'])
        print("Success")
        
        return False
    
