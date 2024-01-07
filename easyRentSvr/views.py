from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
#加入models包
from easyRentSvr.models import *
# Create your views here.
def index(request):
    if(request.method == 'GET'):#GET方法的处理，一般的网页之类的文件，直接通过地址要求的内容，都是GET方法
        return getHandle(request);
    elif(request.method == 'POST'):#POST方法的处理，一般数据的请求，通过ajax文法的内容，都是POST方法
        return postHandle(request);
    else:
        return otherHandle(request);#其他处理
    return;
#GET处理函数
def getHandle(request):
    path = request.path;
    if(path == '/'):        #如果没有具体页面，就用缺省页面index.html
        path = 'index.html';
    else :
        path = request.path[1:];#把路径去掉第一个字符‘/’。
    return render(request, path);

#POST处理函数
def postHandle(request):
    if(request.path == '/registerUser'):#用路径来表示请求的数据是什么内容，这里是增加用户的例子
        return addUser(request);
    elif(request.path == '/checkUser'):
        return checkUser(request);
    elif(request.path == '/addInfo'):
        return addInfo(request);
    elif(request.path == '/searchHouse'):
        return searchHouse(request);
    elif(request.path == '/showDetail'):
        return showDetail(request);

def searchHouse(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        condition = data.get('condition','')
        searchContent = data.get('searchContent','')
        params = []
        if(searchContent != ''):
            if(condition != ''):
                condition += ' and (title like %s or content like %s) '
            else:
                condition = ' (title like %s or content like %s) '
            key = f"%%" + searchContent + f"%%"
            params = [key,key]
        houseCondition = data.get('houseCondition','')
        if(houseCondition != ""):
            houseCondition = " inner join houseinfo on rentinfo.house_id = houseinfo.id and " + houseCondition
        starts = data.get('starts',0)
        rows = data.get('rows',0)
        #rents = []
        returnData = []
        if (condition == ''):
            if(houseCondition == ''):
                rents = rentInfo.objects.raw("select * from rentinfo " + " order by createTime" + " limit " + str(starts) + "," + str(rows), params)
            else:
                rents = rentInfo.objects.raw("select * from rentinfo " + houseCondition + " order by rentinfo.createTime" + " limit "  + str(starts) + "," + str(rows), params)
        else:
            if(houseCondition == ''):
                command = ("select * from rentinfo where " + condition + " order by createTime" + " limit " + str(starts) + "," + str(rows))
                rents = rentInfo.objects.raw(command,params)
            else:
                command = ("select * from rentinfo " + houseCondition + " where " + condition + " order by rentinfo.createTime" + " limit "  + str(starts) + "," + str(rows))
                rents = rentInfo.objects.raw(command,params)
        for index in range(0,len(rents)):
            info = rents[index]
            house = None
            if (info.rentType != 0 and info.house_id != None):
                houses = houseInfo.objects.raw("select * from houseinfo where id=" + str(info.house_id))
                if(len(houses) > 0):
                    houseinfo = houses[0]
                    house = {
                        "housename": houseinfo.name,
                        "housecontent": houseinfo.description,
                        "houseprice": houseinfo.price,
                        "houselocation": houseinfo.location,
                        "houserooms": houseinfo.roomNum,
                        "housedecoration": houseinfo.levelOfDecoration,
                        "houseimg1": houseinfo.pictureIndex1,
                        "houseimg2": houseinfo.pictureIndex2,
                        "houseimg3": houseinfo.pictureIndex3,
                        "housetype": houseinfo.houseType,
                        "housesize": houseinfo.size,
                    }
            returnData.append({
                "id" : info.id,
                "title" : info.title,
                "content" : info.content,
                "province" : info.province,
                "city" : info.city,
                "location" : info.location,
                "preferredPrice" : info.preferredPrice,
                "groupNum" : info.groupNum,
                "rentType" : info.rentType,
                "numPeople" : info.numPeople,
                #"house_id" : info.house_id,
                "createTime" : info.createTime,
                "userInfo_id" : info.userInfo_id,
                "house" : house
            })
        alpha = 100
        return JsonResponse({"status" : "success", "data" : returnData})


def showDetail(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id','')
        command = ("select * from rentinfo where id=" + id)
        rents = rentInfo.objects.raw(command)
        if(len(rents) <= 0): return JsonResponse({"status" : "unsuccess"})
        info = rents[0]
        house = None
        if (info.rentType != 0 and info.house_id != None):
            houses = houseInfo.objects.raw("select * from houseinfo where id=" + str(info.house_id))
            if(len(houses) > 0):
                houseinfo = houses[0]
                house = {
                    "housename": houseinfo.name,
                    "housecontent": houseinfo.description,
                    "houseprice": houseinfo.price,
                    "houselocation": houseinfo.location,
                    "houserooms": houseinfo.roomNum,
                    "housedecoration": houseinfo.levelOfDecoration,
                    "houseimg1": houseinfo.pictureIndex1,
                    "houseimg2": houseinfo.pictureIndex2,
                    "houseimg3": houseinfo.pictureIndex3,
                    "housetype": houseinfo.houseType,
                    "housesize": houseinfo.size,
                }
        users = userinfo.objects.raw("select * from userinfo where id=" + str(info.userInfo_id))
        if(len(users) <= 0): return JsonResponse({"status" : "unsuccess"})
        user = users[0]
        user_info = {
            "userid": user.id,
            "username": user.name,
            "userlocation": user.location,
            "userpreferredPrice": user.preferredPrice,
            "userfeedback": user.feedback,
            "usercreatetime": user.createtime,
            "userage": user.age,
            "usergender": user.gender,
            "userheadIcon": user.headIcon,
            "userphoneNumber": user.phoneNumber,
            "usermail": user.mail,
            "usertitle": user.title,
            "usercontent": user.content,
        }
        rent = {
            "id" : info.id,
            "title" : info.title,
            "content" : info.content,
            "province" : info.province,
            "city" : info.city,
            "location" : info.location,
            "preferredPrice" : info.preferredPrice,
            "groupNum" : info.groupNum,
            "rentType" : info.rentType,
            "numPeople" : info.numPeople,
            #"house_id" : info.house_id,
            "createTime" : info.createTime,
            "userInfo_id" : info.userInfo_id,
            "house" : house,
            "user" : user_info
        }
        return JsonResponse({"status" : "success", "data" : rent})
