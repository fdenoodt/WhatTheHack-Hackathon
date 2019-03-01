var config = {
  apiKey: "AIzaSyD0tAG0wpQNi-FEhwIR62hJT27K7rJ_AoE",
  authDomain: "whatahack-dd596.firebaseapp.com",
  databaseURL: "https://whatahack-dd596.firebaseio.com",
  projectId: "whatahack-dd596",
  storageBucket: "whatahack-dd596.appspot.com",
  messagingSenderId: "287574696148"
};

var provider = new firebase.auth.GoogleAuthProvider();
console.log("firebase success")



const init = () => {
    const pages = ['home', 'login', 'register', 'profile']
    for (const page of pages) {
        document.querySelector('.' + page).style.display = 'none'
    }
    /**firebase.database().ref('user/' + 'User 1').set({
        username:'Hello world'
    })**/
    router = new Router(pages)

};
firebase.initializeApp(config);

const database = firebase.database();

const refMessage = firebase.database().ref('messages/');
const refUsers = firebase.database().ref('user/');
const refQueue = firebase.database().ref('Queue/');

const Messages = [];
// Luister naar nieuwe berichten voeg toe aan berichten indien er nieuwe zijn
const getMessages = () => {
    refMessage.once('value').then(function (snapshot) {
        for (const key in snapshot.val()){
            Messages.push(key);
        }
    })
};

function sendMessage(sendUser,receiveUser,chat,message){
    firebase.database().ref('messages/' + chat).set({
        usersend:sendUser,
        userreceive:receiveUser,
        Message:message
    })
}

function findUser(){
   return refQueue.limitToFirst(1);
}

//function

const register = () => {
  let email = document.getElementById("register_inp_username").value
  let password = document.getElementById("register_inp_password").value
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (authData) {
      authData.user.sendEmailVerification().then(function () {
        warn("verification sent")
        warn('Thank you!<br> You have sucessfully signed up, verification e-mail sent.');
      })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          warn("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
          warn("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
        });
    });
}

const login = () => {
  let email = document.getElementById("login_inp_username").value
  let password = document.getElementById("login_inp_password").value
  if (firebase.auth().currentUser) {
    warn("You are already logged in!")
  }
  else {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      warn("logged in" + email + " " + password)
    })
      .catch(function (error) {
        warn("error logging in")
      })
  };

  //logout
  firebase.auth().signOut().then(function () {
    warn("user logged out")
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        warn("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User is still logged in")
        app.dialog.alert("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User is still logged in")
      } else {
        warn("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User has Logged out")
        app.dialog.alert("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User has Logged out")
      }
    });
  });



}

const GoogleAuth = () => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    
    var user = result.user;
    warn("logged in with google")
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    warn("error logging in with google" + errorCode + " " + errorMessage)
  });

  firebase.auth().signOut().then(function () {
    warn("user logged out")
  })
//}

  router = new Router(pages)
}

const warn = (message) => {
  console.log(message)
}
