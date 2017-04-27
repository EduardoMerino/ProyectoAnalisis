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

var pedido;
var total = 0;

function postOrder(){
  //hacer post del pedido
  //habrir pag de fin
  //console.log("ok");
  var k = database.ref("Restaurant/"+pedido.restaurante+"Order").push();
  database.ref("Restaurant/"+pedido.restaurante+"/Order/"+k.key).set(pedido);
  location.replace("thankYou.html");
}

function cancelOrder(){
  //console.log("cancel");
  sessionStorage.removeItem("pedido");
  window.location = "home.html";
}

/* Append Restaurant */
//We need to fill dose variables with data from firebase.
//We need to call this function inside a recursion to
//load all restaurants.
function addItems(itemName, itemPrice){
  $("#table").append("" +
  "<tr>"+
      "<td>"+itemName+"</td>"+
      "<td>"+itemPrice+"</td>"+
  "</tr>");
}

function addItemTable(){
  for(var i = 0; i<pedido.platillos.length; i++){
    addItems(pedido.platillos[i].nombre, pedido.platillos[i].precio);
  }
  $("#Total").text("$" + pedido.total);
}


$(document).ready(function(){
  pedido=JSON.parse(sessionStorage.getItem("pedido"));
  console.log(pedido);
  addItemTable();
});
