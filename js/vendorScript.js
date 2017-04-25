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

var itemList = 0;

//ADD order
function addOrder(orderID, clientName, platillos, status) {
    $("#ordersList").prepend("" +
        "<div class='col-lg-12 col-md-12 col-xs-12 Order'>" +
        "<div class='row'>" +
        "<div class='col-lg-6 col-md-6 col-xs-6'>" +
        "<h4 class='customerName'> To: " + clientName + "</h4>" +
        "<ul class='orderItemList'" + ">" + itemList + orderID + " " + platillos +
        "</ul>" +
        "</div>" +
        "<div class='col-lg-3 col-md-3 col-xs-3' style='padding: 5px'>" +
        "<h4 class='customerName'> Status</h4>" +
        "<div class='btn-group-vertical' role='group' aria-label='...'>" +
        "<button type='button' class='btn btn-success preparingOrder' id='2' onclick='javascript:cooking_click('2')'>COOKING</button>" +
        "<button type='button' class='btn btn-warning preparingOrder' id='" + orderID + "'>ON ITS WAY</button>" +
        "<button type='button' class='btn btn-danger preparingOrder' id='" + orderID + "'>DELIVERED</button>" +
        "</div>" +
        "</div>" +
        "<div class='col-lg-3 col-md-3 col-xs-3' style='padding: 5px; word-wrap: break-word;'>" +
        "<h4 class='customerName'>Assign Delivery Person</h4>" +
        "<select style='width: 100%; position: center; padding: 10px' class='DeliverySelect' id='+'select'+orderID+'>" +
        "<option value='id2343'>Sonic</<option>" +
        "<option value='id324234232'>Flash</option>" +
        "<option value='id392920'>Dash</option></select>" +
        "<h4>Deliver to: " + clientName + "<h4>" +
        "</div>" +
        "</div>" +
        "</div>");
}

function cooking_click(btnid) {
    var id = "";
    id = btnid.replace("btnCooking", "");
    //dbOrdersList = database.ref("Restaurant/Subway/Order");
    firebase.database().ref("Restaurant/Subway/Order").set({
        status: "Cooking"
    });

}

function onitsway_click(btnid) {
    var id = "";
    id = btnid.replace("btnOnItsWay", "");
    //connect to firebase to change status to OnItsWay
    //..

}

function delivered_click(btnid) {
    var id = "";
    id = btnid.replace("btnOnItsWay", "");
    //connect to firebase to change status to Delivered
    //..

}

function displayOrders() {
    //dbOrdersList = database.ref("Restaurant/" + localStorage["Restaurante"] + "/Order");
    dbOrdersList = database.ref("Restaurant/Subway/Order");
    var orderID = "";
    var clientName = "";
    var platillos = "";
    var repartidor = "";
    var status = "";
    dbOrdersList.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            orderID = childSnapshot.child("id").val();
            clientName = childSnapshot.child("client").val();
            childSnapshot.forEach(function(grandsonSnapshot) {
                platillos = platillos + " " + grandsonSnapshot.child("nombre").val();
            });
            repartidor = childSnapshot.child("repartidor").val();
            status = childSnapshot.child("status").val();
            addOrder(orderID, clientName, platillos, status);
        });
    });
}

$(document).ready(function() {
    displayOrders();
    //restaurante = localStorage.setItem("restaurante", JSON.parse);
});