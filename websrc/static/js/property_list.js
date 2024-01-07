var property_list_type;
var property_list_location = 0;
var property_list_price;
var property_list_size = "";
var property_list_price_range = "";
var g_condition = "";
var g_start = 0;
var g_showNums = 20;
var g_houseCondition = "";
var g_searchContent = "";

function price_save(event, ui){
    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    min = 0;  //concluded
    max = 5;  // not concluded
    for(i = 0;i < LIST_PRICE_INTEGER.length-1;i++){
        if((LIST_PRICE_INTEGER[i] < ui.values[0]) && (i > min)){
            min = i;
        }
        if((LIST_PRICE_INTEGER[i+1] > ui.values[1]) && (i < max)){
            max = i + 1;
        }
    }
    property_list_price_range = "preferredPrice >= " + min + " and preferredPrice < " + max;
}

function location_save(loc){
    property_list_location = loc;
    PropertySearch();
}

function size_save(size){
    property_list_size = size;
    PropertySearch();
}

function Reset() {
    const domContainer = document.getElementById('property_content');
    var parent = domContainer.parentElement;
    parent.innerHTML = "";
    var dv = document.createElement("div");
    dv.setAttribute("id","property_content");
    parent.appendChild(dv);
}

function ShowInfo(data){
    g_data = data;
    const domContainer = document.getElementById('property_content');
    domContainer.setAttribute("id", "property_content" + g_start);
    var delete_btn = document.getElementById("preperty_loadmore");
    if(delete_btn != null){
        delete_btn.remove();
    }

    var dv = document.createElement("div");
    dv.setAttribute("id","property_content");
    domContainer.parentElement.appendChild(dv);

    ShowInfoReact();
    return;
    var main_content = document.getElementById("property_content");
    var delete_btn = document.getElementById("preperty_loadmore");
    if(delete_btn != null){main_content.removeChild(delete_btn);}
    for(var i = 0;i < data.length; i++){
        var dt = data[i];
        var house = dt.house;
        var dv = document.createElement("div");
        dv.setAttribute("class","Building-University");
        main_content.appendChild(dv);

        var dv_building_content = document.createElement("div");
        dv_building_content.setAttribute("class","Building-content");
        dv.appendChild(dv_building_content);

        var dv_building = document.createElement("div");
        dv_building.setAttribute("class","Building");
        dv_building_content.appendChild(dv_building);

        if(house != null && house.houseimg1 != ""){
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + house.houseimg1;
            dv_building.appendChild(img);
        }

        var dv_right_area = document.createElement("div");
        dv_right_area.setAttribute("class","right-area");
        dv_building_content.appendChild(dv_right_area);

        var h3_name = document.createElement("h3");
        h3_name.innerHTML = dt.content + "<a href=\"#\" class=\"house_info_btn\" onclick=\"ShowDetail(" + dt.id + ")\">Detail...-></a>";
        dv_right_area.appendChild(h3_name);

        var dv_buttons = document.createElement("div");
        dv_buttons.setAttribute("style","margin-bottom: 0%;");
        dv_right_area.appendChild(dv_buttons);

        var btn_danger = document.createElement("button");
        btn_danger.setAttribute("type","button");
        
        btn_danger.innerHTML = LIST_TYPE_RENT[dt.rentType];
        var btntype = "btn btn-danger";
        if(dt.rentType == 1) 
            btn_danger.setAttribute("class","btn btn-warning");
        else if(dt.rentType == 2) 
            btn_danger.setAttribute("class","btn btn-info");       
        dv_buttons.appendChild(btn_danger);

        var btn_primary = document.createElement("button");
        btn_primary.setAttribute("type","button");
        btn_primary.setAttribute("class","btn btn-primary");
        btn_primary.innerHTML = dt.numPeople + " people";
        dv_buttons.appendChild(btn_primary);

        var btn_success = document.createElement("button");
        btn_success.setAttribute("type","button");
        btn_success.setAttribute("class","btn btn-success");
        btn_success.innerHTML = LIST_PRICE[dt.preferredPrice];
        dv_buttons.appendChild(btn_success);

        var h5_time = document.createElement("h5");
        h5_time.innerHTML = dt.createTime;
        h5_time.setAttribute("class","house_info_h5");
        dv_buttons.appendChild(h5_time);

        var h3_location = document.createElement("h3");
        h3_location.innerHTML = dt.location;
        h3_location.setAttribute("class","house_info_h3");
        dv_buttons.appendChild(h3_location);

    }
    if(g_showNums <= data.length) {
        var dv11 = document.createElement("div");
        dv11.setAttribute("class", "Load-more");
        dv11.setAttribute("id", "preperty_loadmore");
        main_content.appendChild(dv11);
        var a11 = document.createElement("a");
        a11.setAttribute("href", "#");
        a11.setAttribute("onclick", "SearchAgain()"); //define this function :/
        a11.innerHTML = "Load more properies <i class=\"lnr lnr-sync\"></i>"
        dv11.appendChild(a11);
    }
    g_start += g_showNums;
}

function SearchAgain(){
    DoSearch(g_condition,g_start,g_showNums,ShowInfo,g_houseCondition,g_searchContent);
}

function PropertySearch(){
//    var main_content = document.getElementById("property_content");
//    main_content.innerHTML = "";
    Reset();
    GetParameter();
    g_start = 0;
    g_showNums = 20;
    DoSearch(g_condition,g_start,g_showNums,ShowInfo,g_houseCondition,g_searchContent);
}

function GetParameter(){
    var locationtype = property_list_location;  //rent
    var renttype = $('input[name="rent-type"]:checked').val(); //rent
    var housetype = $('input[name="house-type"]:checked').val(); //house
    var pricetype = property_list_price_range; //rent
    var roomNum = $("#property_list_number_room")[0].selectedIndex + 1; //house
    var sizetype = property_list_size; //house
    g_condition = "";
    g_houseCondition = "";
    if(locationtype != -1){
        g_condition += "province = " + locationtype;
    }
    if(renttype != 3){
        if(g_condition == ""){
            g_condition += "rentType = " + renttype;
        }
        else{
            g_condition += " and " + "rentType = " + renttype;
        }
    }
    if(pricetype != ""){
        if(g_condition == ""){
            g_condition += pricetype;
        }
        else{
            g_condition += " and " + pricetype;
        }
    }

    if(housetype != 5){
        g_houseCondition += "houseType = " + housetype;
    }
    if(roomNum != 11){
        if(g_houseCondition == ""){
            g_houseCondition += "roomNum = " + roomNum;
        }
        else{
            g_houseCondition += " and " + "roomNum = " + roomNum;
        }
    }
    if(sizetype != ""){
        if(g_houseCondition == ""){
            g_houseCondition += sizetype;
        }
        else{
            g_houseCondition += " and " + sizetype;
        }
    }

    var search_content = $('#property_search_content').val();
    g_searchContent = search_content;
}

