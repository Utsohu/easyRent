'use strict';

var g_index_data = [];
function listFor(f) {
    var dataList = [];
    f(dataList)
    return dataList
  }
  
function IndexShowContent({data}){
    var id = data.id;
    return (
        <div class="item">
            <div class="ready_flat">
                <img src={"data:image/png;base64," + data.house.houseimg1}></img>
                <div class="content-area">
                    <h4 class="content-area">{data.house.housename}</h4>
                    <a class="btn-flat">{LIST_TYPE_RENT[data.rentType]}</a>
                    <a class="btn-flat">{data.house.housesize + " Sq Ft"}</a>
                    <a class="btn-flat">{LIST_HOUSE_TYPE[data.house.housetype]}</a>
                    <ul class="info">
                        <li><i class="lnr lnr-tag"></i>{ "Location: " +  LIST_PROVINCE[data.province]}</li>
                        <li><i class="lnr lnr-tag"></i>{ "Price: " +  data.house.houseprice}</li>
                        <li><i class="lnr lnr-tag"></i>{ "Room: " +  LIST_ROOM[data.house.houserooms]}</li>
                        <li><i class="lnr lnr-tag"></i>{ "Decoration: " +  LIST_DECORATION[data.house.housedecoration]}</li>
                    </ul>
                    <a href="#" class="contact" onClick={()=>{ShowDetail({id})}}>{"Contact Now"}<i class="lnr lnr-arrow-right"></i></a>
                    <h3>{"$" + data.house.houseprice}</h3>
                </div>
            </div>
        </div>
    )
}

function IndexGallery({}) {
    return (
        <div>
            <h2>Latest Houses</h2>
            <div class="properties-slider">
                {
                    listFor((list) => {
                        for (let i = 0; i < g_index_data.length; i++) {
                            var itemdata = g_index_data[i];
                            if(itemdata.house != null){
                                list.push(<IndexShowContent data={itemdata}/>);
                            }
                        }
                    })
                }
            </div>
        </div>
        )
  }

function ShowIndexContentReact(){
    const domContainer = document.getElementById('index_content');
    ReactDOM.render(React.createElement(IndexGallery), domContainer);
 }
