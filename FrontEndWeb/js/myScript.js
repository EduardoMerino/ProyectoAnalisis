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
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError, options);
    } else {
      position = null;
    }
}

//Call function whith this
getLocation();
/* END Get Geolocation */

/* Append Restaurant */
//We need to fill dose variables with data from firebase.
//We need to call this function inside a recursion to
//load all restaurants.
$(document).ready(function(){
  $("#RestaurantList").append.('' +
    '<div class="col-lg-3 col-md-4 col-xs-6 thumb"><a class="thumbnail" href="' +
    pageLink + '">' + '<img class="img-responsive" src="' + image + '" alt="">' +
    '<h3>' + restaurantName + '</h3><h4>' + foodType + '</h4></a></div>'
  +'');
});
