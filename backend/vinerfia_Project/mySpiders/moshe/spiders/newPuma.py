import scrapy
from ..items import MosheItem
import json


class PumaScrap(scrapy.Spider):
    name = 'newpuma'
    start_urls = [
         ###############################################MENS SHOES##################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-classics&pmid=nosales-category-promotion-US&pmpt=discounted&start=32&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=32&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=68&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=104&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=140&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=176&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-sneakers&start=212&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-training-%26-gym&start=34&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-running&start=32&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-motorsport&start=36&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-football&start=36&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-shoes-heritage-basketball&start=35&sz=36&isAjax=1',
        ###########################################MAN HATS################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-accessories-hats-%26-headwear&start=36&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-accessories-hats-%26-headwear&start=72&sz=36&isAjax=1',
        ########################################### MENS DONE!!!###########################################
        ##########################################WOEMNS SHOES CLASSICS###############################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-classics&start=32&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-classics&start=68&sz=36&isAjax=1',
        #########################################WOMENS LIFE STYLE#####################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-sneakers&start=32&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-sneakers&start=68&sz=36&isAjax=1',
        ##########################################WOMEN TRANING GYM########################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-training-%26-gym&start=33&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-shoes-running&start=34&sz=36&isAjax=1',
        #########################################WOMEN CLOTHING CLASSICS####################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=women-clothing-classics&start=36&sz=36&isAjax=1',
        #########################################WOMEN SWEATSHIRTS##########################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-clothing-sweatshirts-%26-hoodies&start=35&sz=36&isAjax=1',
        ########################################WOMEN T-SHIRTS###########################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-clothing-t-shirts-%26-tops&start=35&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-clothing-t-shirts-%26-tops&start=71&sz=36&isAjax=1',
        #######################################WOMEN LEGGINGS############################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-clothing-leggings&start=34&sz=36&isAjax=1',
        #######################################WOMEN HATS################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=womens-accessories-hats-%26-headwear&start=36&sz=36&isAjax=1',

    ]
    custom_settings = {'ITEM_PIPELINES': {'moshe.pipelines.MoshePipeline': 400}}
    CHECK_CLASS = ['shorts','glove','hoodies','shirts','jackets','gilet','skirt','dress','polo','sock','top','trousers','leggings','shoes','hats','sweatshirts']

    table_name = "Puma"
    def GetPriceAndPictures(self,response,tb):
       name = response.css(".product-name::text").get()
       price = float(response.css("span.value::text").get()[1:])
       color = response.css("span.content-colour-value::text").get()
       Product_code = response.css(".product-accordion-item-li > span::text").get()
       #Calculate Image URL
       urlImage = response.css('#attributes-container-color > div').get()
       indexofimg = urlImage.find("img")
       endindex = urlImage.find("png",indexofimg)
       image = []
       image.append(urlImage[indexofimg+6:endindex+3])
       i = 0
       for eachImage in image:
           image[i] = eachImage.replace("_450" , "_900")
           i += 1
       item = MosheItem()
       item['Product_code'] = Product_code.strip()
       allDetails = tb.split("-")
       #kids-boys-shoes-infant
       #men-clothing-classics
       print("ALLLLDETAKS :  " , allDetails)
       if(allDetails[1].lower() == "girls" or allDetails[1].lower() == "boys"):
           item['kids_gender'] = allDetails[1]
           item['Category'] = allDetails[2]
           if(item['Category'] == "shirts"):
               item['Category'] = "t-" + item['Category']
           if(3 < len(allDetails)):# 3 == allDetails[3]
               if(allDetails[3] == "8"):
                   item['which_style'] = "older"
               else:
                   item['which_style'] = allDetails[3]
       else:
           defaultCategory = "clothing"
           for each_cat in self.CHECK_CLASS:
               if(each_cat in allDetails):
                   defaultCategory = each_cat ## Each Category

           item['Category'] = defaultCategory# if Category Not Exists in our list so we give to this product clothing Category     


           #item['Category'] = allDetails[2]#Class means if it Clothing ,Shoes,Gloves etc...

           item['which_style'] = allDetails[1]#Style means classic,sport,tennis,basketball


       
       if(allDetails[0].startswith("wom")):
           item['gender'] = "women"
       elif(allDetails[0].startswith("men")):
           item['gender'] = "men"
       else:
           item['gender'] = allDetails[0]

       item['name'] = name
       item['price'] = price
       item['images'] = image
       item['brand'] = self.table_name
       item['color'] = color.strip()
       ######Check if item inStock#######
       productDetailsOnSTR = response.css('div::attr(data-puma-analytics)').get()
       json_obj = json.loads(productDetailsOnSTR)
       if(json_obj['product']['inStock'] == "true"):
           item['inStock'] = True
       else:
           item['inStock'] = False

       sizes = response.css('[data-component="pdp/ProductSwatches"]::attr(data-component-options)').extract()
       SIZE_JSON_OBJ = json.loads(sizes[1])
       SIZE_LIST = []
       for eachSize in SIZE_JSON_OBJ['swatches']:
           SIZE_LIST.append(eachSize['displayValue'])
       item['sizes'] = SIZE_LIST
       yield item



    def parse(self,response):
        
        #Calculate name of Table
        start_name = str(response.request.url).index('=')
        end_name = str(response.request.url).index('&')
        table_name = str(response.request.url[start_name+1:end_name])
        


        
        
        
        #All Links
        links = response.css('body > div > div > div > div.product-tile-body > div.swatches > a:nth-child(1)::attr(href)').extract()

        #Yield Summarize all Request and after do each one
        for eachlink in links:
            yield scrapy.Request("https://us.puma.com/" + eachlink,callback=self.GetPriceAndPictures,cb_kwargs=dict(tb = table_name))
            