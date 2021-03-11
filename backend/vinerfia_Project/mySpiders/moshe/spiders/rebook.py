import scrapy
import requests
import json
from ..items import MosheItem

class RebookSpider(scrapy.Spider):
    name = 'rebook'
    allowed_domains = ['rebook']
    start_urls = [
        	    ##################WOMEN####################
                'https://www.reebok.co.il/en/women-shoes-fitness-and-training',
                'https://www.reebok.co.il/en/women-shoes-running',
                'https://www.reebok.co.il/en/women-shoes-classics',
                'https://www.reebok.co.il/en/women-shoes-sliders-and-flip-flop',

                'https://www.reebok.co.il/en/women-tanks',
                'https://www.reebok.co.il/en/women-thsirt-and-tops',
                'https://www.reebok.co.il/en/women-hoodies-and-sweatshirts',
                'https://www.reebok.co.il/en/women-jackets',
                'https://www.reebok.co.il/en/women-trousers',
                #https://www.reebok.co.il/en/women-sports-bras Optionaly it collects all Sport Clothing to Women
                'https://www.reebok.co.il/en/women-tights-and-leggings',
                'https://www.reebok.co.il/en/women-shorts',
                'https://www.reebok.co.il/en/women-socks',
                'https://www.reebok.co.il/en/women-hats-and-caps',
                'https://www.reebok.co.il/en/women-water-bottles',
                #############################MEN############################
                'https://www.reebok.co.il/en/men-shoes-fitness-and-training',
                'https://www.reebok.co.il/en/men-shoes-running',
                'https://www.reebok.co.il/en/men-shoes-classics',
                'https://www.reebok.co.il/en/men-sliders-and-flip-flops',
                'https://www.reebok.co.il/en/men-tanks',
                'https://www.reebok.co.il/en/men-t-shirt-and-tops',
                'https://www.reebok.co.il/en/men-hoodies-and-sweatshirts',
                'https://www.reebok.co.il/en/men-jackets',
                'https://www.reebok.co.il/en/men-trousers',
                'https://www.reebok.co.il/en/men-trousers',
                'https://www.reebok.co.il/en/men-shorts',
                'https://www.reebok.co.il/en/men-socks',
                'https://www.reebok.co.il/en/men-hats-and-caps'
                'https://www.reebok.co.il/en/youth-9-14-girls-shoes',
                'https://www.reebok.co.il/en/youth-9-14-boys-shoes',
                'https://www.reebok.co.il/en/kids-5-8-girls-shoes',
                'https://www.reebok.co.il/en/kids-5-8-boys-shoes',
                'https://www.reebok.co.il/en/kids-1-0-boys-shoes'
                ####DONE ALLLL###
        
                  ]
    table_name = "rebook"
    custom_settings = {'ITEM_PIPELINES': {'mySpiders.moshe.pipelines.MoshePipeline': 400}}
    CHECK_CLASS = ['shorts','hoodies','jackets','skirt','bags','bottles','socks','tops','trousers','leggings','shoes','hats','shirt']

    def getDetails(self,response,item):
        productID = response.css("#product-ribbon-info::attr(data-productid)").get()
        name = response.css('[data-js="product-name"]::text').get()
        img = response.css('.thumbnails__slider.visible__item > button > img::attr(src)').extract()
        sizes = response.css(".rnd-reebok-label.size-item--pdetail > span::text").extract()
        Product_code = response.request.url.split("-")
        Product_code = Product_code[len(Product_code)-1]

        #Request To get PRICE
        URL_TO_PRICE = "https://www.reebok.co.il/shoppingcart/productdetails_attributechange?productId=" + productID + "&validateAttributeConditions=False&loadPicture=True"
        res_PRICE = requests.post(url=URL_TO_PRICE)
        res_Price_Json = json.loads(res_PRICE.text)
        price = round(float(res_Price_Json['price'][2:]) / 3.4,2)
        #####################

        #Request to get COLOR
        URL_TO_COLOR = "https://www.reebok.co.il/GetProductSpecificationAttributeById?productId=" + productID + "&SpecId=5"
        res_COLOR = requests.post(url=URL_TO_COLOR)
        res_Color_Json = json.loads(res_COLOR.text)
        color = res_Color_Json['ProductSpecificationModel']['ValueRaw']
        #####################


        #### DELETE ALL SPACES BETWEEN###
        ind = 0
        for each_size in sizes:
            sizes[ind] = each_size.strip()
            ind += 1
        #############
        
        #### CALCULATE TO GET RIGHT URL IMG####
        ind = 0
        for each_img in img:
            img[ind] = each_img[0:32] + each_img[49:]
            ind += 1    
        #############

        item['product_code'] = Product_code
        item['color'] = color
        item['price'] = price
        item['images'] = img
        item['name'] = name
        item['sizes'] = sizes

        return item

        


    def parse(self, response):
        
        links = response.css(".item-box.col-s-6.col-m-4.col-l-6.no-gutters > .product-item > .picture > a::attr(href)").extract()
        URL_Categorys = response.request.url[28:].split("-")
        item = MosheItem()
        item['brand'] = self.table_name
        if(URL_Categorys[0] == "youth" or URL_Categorys[0] == "kids"):
            if(URL_Categorys[0] == "youth"):
                item['which_style'] = "older"
            elif(URL_Categorys[1] == "5"):
                item['which_style'] = "little"
            elif(URL_Categorys[1] == "1"):
                item['which_style'] = "toddler"
            item['kids_gender'] = URL_Categorys[3]
            item['Category'] = URL_Categorys[4]
            item['gender'] = "kids"
        else:
            for each_category in self.CHECK_CLASS:
                if(each_category in URL_Categorys):
                    item['Category'] = each_category
                    break

            item['gender'] = URL_Categorys[0]

            if(item['Category'] == "shoes"):
                item['which_style'] = URL_Categorys[2]

            elif(item['Category'] == "tops"):
                item['Category'] = "t-shirt&tops"
            else:
                item['which_style'] = "None"
            
        for each_link in links:
            yield scrapy.Request("https://www.reebok.co.il/" + each_link,callback=self.getDetails
            ,dont_filter=True,cb_kwargs=dict(item=item))
