import scrapy
from ..items import MosheItem
import json



class Newpuma1Spider(scrapy.Spider):
    name = 'newpuma2'
    
    start_urls = [
        ##################################################KIDS#######################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-girls-shoes-toddler&start=35&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-girls-shoes-little-kids&start=36&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-boys-shoes-infant-%26-toddler&start=35&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-boys-shoes-junior&start=36&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-girls-clothing&start=33&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-boys-clothing&start=33&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=kids-boys-clothing&start=69&sz=36&isAjax=1',

        ###############################################MENS SHORTS##################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-shorts&start=34&sz=36&isAjax=1',


        ###############################################MENS SWEATSHIRTS##################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-sweatshirts-%26-hoodies&start=33&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-sweatshirts-%26-hoodies&start=69&sz=36&isAjax=1',

        ###############################################MENS T-SHIRTS##################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-t-shirts-%26-tops&start=34&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-t-shirts-%26-tops&start=70&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-t-shirts-%26-tops&start=106&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-t-shirts-%26-tops&start=142&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-t-shirts-%26-tops&start=178&sz=36&isAjax=1',
        

        ###############################################MENS TRACKSUITS##################################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-tracksuits&start=33&sz=36&isAjax=1',

        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-jackets&start=35&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-jackets&start=71&sz=36&isAjax=1',
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=mens-clothing-jackets&start=107&sz=36&isAjax=1',
        ###############################################MEN CLOTHING CLASSICS###############################
        'https://us.puma.com/on/demandware.store/Sites-NA-Site/en_US/Search-UpdateGrid?cgid=men-clothing-classics&start=36&sz=36&isAjax=1',

    ]
    
    custom_settings = {'ITEM_PIPELINES': {'moshe.pipelines.MoshePipeline': 400}}
    
    CHECK_CLASS = ['shorts','glove','hoodies','shirts','jackets','gilet','skirt','dress','polo','sock','top','trousers','leggings','shoes','hats','sweatshirts']

    table_name = "Puma"
    def OPPPP(self,response,tb):
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
       item = MosheItem()
       item['Product_code'] = Product_code.strip()

       allDetails = tb.split("-")
       #kids-boys-shoes-infant
       #men-clothing-classics
       print("ALLLLDETAKS :  " , allDetails)
       if(allDetails[1].lower() == "girls" or allDetails[1].lower() == "boys"):
           item['kids_gender'] = allDetails[1]
           item['Category'] = allDetails[2]
           if(3 < len(allDetails)):# 3 == allDetails[3]
               if(allDetails[3] == "8"):
                   item['which_style'] = "older"
               else:
                    if(allDetails[3] == "junior"):
                       item['which_style'] = "older"
                    elif(allDetails[3] == "infant"):
                        item['which_style'] = "toddler"
                    else:
                        item['which_style'] = "little"
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



    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url,callback=self.YESSSS,meta = {'dont_redirect': True,'handle_httpstatus_list': [302]})
        

    def YESSSS(self,response):
        
        #Calculate name of Table
        print("REQUESTTTTTTTTTTTTTTTTTTT::: " , response.request.url)
        start_name = str(response.request.url).index('=')
        end_name = str(response.request.url).index('&')
        table_name = str(response.request.url[start_name+1:end_name])
        #All Links
        links = response.css('body > div > div > div > div.product-tile-body > div.swatches > a:nth-child(1)::attr(href)').extract()
        print(links)
        #Yield Summarize all Request and after do each one
        for eachlink in links:
            yield scrapy.Request("https://us.puma.com/" + eachlink,callback=self.OPPPP,cb_kwargs=dict(tb = table_name))
            