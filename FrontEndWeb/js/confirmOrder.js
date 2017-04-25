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
