# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo
# import mysql.connector

class MoshePipeline(object):

    def __init__(self):
        self.conn = pymongo.MongoClient(
            "mongodb+srv://benvinerttt:ab0548112@benproject.fzbf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        )
        dbnames = self.conn.list_database_names()
        ifDbExists = False
        if "Products" in dbnames:
            ifDbExists = True
        
        if(ifDbExists):
            self.db = self.conn['Products2']#Name Database
        else:
            self.db = self.conn['Products']#Name Database
        


    def process_item(self,item,spider):
        self.collection = self.db[spider.table_name]#Name "Table" to create
        count = int(self.collection.find({}).count()) + 1
        item = dict(item)
        item.update({"_id" : count})
        self.collection.insert(item)
        
        return item














    #------------MySQL Connection-----------------------
    # def __init__(self):
    #     print("PIPELINE CALLLLLLLLLLLLEDDD")
    #     self.create_connection()
    #     self.create_table()

    # def process_item(self, item, spider):
    #     print("PROCESSSSSSSS ITEM CALL")
    #     self.store_db(item)
    #     return item

    # def create_connection(self):
    #     self.conn = mysql.connector.connect(
    #         host='localhost',
    #         user='root',
    #         password='0548112',
    #         auth_plugin='mysql_native_password',
    #         database='scrapy'
    #     )
    #     self.curr = self.conn.cursor()


    # def create_table(self):
    #     print("CREATED TABLEEEEE")
    #     self.curr.execute("DROP TABLE IF EXISTS NikeScrapy")
    #     self.curr.execute("CREATE TABLE NikeScrapy(name text,price text)")
           
    # def store_db(self,item):
    #     self.curr.execute("insert into NikeScrapy values(%s, %s)",(
    #         item['name'],
    #         item['price']
    #     ))
    #     self.conn.commit()