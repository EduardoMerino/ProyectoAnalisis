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
//end of firebase stuff

function Generate()
{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user)
    {
      if(document.getElementById('Cliente').checked)
      {
        firebase.database().ref('users/' + user.uid).set({
          username: user.displayName,
          typeOfUser: "Cliente"
        });
        $(location).attr('href', 'client.html')
      }
      else if(document.getElementById('Restaurante').checked)
      {
        if(document.getElementById('inputRestaurant').value!=="")
        {
          firebase.database().ref('users/' + user.uid).set({
            nameOfRestaurant: document.getElementById('inputRestaurant').value,
            typeOfUser: "Restaurante"
          });
          $(location).attr('href', 'restaurant.html')
        }
      }
    }
    else
    {
      // No user is signed in.
      console.log("no user");
    }
  });
}
function changeDisplay()
{
  if(document.getElementById('Cliente').checked)
  {
    $('.formClient').css('display', 'inline')
    $('.formRestaurant').css('display', 'none')
    $('.toRemove').css('display', 'none')
  }
  else if(document.getElementById('Restaurante').checked)
  {
    $('.formClient').css('display', 'none')
    $('.formRestaurant').css('display', 'inline')
    $('.toRemove').css('display', 'none')
  }
}
$(document).ready(function()
{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //var commentsRef = firebase.database().ref('users/' + user.uid);
      var users = firebase.database().ref("users").once("value").then(function(snapshot) {
        if(snapshot.hasChild(user.uid))
        {
          if(snapshot.child(user.uid).child("typeOfUser").val()=="Cliente")
          {
            $(location).attr('href', 'client.html');
          }
          else
          {
            $(location).attr('href', 'restaurant.html');
          }
        }
      });
    } else {
      // No user is signed in.
    }
  })
});