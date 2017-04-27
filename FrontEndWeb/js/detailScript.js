var id;
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



var cart = 0;
var total = 0;
var plat = [];

function addToCart(itemId){
  var myid = "";
  myid = itemId.replace("dish","");
  console.log("myid : " + myid);
  var myplat = new Platillo();
  var dbRestaurantList = database.ref("Restaurant/"+id+"/menu/"+myid).orderByKey();
  dbRestaurantList.once("value").then(function(snapshot){
    myplat.id = myid;
    myplat.nombre = snapshot.child("name").val();
    myplat.precio = parseFloat(snapshot.child("price").val());
    total += myplat.precio;
  });
  cart++;
  if(cart > 0){
    document.getElementById("btnBuy").innerText = "Buy " + cart + " items";
    $("#btnBuy").show();
  }
  plat.push(myplat);
  console.log(plat);

}

function orderBtn(){
  var pedido = new Pedido();
  pedido.platillos = plat;
  pedido.total = total;
  firebase.auth().onAuthStateChanged(function(user)
  {
    pedido.client=user.uid;
  });
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  pedido.date = datetime;
  pedido.restaurante = id;
  if (typeof Storage !== "undefined") {
    // window.localStorage is available!
     sessionStorage.setItem("pedido", JSON.stringify(pedido));
  } else {
    // no native support for HTML5 storage :(
    // maybe try dojox.storage or a third-party solution
  }
}

function addDishes(dishId, dishName, image, price, dishDescription){
  $("#dishListElement").append("" +
    "<div class='col-sm-3 col-xs-6' style='word-wrap: break-word;'>"+
        "<a class='thumbnail' id='"+"dish"+dishId+"' href='#btnBuy' onclick='addToCart(this.id)'>"+
            "<img class='img-responsive portfolio-item' src='"+image+"' alt='"+dishName+"'>"+
            "<h3>"+dishName+"</h3>"+
            "<h4>$"+price+"</h4>"+
            "<h6>"+dishDescription+"</h6>"+
        "</a></div>");
}

//Go throug restaurants and display them
function displayDishes(){
  var dbRestaurantList = database.ref("Restaurant/"+id+"/menu").orderByKey();
  var dishId;
  var dishName;
  var image;
  var price;
  var dishDescription;
  dbRestaurantList.once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      dishId = childSnapshot.key;
      dishDescription = childSnapshot.child("description").val();
      dishName = childSnapshot.child("name").val();
      image = childSnapshot.child("image").val();
      price = childSnapshot.child("price").val();

      addDishes(dishId, dishName, image, price, dishDescription);
    });
  });
}

//cosnstruct page
function cosnstructPage(){
  var dbRestaurant = database.ref("Restaurant/"+id);
  dbRestaurant.once("value").then(function(snapshot){
    $("#restaurantName").text(""+snapshot.child("nameOfRestaurant").val());
    document.getElementById("restImage").src = ""+snapshot.child("image").val();
    $("#foodType").text(""+snapshot.child("typeFood").val());
    $("#schedule").text("Schedule: "+snapshot.child("schedule").val());
    $("#address").text("address: "+snapshot.child("address").val());
    $("#delivery").text("Delivery Service: "+snapshot.child("delivery").val());
    $("#phone").text("Phone: "+snapshot.child("phone").val());
  });
}

$(document).ready(function(){
  $("#btnBuy").hide();
  var url = document.URL.indexOf("?");
  id = document.URL.substr(url, document.URL.length);
  id = id.replace("?","");
  displayDishes();
  cosnstructPage();
  console.log(id);

});
