//ADD order
function addOrder(orderID){
  $("#RestaurantList").prepend('' +
  '<div class="col-lg-12 col-md-12 col-xs-12 Order" id="'++'"><div class="row">'+
      '<div class="col-lg-6 col-md-6 col-xs-6"><h4 class="customerName"> To: Client</h4>'
        '<ul class="orderItemList" id="'+'orderItem'+orderID+'"></ul>'+
      '</div><div class="col-lg-3 col-md-3 col-xs-3" style="padding: 5px"><h4 class="customerName"> Status</h4>'+
        '<div class="btn-group-vertical" role="group" aria-label="...">'+
          '<button type="button" class="btn btn-success" onClick="cooking_click(this.id)" id="'+'btnCooking'+orderID+'">COOKING</button>'+
          '<button type="button" class="btn btn-warning" onClick="onitsway_click(this.id)" id="'+'btnOnItsWay'+orderID+'">ON ITS WAY</button>'+
          '<button type="button" class="btn btn-danger" onClick="delivered_click(this.id)" id="'+'btnDelivered'+orderID+'">DELIVERED</button>'+
        '</div></div>'+
      '<div class="col-lg-3 col-md-3 col-xs-3" style="padding: 5px; word-wrap: break-word;"">'+
        '<h4 class="customerName">Assign Delivery Person</h4>'+
        '<select style="width: 100%; position: center; padding: 10px" id="'+'selectDP'+orderID+'">'+
        '</select><h4>Deliver to: '+ database.ref(orderID).child("dir").val()+'<h4></div></div></div>');
}

function cooking_click(btnid){
  var id = "";
  id = btnid.replace("btnCooking","");
  //connect to firebase to change status to Cooking
  //..

}

function onitsway_click(btnid){
  var id = "";
  id = btnid.replace("btnOnItsWay","");
  //connect to firebase to change status to OnItsWay
  //..

}

function delivered_click(btnid){
  var id = "";
  id = btnid.replace("btnOnItsWay","");
  //connect to firebase to change status to Delivered
  //..

}
