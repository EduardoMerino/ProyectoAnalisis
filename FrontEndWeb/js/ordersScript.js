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
