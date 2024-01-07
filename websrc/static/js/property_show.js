function ShowImage(container, src){
    const previewContainer = document.getElementById(container);
    var img = previewContainer.querySelector('img');
    if(img==null) {
        img = document.createElement('img');
        // 将图片元素添加到预览容器中
        previewContainer.appendChild(img);
    }
// 设置图片的 src 属性为 FileReader 读取的结果
    img.src = src;
}

function Property_show_detail(json){
    if(json.status != "success") return;
    var data = json.data;
    $("#title_input").val(data.title);
    $("#type_rent_input").val(LIST_TYPE_RENT[data.rentType]);
    $("#price_input").val(LIST_PRICE[data.preferredPrice]);
    $("#num_people_input").val(data.numPeople);
    $("#province_input").val(LIST_PROVINCE[parseInt(data.province)]);
    $("#city_input").val(data.city);
    $("#location_input").val(data.location);
    $("#content_input").val(data.content);
    if(data.rentType != 0) {
        var house = data.house;
        $("#add_new_house_section")[0].setAttribute("style", "display:visible;");
        $("#house_name_input").val(house.housename);
        $("#type_level_decoration_input").val(LIST_DECORATION[house.housedecoration]);
        $("#type_house_input").val(LIST_HOUSE_TYPE[house.housetype]);
        $("#num_bedroom_input").val(house.houserooms);
        $("#house_price_input").val("$" + house.houseprice);
        $("#house_location_input").val(house.houselocation);
        $("#house_area_input").val(house.housesize + " Sq Ft");
        $("#house_description_input").val(house.housecontent);
        ShowImage("house_picture1_preview", "data:image/png;base64," + house.houseimg1);
        ShowImage("house_picture2_preview", "data:image/png;base64," + house.houseimg2);
        ShowImage("house_picture3_preview", "data:image/png;base64," + house.houseimg3);
    }
    user = data.user;
    if(user.userheadIcon != "") {
        $("#user_icon")[0].src = "data:image/png;base64," + user.userheadIcon;
    }
    $("#user_name")[0].innerHTML = user.username;
    $("#user_title")[0].innerHTML = user.usertitle;
    var phone = $("#user_phone")[0];
    phone.innerHTML = "<i class=\"fa fa-phone\" aria-hidden=\"true\"></i>  " + user.userphoneNumber;
    var mail = $("#user_mail")[0];
    mail.innerHTML = "<i class=\"fa fa-fax\" aria-hidden=\"true\"></i>  " + user.usermail;
    var location = $("#user_location")[0];
    location.innerHTML = "<i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i>  " + user.userlocation;
    $("#user_content")[0].innerHTML = user.usercontent;
}