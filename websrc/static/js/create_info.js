function changeRentType(){
    var sel = document.getElementById("type_rent_input");
    var house = document.getElementById("add_new_house_section");
    if(sel.selectedIndex == 0) {
        house.setAttribute("style", "display:none;");
    }
    else {
        house.setAttribute("style", "display:visible;");
    }
}

function CreateInfo(){
    g_currentUser.name = "Tom";
    if (g_currentUser.name == ""){
        alert("Please login in first.");
        return;
    }
    var UserHandle=GetSendObj();
    UserHandle.onreadystatechange = function() {
        if(UserHandle.readyState==4) {
            if(UserHandle.status==401) {
                return;
            }
            else if(UserHandle.status == 200) {
                var json = JSON.parse(UserHandle.responseText);
                if(json.status == 'success') {
                    window.location.replace("index.html");
                }
                else {
                    alert("Failed to create information!");
                }
            }
        }
    }

    var title = document.getElementById("title_input");
    if(title.value == "") {
        alert("Please input title.");
        return;
    }
    var typeRent = document.getElementById("type_rent_input");
    var price = document.getElementById("price_input");
    var num_People = document.getElementById("num_people_input");
    var province = document.getElementById("province_input");
    var city = document.getElementById("city_input");
    var location = document.getElementById("location_input");
    var content = document.getElementById("content_input");
    var data = {
        userid : g_currentUser.id,
        title : title.value,
        typeRent : typeRent.selectedIndex,
        price : price.selectedIndex,
        num_People : num_People.selectedIndex,
        province : province.selectedIndex,
        city : city.value,
        location : location.value,
        content : content.value
    };
    if(typeRent != 0){
        var houseName = document.getElementById("house_name_input");
        if(houseName.value == "") {
            alert("Please input house name.");
            return;
        }
            var levelOfDecoration = document.getElementById("type_level_decoration_input");
        var houseType = document.getElementById("type_house_input");
        var numBedroom = document.getElementById("num_bedroom_input");
        var housePrice = document.getElementById("house_price_input");
        var houseLocation = document.getElementById("house_location_input");
        var houseArea = document.getElementById("house_area_input");
        var description = document.getElementById("house_description_input");
        var houseInfo ={
            userid : g_currentUser.id,
            houseName : houseName.value,
            levelOfDecoration : levelOfDecoration.selectedIndex,
            houseType : houseType.selectedIndex,
            numBedroom : numBedroom.selectedIndex,
            housePrice : Number(housePrice.value),
            houseLocation : houseLocation.value,
            houseArea : Number(houseArea.value),
            description : description.value,
            pictureIndex1 : getImageData("house_picture1_preview"),
            pictureIndex2 : getImageData("house_picture2_preview"),
            pictureIndex3 : getImageData("house_picture3_preview"),
        };
        data["houseInfo"] = houseInfo;
    }
    UserHandle.open("post","/addInfo");
    UserHandle.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    UserHandle.send(JSON.stringify(data));
}


