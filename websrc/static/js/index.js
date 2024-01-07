

function showIndexContent(data){
    var main_content = document.getElementById("index_content");
    g_index_data = data;
    ShowIndexContentReact();
    $('.properties-slider').owlCarousel({
        loop:true,
        margin:30,
        nav:false,
        items:3, 
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1199:{
                items:3
            },
            1920:{
                item:3,
            }
        }

    });
    return;
    /*
    var h2 = document.createElement("h2");
    h2.innerHTML = "Latest Houses";
    main_content.appendChild(h2);
    var dv = document.createElement("div");
    dv.setAttribute("class","properties-slider");
    main_content.append(dv);
    for(var i = 0;i < data.length; i++){
        var dt = data[i];
        var house = dt.house;
        if(house == null) continue;
        var dv1 = document.createElement("div");
        dv1.setAttribute("class", "item");
        dv.appendChild(dv1);
        var dv2 = document.createElement("div");
        dv2.setAttribute("class", "ready_flat");
        dv1.appendChild(dv2);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + house.houseimg1;
        dv2.appendChild(img);
        var dv3 = document.createElement("div");
        dv3.setAttribute("class", "content-area");
        dv2.appendChild(dv3);

        var h4 = document.createElement("h4");
        h4.setAttribute("class", "content-area");
        h4.innerHTML = house.housename;
        dv3.appendChild(h4);

        var a1 = document.createElement("a");
        a1.setAttribute("class", "btn-flat");
        a1.innerHTML = LIST_TYPE_RENT[dt.rentType];
        dv3.appendChild(a1);
        var a2 = document.createElement("a");
        a2.setAttribute("class", "btn-flat");
        a2.innerHTML = house.housesize + " Sq Ft";
        dv3.appendChild(a2);
        var a3 = document.createElement("a");
        a3.setAttribute("class", "btn-flat");
        a3.innerHTML = LIST_HOUSE_TYPE[house.housetype];
        dv3.appendChild(a3);
        var ul = document.createElement("ul");
        ul.setAttribute("class", "info");
        dv3.appendChild(ul);

        var li1 = document.createElement("li");
        li1.innerHTML = "<i class=\"lnr lnr-tag\"></i> Location: " +  LIST_PROVINCE[dt.province];
        ul.appendChild(li1);
        var li2 = document.createElement("li");
        li2.innerHTML = "<i class=\"lnr lnr-tag\"></i> Price: " +  house.houseprice;
        ul.appendChild(li2);
        var li3 = document.createElement("li");
        li3.innerHTML = "<i class=\"lnr lnr-tag\"></i> Room: " +  LIST_ROOM[house.houserooms];
        ul.appendChild(li3);
        var li4 = document.createElement("li");
        li4.innerHTML = "<i class=\"lnr lnr-tag\"></i> Decoration: " +  LIST_DECORATION[house.housedecoration];
        ul.appendChild(li4);

        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "contact");
        a.innerHTML = "Contact Now<i class=\"lnr lnr-arrow-right\"></i>";
        dv3.appendChild(a);
        var h3 = document.createElement("h3");
        h3.innerHTML = "$" + house.houseprice;
        dv3.appendChild(h3);
    }
    //Properties Slider
    */
}
    
function indexDoSearch(){
    var url = "property_list.html";
    url = changeURLArg(url, 'type', $("#index_type_rent")[0].selectedIndex);
    url = changeURLArg(url, 'location', $("#index_location")[0].selectedIndex);
    url = changeURLArg(url, 'price', $("#index_price")[0].selectedIndex);
    //essionStorage.setItem('search_type', type.selectedIndex);
    //sessionStorage.setItem('search_location', location.selectIndex);
    //sessionStorage.setItem('search_price', price.selectIndex);
    window.location.replace(url);
}
