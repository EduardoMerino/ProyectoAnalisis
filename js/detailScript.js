var id;

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

/* Append Dish */
//We need to fill dose variables with data from firebase.
//We need to call this function inside a recursion to
//load all restaurants.
function addDish(pid, dishName, dishDescription, image) {
    $("").append("" + "<div class='col-sm-3 col-xs-6'>" +
        "<a class='thumbnail' id='" + "dish" + pid + "' href='javascript:addToCart(this.id)'>" +
        "<img class='img-responsive portfolio-item' src='" + image + "' alt='" + dishName + "'>" +
        "<h3>" + dishName + "</h3>" +
        "<h4>" + dishDescription + "</h4>" +
        "</a></div>");
}

var cart = 0;
var total = 0;
var plat = [];

function addToCart(itemId) {
    var myid = "";
    myid = itemId.replace("dish", "");
    console.log("myid : " + myid);
    var myplat = new Platillo();
    var dbRestaurantList = database.ref("Restaurant/" + id + "/menu/" + myid).orderByKey();
    dbRestaurantList.once("value").then(function(snapshot) {
        myplat.id = myid;
        myplat.setNombre(snapshot.child("name").val());
        myplat.setPrice(parseFloat(snapshot.child("price").val()));
        total += myplat.getPrice();
    });
    cart++;
    if (cart > 0) {
        document.getElementById("btnBuy").innerText = "Buy " + cart + " items";
        $("#btnBuy").show();
    }
    plat.push(myplat);
    console.log(plat);

}

function orderBtn() {
    var pedido = new Pedido();
    pedido.setPlatillos(plat);
    pedido.setTotal(total);
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    pedido.setDate(datetime);
    pedido.setRestaurante(id);
    if (typeof Storage !== "undefined") {
        // window.localStorage is available!
        sessionStorage.setItem("pedido", JSON.stringify(pedido));
    } else {
        // no native support for HTML5 storage :(
        // maybe try dojox.storage or a third-party solution
    }
}

function addDishes(dishId, dishName, image, price, dishDescription) {
    $("#dishListElement").append("" +
        "<div class='col-sm-3 col-xs-6' style='word-wrap: break-word;'>" +
        "<a class='thumbnail' id='" + "dish" + dishId + "' href='#btnBuy' onclick='addToCart(this.id)'>" +
        "<img class='img-responsive portfolio-item' src='" + image + "' alt='" + dishName + "'>" +
        "<h3>" + dishName + "</h3>" +
        "<h4>$" + price + "</h4>" +
        "<h6>" + dishDescription + "</h6>" +
        "</a></div>");
}

//Go throug restaurants and display them
function displayDishes() {
    var dbRestaurantList = database.ref("Restaurant/" + id + "/menu").orderByKey();
    var dishId;
    var dishName;
    var image;
    var price;
    var dishDescription;
    dbRestaurantList.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
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
function constructPage() {
    var dbRestaurant = database.ref("Restaurant/" + id);
    dbRestaurant.once("value").then(function(snapshot) {
        $("#restaurantName").text("" + snapshot.child("restaurantName").val());
        document.getElementById("restImage").src = "" + snapshot.child("image").val();
        $("#foodType").text("" + snapshot.child("foodType").val());
    });
}

$(document).ready(function() {
    $("#btnBuy").hide();
    var url = document.URL.indexOf("?");
    id = document.URL.substr(url, document.URL.length);
    id = id.replace("?", "");
    displayDishes();
    constructPage();
    console.log(id);
});