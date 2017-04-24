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

//ADD order
function addOrder(orderID){
  $("#oldOrdersList").append("" +
  "<div class='col-lg-12 col-md-12 col-xs-12 Order'>"+
    "<div class='row'>"+
      "<div class='col-lg-7 col-md-7 col-xs-7'>"+
        "<h4 class='customerName'> To: "+clientName+"</h4>"+
        "<ul class='orderItemList' id='oldOrderItems"+orderID+"'>"+
        "</ul>"+
      "</div>"+
      "<div class='col-lg-5 col-md-5 col-xs-5'>"+
        "<h4>Delivered by: </h4>"+
        "<h5>"+dpName+"</h5>"+
        "<h4>DATE:</h4>"+
        "<h5>"+orderDate+"</h4>"+
      "</div></div></div>");
}
