/* Initialize Firebase */
// Edit this to connect to the right Firebase
var config = {
        apiKey: "AIzaSyA3nEFB_6WqKuhp_oQ406Tt1pc7i8uIHOc",
        authDomain: "eatgo-aba93.firebaseapp.com",
        databaseURL: "https://eatgo-aba93.firebaseio.com",
        projectId: "eatgo-aba93",
        storageBucket: "eatgo-aba93.appspot.com",
        messagingSenderId: "191016095386"
      };
      firebase.initializeApp(config);
initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
    }
    /*else {
            // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
    }*/
  }, function(error) {
          console.log(error);
        });
};
const database = firebase.database();
/* END Initialize Firebase */

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
        "<select style='width: 100%; position: center; padding: 10px' class='DeliverySelect' id='+'select'+orderID+'>"+
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

function displayOrders(){
  dbOrdersList = database.ref("Restaurant/"+resID).orderByKey;
  var orderID = "";
  var clientName = "";
}

$("document").ready(function(){

});
