# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class MosheItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    _id = scrapy.Field()
    name = scrapy.Field()
    price = scrapy.Field()
    images = scrapy.Field()
    brand = scrapy.Field()
    gender = scrapy.Field()
    kids_gender = scrapy.Field()
    which_style = scrapy.Field()
    kids_gender = scrapy.Field()
    Category = scrapy.Field()
    color = scrapy.Field()
    inStock = scrapy.Field()
    sizes = scrapy.Field()
    product_code = scrapy.Field()
    
# class nikeItem(scrapy.Item):
#     name = scrapy.Field()
#     price = scrapy.Field()
#     gender = scrapy.Field()
#     which_class = scrapy.Field()
#     which_style = scrapy.Field()
#     images = scrapy.Field()
#     brand = scrapy.Field()
