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
      if (typeof Storage !== "undefined") {
        // window.localStorage is available!
        var usuario=new Usuario();
        usuario.id=user.uid;
        usuario.name=user.displayName;
        usuario.email=user.email;
        localStorage.setItem("user", JSON.stringify(usuario));
      } else {
        // no native support for HTML5 storage :(
        // maybe try dojox.storage or a third-party solution
      }
      if(document.getElementById('Cliente').checked)
      {
        firebase.database().ref('users/' + user.uid).set({
          username: user.displayName,
          typeOfUser: "Cliente"
        });
        $(location).attr('href', 'home.html')
      }
      else if(document.getElementById('Restaurante').checked)
      {
        if(
          document.getElementById('inputRestaurant').value!==""&&
          document.getElementById('inputComida').value!==""&&
          document.getElementById('inputImagen').value!==""
          )
        {
          firebase.database().ref('users/' + user.uid).set({
            username: user.displayName,
            typeOfUser: "Restaurante"
          });
          firebase.database().ref('Restaurant/' + user.uid).set({
            nameOfRestaurant: document.getElementById('inputRestaurant').value,
            typeFood: document.getElementById('inputComida').value,
            image: document.getElementById('inputImagen').value,
          });
          $(location).attr('href', 'vendorTerminal.html')
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