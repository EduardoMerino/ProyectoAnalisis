/* Initialize Firebase */
// Edit this to connect to the right Firebase
  var config = {
    apiKey: "AIzaSyCrsmS_BIUNR64gGpgGBqcjnyzGk5gy4rM",
    authDomain: "testeatgo.firebaseapp.com",
    databaseURL: "https://testeatgo.firebaseio.com",
    projectId: "testeatgo",
    storageBucket: "testeatgo.appspot.com",
    messagingSenderId: "285087391808"
  };
  firebase.initializeApp(config);
  const database = firebase.database();
/* END Initialize Firebase */

var user;
var RestaurantId;

//ADD order
function addOrder(orderID, clientName){
  $("#ordersList").prepend("" +
    "<div class='col-lg-12 col-md-12 col-xs-12 Order'>"+
    "<div class='row'>"+
      "<div class='col-lg-6 col-md-6 col-xs-6'>"+
        "<h4 class='customerName'> To: Client</h4>"+
        "<ul class='orderItemList' id='"+"itemList"+orderID+"'>"+
        "</ul>"+
      "</div>"+
      "<div class='col-lg-3 col-md-3 col-xs-3' style='padding: 5px'>"+
        "<h4 class='customerName'> Status</h4>"+
        "<div class='btn-group-vertical' role='group' aria-label='...'>"+
          "<button type='button' class='btn btn-success preparingOrder' id='"+orderID+"'>COOKING</button>"+
          "<button type='button' class='btn btn-warning preparingOrder' id='"+orderID+">ON ITS WAY</button>"+
          "<button type='button' class='btn btn-danger preparingOrder' id='"+orderID+"'>DELIVERED</button>"+
        "</div>"+
      "</div>"+
      "<div class='col-lg-3 col-md-3 col-xs-3' style='padding: 5px; word-wrap: break-word;'>"+
        "<h4 class='customerName'>Assign Delivery Person</h4>"+
        "<select style='width: 100%; position: center; padding: 10px' class='DeliverySelect' id="+"select"+orderID+">"+
          "</select>"+
          "<h4>Deliver to: "+clientName+"<h4>"+
          "</div>"+
        "</div>"+
      "</div>");
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

//function displayOrders(){
  dbOrdersList = database.ref("Restaurant/"+RestaurantId+"/Order").orderByKey;
  dbOrdersList.on("child_added", function(snapshot){
    var orderID = "";
    var clientId = "";
    var clientName = "";
    snapshot.forEach(function(childSnapshot){
      orderID = childSnapshot.child("restaurantName").val();
      clientId = childSnapshot.child("client").val();
      var ref = firebase.database().ref("users/"+clientId).orderByKey;
      ref.once("value").then(function(snap) {
        clientName = snap.child("name").val();
      });
      addOrder(orderID, clientName);
      var raf = firebase.database().ref("Restaurant/"+RestaurantId+"/Order/"+orderID+"platillos").orderByKey
      raf.once("value").then(function(shot) {
        shot.forEach(function(childshot){
          $("#select"+orderID).append("<li>"+shot.child("name").val+": $" + shot.child("precio").val +"</li>");
        });
      });
        $("#select"+orderID).append("<li>TOTAL : $"+childSnapshot.child("total").val()+"</li>");
    });
  });
//}

$("document").ready(function(){
  //the session storage must have a vendedot object with a restaurant atribute
  user = JSON.parse(sessionStorage.getItem("user"));
  RestaurantId = user.id;
});
