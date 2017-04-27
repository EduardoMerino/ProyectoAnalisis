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
      const database = firebase.database();
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
//end of firebase stuff
/* END Initialize Firebase */

var user;
var RestaurantId;

function addDish(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user)
    {
      if(
        document.getElementById('name').value!==""&&
        document.getElementById('price').value!==""&&
        document.getElementById('image').value!==""&&
        document.getElementById('description').value!==""
        )
      {
        var k = database.ref().push().key;
        database.ref("Restaurant/"+user.uid+"/menu/"+k).set
        ({
          name:document.getElementById('name').value,
          price:document.getElementById('price').value,
          image:document.getElementById('image').value,
          description:document.getElementById('description').value
        });
      }
    }
  });
}

$("document").ready(function(){
  //the session storage must have a vendedot object with a restaurant atribute
  firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            RestaurantId=user.uid;
          } else {
            // No user is signed in.
          }
        })
  
});