import scrapy
import json
from ..items import MosheItem
import requests


class Nikescrapy3Spider(scrapy.Spider):
    name = 'nikescrapy3'
    allowed_domains = ['nike']
    start_urls = [
                    ##############################################################HALF#############################################
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D792%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D816%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D840%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D864%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D888%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D912%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D936%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D960%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D984%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1008%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1032%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1056%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1080%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1104%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=ru&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1128%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1152%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(0f64ecc7-d624-4e91-b171-b83a03dd8550%2Ca00f0bb2-648b-4853-9559-4cd943b7d6c6)%26anchor%3D1176%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',

        ###############################################################WOMEN SHOES###########################################
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D24%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D48%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D72%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D96%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D120%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D144%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D168%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D192%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D216%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D240%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D264%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D288%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D312%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D336%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D360%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D384%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D408%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D432%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D456%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D480%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D504%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        'https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=BEA8FB1FAA0EA65A34878855E2D65E0D&country=il&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(IL)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(16633190-45e5-4830-a068-232ac7aea82c%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D528%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D',
        
    ]

    allTitles = []
    allPrices = []
    
    custom_settings = {'ITEM_PIPELINES': {'mySpiders.moshe.pipelines.MoshePipeline': 400}}    
    CHECK_CLASS = ['shorts','glove','hoodie','t-shirt','jacket','gilet','skirt','dress','polo','sock','top','trousers','leggin','shoe','hat']
    table_name = "Nike"
    def getPrice(self,response,item):
        #pdp-6-up > button:nth-child(3) > div > picture:nth-child(3) > source:nth-child(1)
        image = response.css("#pdp-6-up > button > div > picture > source::attr(srcset)").get()
        images = []
        images.append(image)
        item['images'] = images
        yield item

    def parse(self, response):
        results = json.loads(response.body)
        
        for product in results['data']['products']['products']:
            item = MosheItem()
            item['product_code'] = product['pid']
            self.allTitles.append(product['title'])
            self.allPrices.append(product['price']['currentPrice'])
            #Check gender product
            if('Men' in product['subtitle']):
                item['gender'] = 'men'
                item['which_style'] = product['subtitle']
            elif('Women' in product['subtitle']):
                item['gender'] = 'women'
                item['which_style'] = product['subtitle']
            elif('kids' in product['subtitle'].lower()):
                kids_details_splited = product['subtitle'].split(" ")
                if(kids_details_splited[0].lower() == "toddler" or kids_details_splited[0].lower() == "baby"):
                    item['which_style'] = "toddler"
                elif(kids_details_splited[0].lower() == "younger"):
                    item['which_style'] = "little"
                elif(kids_details_splited[0].lower() == "older"):
                    item['which_style'] = "older"
                else:
                    item['which_style'] = product['subtitle']
                item['gender'] = kids_details_splited[1].replace("'","")#/////// Check this
                if("girls" in kids_details_splited[2].lower()):
                    item['kids_gender'] = "girls"
                elif("boys" in kids_details_splited[2].lower()):
                    item['kids_gender'] = "boys"
                else:
                    item['kids_gender'] = "both"
                    
            else:
                item['gender'] = "both"
                item['which_style'] = product['subtitle']
            #check for which class to navigate 
            for check_class in self.CHECK_CLASS:
                if(check_class in product['subtitle'].lower()):
                    if(check_class == 'shoe'):
                        item['Category'] = "shoes"
                    else:
                        item['Category'] = check_class
            item['inStock'] = product['inStock']
            product['cloudProductId']
            dat = {"cloudProductIds" : [product['cloudProductId']],"country": "il"}
            req = requests.post(url="https://product-api.dea-eng-prod.nikecloud.com/marketing_proxy_lambda",json=dat,headers={"Content-Type":"application/json"})
            JSON_OBJ_SIZES = json.loads(req.text)
            
            LIST_SIZES = JSON_OBJ_SIZES['products'][0]['skuData']
            index = 0
            for each_size in LIST_SIZES:
                LIST_SIZES[index] = each_size['size']
                index += 1
            item['sizes'] = LIST_SIZES
            
            item['name'] = product['title']
            item['price'] = round(float(product['price']['currentPrice']) / 3.4,2)
            item['color'] = product['colorways'][0]['colorDescription']
            url = product['colorways'][0]['pdpUrl']
            realurl = "https://www.nike.com/il" + url[url.find('/'):]
            item['brand'] = "nike"
            
            yield scrapy.Request(url=realurl,callback=self.getPrice,dont_filter=True,cb_kwargs=dict(item=item))
