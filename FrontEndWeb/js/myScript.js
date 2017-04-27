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

/* Get Geolocation
 * Only works on HTTPS
 */

var myPosition = {
  latitude : "",
  longitude: ""
}

var success = false;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function positionSuccess(pos){
  myPosition.latitude = "" + pos.coords.latitude;
  myPosition.longitude = "" + pos.coords.longitude;
  success = true;
  localStorage.setItem("currentLocation",JSON.stringify(myPosition));
  console.log("POSITION: " + pos.coords.latitude + ", " + pos.coords.longitude);
}

function positionError(err){
  console.log("POSITION: ERROR");
  position = null;
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError, options);
    } else {
      console.log("NO geolocation");
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
      restaurantName = childSnapshot.child("nameOfRestaurant").val();
      foodType = childSnapshot.child("typeFood").val();
      image = childSnapshot.child("image").val();
      pageLink = childSnapshot.child("pageLink").val();

      addRestaurant(restaurantName, foodType, image, childSnapshot.key);
    });
  });
}

$(document).ready(function(){
  displayRestaurants();
  localStorage.removeItem("currentLocation");
  var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
    getLocation();
    resolve("Stuff worked!");
  });
  promise.then(function(result){
    //localStorage.setItem("currentLocation", JSON.stringify(myPosition));
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      if(localStorage.getItem("currentLocation") === null){
        console.log("NO CURR POS");
        console.log(result);
        console.log("LOCAL STORAGE: " + localStorage.getItem("currentLocation"));
      }
    } else {
      // Sorry! No Web Storage support..
      console.log("NO LOCAL STORAGE");
      getLocation();
    }
  }, function(error){
    console.log(error());
  });
});
