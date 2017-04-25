//firebase stuff
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

function saveChanges()
{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user)
    {
      firebase.database().ref('Restaurant/' + user.uid).set({
        nameOfRestaurant: document.getElementById('restaurantName').value,
        typeFood: document.getElementById('foodType').value,
        schedule: document.getElementById('schedule').value,
        address: document.getElementById('address').value,
        delivery: document.getElementById('delivery').checked,
        phone: document.getElementById('phone').value,
        image: document.getElementById('image').value
      });
    }
    else
    {
      
    }
  });
}