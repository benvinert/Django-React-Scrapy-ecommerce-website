from django.urls import path,include
from . import views


urlpatterns = [
    ###################GET ITEMS######################
    path('All/gender=<str:gender>/category=<str:category>/',views.getItemsFromProSide,name="getItemsFromProSide"),
    path('All/gender=<str:gender>/category=<str:category>/style=<str:param>',views.getItemsFromProSide,name="getItemsFromProSide"),
    path('All/gender=<str:gender>/',views.getItemsFromProSide,name="getItemsFromProSide"),
                #Kids                     #Boys/Girls                   #Toddler/etc..       #Clothing/Shoes
    path('All/gender=<str:gender>/kids_gender=<str:kids_gender>/style=<str:param>/category=<str:category>',views.getItemsFromProSide,name="getItemsFromProSide"),
    path('All/searchItem/params=<str:params>',views.searchItem,name="search"),
    path('All/getItemById/product_code=<str:product_code>',views.getItemById,name="getitembyid"),
    ##################################################

    ##################GET ORDERS######################
    path('All/addtohistoryorders',views.addToHistoryOrders,name="addToHistoryOrders"),
    path('All/getOrdersByEmail/email=<str:user_email>',views.getAllOrdersByEmail,name="addToHistoryOrders"),
    path('All/getOneOrderByOrderNumber/orderNumber=<str:orderNumber>',views.getOneOrderByOrderNumber,name="getOneOrderByOrderNumber"),
    path('All/sendEmailOrder',views.sendEmailOrder,name="sendEmailOrder"),
    #################################################

    #################POSTS########################
    path('All/addPost',views.addPost,name="addPost"),
    path('All/editPost',views.editPost,name="editPost"),
    path('All/getPosts/product_code=<str:product_code>',views.getPosts,name="getPosts"),
    ##############################################



    ################ADMIN###################
    path('Admin/sendEmail',views.sendEmailAllUsers,name="sendEmailAllUsers"),
    path('Admin/getAllUsers',views.getAllUsers,name="getAllUsers"),
    path('scrapNewData',views.startScrapingRotation,name="scrapNewData")

]