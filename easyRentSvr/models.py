from django.db import models

# Create your models here.
#加入json解析包
from django.http import JsonResponse
import json

# Create your models here.
#创建数据库模型，同workbench中一样，id就不需要了
######################开始rentuser模型####################################
class userinfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    location = models.CharField(max_length=100)
    preferredPrice = models.IntegerField()
    feedback = models.IntegerField()
    createtime = models.DateTimeField(auto_now_add = True)
    age = models.IntegerField()
    gender = models.IntegerField()
    headIcon = models.TextField()
    rentInfo_id = models.IntegerField()
    phoneNumber = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    mail = models.CharField(max_length=45)
    title = models.CharField(max_length=45)
    content = models.CharField(max_length=200)
    #auto_new_add = True      when the class is added
    #auto_now = True    when any data is changed

    '''def __init__(self):
        self.name = ""
        self.location = ""
        self.preferredPrice = 0
        self.feedback = 10'''

    def setName(self,name):
        self.name = name

    def setLocation(self,location):
        self.location = location

    def setPreferredPrice(self,preferredPrice):
        self.preferredPrice = preferredPrice

    def setFeedback(self,feedback):
        self.feedback = feedback

    class Meta:
        db_table = 'userinfo'

class userLordChat(models.Model):
    historyChat = models.CharField(max_length=45)
    landlordInfo_id = models.IntegerField()
    userInfo_id = models.IntegerField()

    def __init__(self,landlordInfo_id,userInfo_id):
        self.userInfo_id = userInfo_id
        self.landlordInfo_id = landlordInfo_id
        self.historyChat = ""

    def addHistory(self,str):
        self.historyChat += str

    class Meta:
        db_table = "userlordchat"

class commentInfo(models.Model):
    history = models.CharField(max_length=45)
    commentListInfo_id = models.IntegerField()

    def __init__(self,commentListInfo_id):
        self.commentListInfo_id = commentListInfo_id
        self.history = ""

    def addHistory(self,str):
        self.historyChat += str

    class Meta:
        db_table = "commentinfo"

class commentListInfo(models.Model):
    houseInfo_id = models.IntegerField()
    houseInfo_landlordInfo_id = models.IntegerField()
    houseInfo_userInfo_id = models.IntegerField()

    def __init__(self,houseInfo_id,houseInfo_landlordInfo_id,houseInfo_userInfo_id):
        self.houseInfo_userInfo_id = houseInfo_userInfo_id
        self.houseInfo_landlordInfo_id = houseInfo_landlordInfo_id
        self.houseInfo_id = houseInfo_id

    class Meta:
        db_table = "commentlistinfo"

class houseInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    description = models.CharField(max_length = 1000)
    price = models.IntegerField()
    comment = models.IntegerField()
    landlordInfo_id = models.IntegerField()
    userInfo_id = models.IntegerField()
    location = models.CharField(max_length=45)
    roomNum = models.IntegerField()
    levelOfDecoration = models.IntegerField()
    pictureIndex1 = models.TextField()
    pictureIndex2 = models.TextField()
    pictureIndex3 = models.TextField()
    rentInfo_id = models.IntegerField()
    houseType = models.IntegerField()
    size = models.IntegerField()
    createtime = models.DateTimeField(auto_now=True)

    def setName(self,name):
        self.name = name

    def setPrice(self,price):
        self.price = price

    def addDescription(self,str):
        self.description += str

    def setComment(self,comment):
        self.comment = comment

    class Meta:
        db_table = "houseinfo"

class rentInfo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    province = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    preferredPrice = models.IntegerField()
    groupNum = models.IntegerField()
    rentType = models.IntegerField()
    numPeople = models.IntegerField()
    house_id = models.IntegerField()
    createTime = models.DateTimeField(auto_now=True)
    userInfo_id = models.IntegerField()

    class Meta:
        db_table = "rentinfo"

class landlordInfo(models.Model):
    name = models.CharField(max_length=45)
    verified = models.IntegerField()
    feedback = models.IntegerField()

    def setName(self,name):
        self.name = name

    def setVerified(self,state):
        self.verified = state

    def setFeedback(self,feedback):
        self.feedback = feedback

    def __init__(self):
        self.name = ""
        self.verified = 0
        self.feedback = 10

    class Meta:
        db_table = "landlordinfo"



def checkUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('username','')
        users = userinfo.objects.raw("select * from userinfo where name = '" + name + "'")
        password = data.get('password','')
        for user in users:
            if(user.password == password):
                    #账号密码一样，返回成功
                return JsonResponse({"status" : "success", "name" : user.name, "id" : user.id})
            else:
                return JsonResponse({"status" : "fail"})
                #根本没这个人，返回失败
        return JsonResponse({"status" : "fail"})

def addUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        #change the thing in the get......
        name = data.get('username','')
        #!!!judge!!!
        users = userinfo.objects.raw("select * from userinfo where name = '" + name + "'")
        #users = userInfo.objects.filter(name=name)
        if(len(users)!=0):
            return JsonResponse({"status" : "fail", "reason" : "Name already exists!"})

        location = data.get('location','Empty Location')
        preferredPrice = int(data.get('preferredPrice','0'))
        feedback = int(data.get('feedback','0'))
        age = int(data.get('age','0'))
        phoneNumber = data.get('phone_number','')
        password = data.get('password','')
        #gender = data.get('gender','0')
        gender = 10
        #remember to remove
        table = userinfo(name=name,location=location,preferredPrice=preferredPrice,feedback=feedback,age=age,phoneNumber=phoneNumber,password=password,gender=gender)
        table.mail = data.get('email','')
        table.headIcon = data.get('headicon','')
        table.title = data.get('title','')
        table.content = data.get('content','')
        '''table.setName(name)
        table.setFeedback(feedback)
        table.setLocation(location)
        table.setPreferredPrice(preferredPrice)'''
        table.save()
        return JsonResponse({'status': 'success'})

def addInfo(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        #for i in range(0,100):
        rent = rentInfo()
        rent.title = data.get('title','')
        rent.content = data.get('content','')
        rent.province = data.get('province',0)
        rent.city = data.get('city','')
        rent.location = data.get('location','')
        rent.preferredPrice = data.get('price',0)
        rent.groupNum = data.get('num_People',0)
        rent.rentType = data.get('typeRent',0)
        rent.numPeople = data.get('num_People',0)
        rent.house_id = 0
        rent.userInfo_id = data.get('userid',0)
        if(rent.rentType != 0):
            houseData = data.get("houseInfo")
            name = houseData['houseName']
            house = houseInfo(name = name, userInfo_id = houseData['userid'])
            house.description = houseData['description']
            house.price = houseData['housePrice']
            house.comment = 0
            house.landlordInfo_id = 0
            house.location = houseData['houseLocation']
            house.roomNum = houseData['numBedroom']
            house.levelOfDecoration = houseData['levelOfDecoration']
            house.pictureIndex1 = houseData['pictureIndex1']
            house.pictureIndex2 = houseData['pictureIndex2']
            house.pictureIndex3 = houseData['pictureIndex3']
            house.rentInfo_id = 0
            house.houseType = houseData['houseType']
            house.size = houseData['houseArea']
            house.save()
            rent.house_id = house.id
        rent.save()
        return JsonResponse({'status': 'success'})

def deleteUser(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        table = userInfo.objects.get(id=id)
        table.delete()
        return JsonResponse({'status': 'success'})

def updateUser(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        name = request.POST.get('name')
        location = request.POST.get('location')
        preferredPrice = request.POST.get('preferredPrice')
        feedback = request.POST.get('feedback')
        table = rentuser.objects.get(id=id)
        table.name = name
        table.location = location
        table.preferredPrice = preferredPrice
        table.feedback = feedback
        table.save()
        return JsonResponse({'status': 'success'})

def queryUser(request):
    if request.method == 'GET':
        tables_list = rentuser.objects.all()
        data = []
        for table in tables_list:
            data.append({
                'id': table.id,
                'name': table.name,
                'location': table.location,
                'preferredPrice': table.preferredPrice,
                'feedback': table.feedback,
            })
        return JsonResponse({'status': 'success', 'data': data})

