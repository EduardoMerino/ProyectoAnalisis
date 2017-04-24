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

/* Get Geolocation
 * Only works on HTTPS
 */

var position;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function positionSuccess(pos) {
    position = pos;
    console.log("POSITION: " + position.coords.latitude + ", " + position.coords.longitude);
}

function positionError(err) {
    console.log("POSITION: ERROR");
    position = null;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError, options);
    } else {
        position = null;
    }
}
/* END Get Geolocation */

/*Go through restaurant details*/
function addName(restaurantName) {
    $("#RestaurantNameElement").append("" +
        "<div class='col-lg-12'>" + restaurantName + "</div>");
}

function addImage(image) {
    $("#ImageElement").append("" +
        "<div class='col-md-8'> <img src='" + image + "' /></div>");
}

function addFoodType(foodtype) {
    $("#FoodtypeElement").append("" +
        "<div class='col-md-4'>" + foodtype + "</div>");
}

function addSchedule(schedule) {
    $("#ScheduleElement").append("" +
        "<div class='col-md-4'>" + schedule + "</div>");
}

function addDeliveryService(deliveryService) {
    $("#DeliveryServiceElement").append("" +
        "<div class='col-md-4'>" + deliveryService + "</div>");
}

function addPhone(phone) {
    $("#PhoneElement").append("" +
        "<div class='col-md-4'>" + phone + "</div>");
}

//Go through restaurant details and display them
function displayDetails() {
    var dbDetailsList = database.ref("Restaurant").orderByKey();
    var restaurantName = "";
    var foodtype = "";
    var image = "";
    var schedule = "";
    var deliveryService = "";
    var phone = "";
    dbDishList.once("value")
        .then(function(snapshot) {
            snapshot.once(function(childSnapshot) {
                restaurantName = childSnapshot.child("restaurantName").val();
                foodtype = childSnapshot.child("foodtype").val();
                image = childSnapshot.child("image").val();
                schedule = childSnapshot.child("schedule").val();
                deliveryService = childSnapshot.child("deliveryService").val();
                phone = childSnapshot.child("phone").val();

                addName(restaurantName);
                addImage(image);
                addFoodType(foodtype);
                addSchedule(schedule);
                addDeliveryService(deliveryService);
                addPhone(phone);
            });
        });
}


/* Append Restaurant */
//We need to fill dose variables with data from firebase.
//We need to call this function inside a recursion to
//load all restaurants.
function addDish(dishName, description, image, price, pageLink) {
    $("#DishListElement").append("" +
        "<div class='col-lg-3 col-md-4 col-xs-6 thumb'><a class='thumbnail' href='" +
        pageLink + "'>" + "<img class='img-responsive' src='" + image + "' alt='" +
        dishName + "'> " + "<h3>" + dishName + "</h3><h4>" + description +
        "</h4><h4> " + price + "</a></div>");
}

//Go throug restaurants and display them
function displayDishes() {
    var dbDishList = database.ref("Dish").orderByKey();
    var dishName = "";
    var description = "";
    var image = "";
    var price = "";
    var pageLink = "";
    dbDishList.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                dishName = childSnapshot.child("Dish").child("dishName").val();
                description = childSnapshot.child("Dish").child("description").val();
                image = childSnapshot.child("Dish").child("image").val();
                price = childSnapshot.child("Dish").child("price").val();
                pageLink = childSnapshot.child("Dish").child("pageLink").val();

                addRestaurant(dishName, description, image, price, pageLink);
            });
        });
}

$(document).ready(function() {
    displayRestaurants();
    getLocation();
});