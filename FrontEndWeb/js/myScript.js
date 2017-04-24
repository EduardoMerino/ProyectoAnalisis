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

function positionSuccess(pos){
  position = pos;
  console.log("POSITION: " + position.coords.latitude + ", " + position.coords.longitude);
}

function positionError(err){
  console.log("POSITION: ERROR");
  position = null;
}

function getLocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(positionSuccess, positionError, options);
    } else {
      return null;
    }
}
/* END Get Geolocation */

/* Append Restaurant */
//We need to fill dose variables with data from firebase.
//We need to call this function inside a recursion to
//load all restaurants.
function addRestaurant(restaurantName, foodType, image, restaurantId){
  $("#RestaurantListElement").append("" +
    "<div class='col-lg-3 col-md-4 col-xs-6 thumb'><a class='thumbnail' id='"+restaurantId+"' href='"+
    "restaurantDetail.html?"+restaurantId + "'>" + "<img class='img-responsive' src='" + image + "' alt='"+
    restaurantName +"'> "+ "<h3>" + restaurantName + "</h3><h4>" + foodType
    + "</h4></a></div>");
}



//Go throug restaurants and display them
function displayRestaurants(){
  var dbRestaurantList = database.ref("Restaurant").orderByKey();
  var restaurantName = "";
  var foodType = "";
  var image = "";
  var pageLink = "";
  dbRestaurantList.once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      restaurantName = childSnapshot.child("restaurantName").val();
      foodType = childSnapshot.child("foodType").val();
      image = childSnapshot.child("image").val();
      pageLink = childSnapshot.child("pageLink").val();

      addRestaurant(restaurantName, foodType, image, childSnapshot.key);
    });
  });
}

$(document).ready(function(){
  displayRestaurants();
  $("#myForm").hide();
  try{
    if (localStorage.getItem("currentLocation") === null) {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("currentLocation", getLocation());
    }
  } catch(e){
    // Sorry! No Web Storage support..
    position = getLocation();
  }
});
