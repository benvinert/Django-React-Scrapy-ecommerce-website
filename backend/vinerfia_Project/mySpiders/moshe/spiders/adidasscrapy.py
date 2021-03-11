import scrapy
from ..items import MosheItem


class AdidasscrapySpider(scrapy.Spider):
    name = 'adidasscrapy'
    # hoodie jacket shoe 
    start_urls = [

            ####################MEN###################
            'https://www.adidas.co.il/en/men-originals-shoes'
            'https://www.adidas.co.il/en/men-football-shoes',
            'https://www.adidas.co.il/en/men-running-shoes',
            'https://www.adidas.co.il/en/men-training-shoes',
            'https://www.adidas.co.il/en/men-outdoor-shoes',
            'https://www.adidas.co.il/en/men-sliders_flip_flops',
            'https://www.adidas.co.il/en/men-essentials-shoes',
            'https://www.adidas.co.il/en/men-basketball-shoes',
            'https://www.adidas.co.il/en/men-tracksuits',
            'https://www.adidas.co.il/en/men-trousers',
            'https://www.adidas.co.il/en/men-t-shirt-and-tops',
            'https://www.adidas.co.il/en/men-football-jersey',
            'https://www.adidas.co.il/en/men-track-tops',
            'https://www.adidas.co.il/en/men-sweatshirts',
            'https://www.adidas.co.il/en/men-shorts',
            'https://www.adidas.co.il/en/men-socks-leg-warmers',
            'https://www.adidas.co.il/en/men-tights',
            'https://www.adidas.co.il/en/men-headwear'
            'https://www.adidas.co.il/en/men-gloves',
            #####################WOMEN#####################
            'https://www.adidas.co.il/en/women-originals-shoes',
            'https://www.adidas.co.il/en/women-running-shoes',
            'https://www.adidas.co.il/en/women-training-shoes',
            'https://www.adidas.co.il/en/women-sliders_flip_flops',
            'https://www.adidas.co.il/en/women-essentials-shoes',
            'https://www.adidas.co.il/en/women-tights',
            'https://www.adidas.co.il/en/women-tracksuits',
            'https://www.adidas.co.il/en/women-jackets',
            'https://www.adidas.co.il/en/women-trousers',
            'https://www.adidas.co.il/en/women-skirts_dresses-clothing',
            'https://www.adidas.co.il/en/women-t-shirt-and-tops',
            'https://www.adidas.co.il/en/women-hoodies',
            'https://www.adidas.co.il/en/women-track-tops',
            'https://www.adidas.co.il/en/women-shorts',
            #####################KIDS#####################
            'https://www.adidas.co.il/en/kids-boys-toddlers_1_4_years-shoes',
            'https://www.adidas.co.il/en/kids-girls-toddlers_1_4_years-shoes',
            'https://www.adidas.co.il/en/kids-boys-toddlers_1_4_years-clothing',
            'https://www.adidas.co.il/en/kids-girls-toddlers_1_4_years-clothing',


            'https://www.adidas.co.il/en/kids-boys-kids_4_8_years-shoes',
            'https://www.adidas.co.il/en/kids-girls-kids_4_8_years-shoes',
            'https://www.adidas.co.il/en/kids-girls-kids_4_8_years-clothing',
            'https://www.adidas.co.il/en/kids-boys-kids_4_8_years-clothing',

            'https://www.adidas.co.il/en/kids-girls-youth_8_16_years-shoes',
            'https://www.adidas.co.il/en/kids-boys-youth_8_16_years-shoes',
            'https://www.adidas.co.il/en/kids-girls-youth_8_16_years-clothing',
            'https://www.adidas.co.il/en/kids-boys-youth_8_16_years-clothing',
            
        ]
    CHECK_CLASS = ['shorts','glove','hoodie','swimwear','tights','t-shirts','sweatshirts','jackets','jacket','gilet','bags','dresses','polo','sock','tops','trousers','leggin','shoe','tracksuits']
    #toddler 1-4 , Kids 4-8 , youth 8-16
    
    table_name = "Adidas"
    custom_settings = {'ITEM_PIPELINES': {'mySpiders.moshe.pipelines.MoshePipeline': 400}}
    indexx = -1
    def start_requests(self):
        for url in self.start_urls:
            self.indexx += 1
            yield scrapy.Request(url=url,callback=self.parse,meta={'index' : self.indexx})
            




    def getPictures(self,response,item):
        images = response.css(".main-image > a > img::attr(src)").extract()
        
        color = response.css("li.rnd-adidas-vspacing-all-medium.order-99 > span::text").get()
        sizes = response.css(".wrapper-size-items--pdetail > button > span::text ").extract()
        price = response.css('[data-area-name="product-price"]::attr(data-price)').get()
        Product_code = response.request.url.split("-")
        Product_code = Product_code[len(Product_code)-1]
        i = 0
        for eachImage in images:
            images[i] = eachImage.replace("550","900")
            i += 1
        
        item['price'] = round((float(price) / 3.4),2)
        item['name'] = response.css('[data-js="product-name"]::text').get()
        index = 0

        for each_size in sizes:
            sizes[index] = each_size.strip()[0:2]
            index += 1


        item['product_code'] = Product_code
        item['sizes'] = sizes
        item['images'] = images
        item['color'] = color.strip()
        yield item
        
    def parse(self, response):
        price = response.css(".price::text").extract()
        names = response.css('[data-area-name="product-name"] > a::text').extract()
        
       
        index = 0
        url_details= response.request.url[28:]
        arr_details = url_details.split('-')

        gender = arr_details[0]
        links = response.css(".picture > a::attr(href)").extract()
        style = response.css('[data-area-name="category-name"]::text').get()

        for each_name in names:
            
            item = MosheItem()
            for each_class in self.CHECK_CLASS:
                if(each_class in style.lower()):
                    item['Category'] = each_class
                    break
            
            if(gender == "kids"):
                item['kids_gender'] = arr_details[1]# Boys or Girls
                item['gender'] = gender
                item['Category'] = arr_details[len(arr_details)-1]
                arr_details[2] = arr_details[2].lower()
                if(arr_details[2].startswith("youth")):
                    item['which_style'] = "older"
                elif(arr_details[2].startswith("toddlers")):
                    item['which_style'] = "toddler"
                elif(arr_details[2].startswith("kids")):
                    item['which_style'] = "little"
            else:
                item['gender'] = gender
                item['which_style'] = style
            

            #Because it's need to be shoes and not "shoe"
            if(item['Category'] == "shoe" or item['Category'] == "hoodie" or item['Category'] == "jacket"):
                item['Category'] = item['Category'] + "s"



            item['brand'] = self.table_name
            
            index += 1
            
            for each_link in links:
                yield scrapy.Request(url="https://www.adidas.co.il" + each_link,callback=self.getPictures,cb_kwargs=dict(item=item))
               
            


        
                



                
        
        