//编译时采用严格模式
'use strict';

var g_data = [];

function listFor(f) {
  var dataList = [];
  f(dataList)
  return dataList
}

function RentInfo({data}) {
  var house = data.house;
  var btnclass = "btn btn-danger";
  var id = data.id;
  if(data.rentType == 1) {
    btnclass = "btn btn-warning";
  }
  else if(data.rentType == 2){
    btnclass = "btn btn-info";
  }
  return (
    <div class="Building-University">
      <div class="Building-content">
          <div class="Building">
              <img src={"data:image/png;base64," + house.houseimg1} alt=""/>
          </div>
          <div class="right-area">
              <h3>{data.content}
                  <a href="#" onClick={()=>{ShowDetail({id})}}>Detail...<i class="lnr lnr-arrow-right"></i></a>
              </h3>
              <div class="div-buttons">
                  <button type = "button" class = {btnclass}>{LIST_TYPE_RENT[data.rentType]}</button>
                  <button type = "button" class = "btn btn-primary">{data.numPeople + " people"}</button>
                  <button type = "button" class = "btn btn-success">{LIST_PRICE[data.preferredPrice]}</button>
                  <h5 class = "house_info_h5">{data.createTime}</h5>
                  <h3 class = "house_info_h3">{data.location}</h3>
              </div>
          </div>
      </div>
    </div>    
  )
}

function Gallery({}) {
  let btnmore = (<div></div>);
  if (g_showNums <= g_data.length) {
    btnmore = (
      <div class = "Load-more" id="preperty_loadmore">
        <a href="#" onClick={()=>{SearchAgain()}}>Load more properies <i class="lnr lnr-sync"></i></a>
      </div>
    )
  } 
  
  g_start += g_showNums;
  return (
        <div>
            {
                listFor((list) => {
                    for (let i = 0; i < g_data.length; i++) {
                        var itemdata = g_data[i];
                          list.push(<RentInfo data={itemdata}/>);
                    }
                })
            }
            { btnmore }
        </div>
      )
}

function ShowInfoReact(){
  const domContainer = document.getElementById('property_content');
  ReactDOM.render(React.createElement(Gallery), domContainer);
}