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

var user;
var RestaurantId;

function addDish(){
  var platillo = new platillo;
  platillo.name = document.getElementById('name').value;
  platillo.price = document.getElementById('price').value;
  platillo.image = document.getElementById('image').value;
  platillo.description = document.getElementById('description').value;

  var k = database.ref().push().key;
  database.ref("Restaurant/"+RestaurantId+"/menu/"+k).set(platillo);
}

$("document").ready(function(){
  //the session storage must have a vendedot object with a restaurant atribute
  user = JSON.parse(sessionStorage.getItem("user"));
  RestaurantId = user.id;
});
