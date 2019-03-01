"use strict"

var config = {
  apiKey: "AIzaSyD0tAG0wpQNi-FEhwIR62hJT27K7rJ_AoE",
  authDomain: "whatahack-dd596.firebaseapp.com",
  databaseURL: "https://whatahack-dd596.firebaseio.com",
  projectId: "whatahack-dd596",
  storageBucket: "whatahack-dd596.appspot.com",
  messagingSenderId: "287574696148"
};
firebase.initializeApp(config);
console.log("firebase success")

function login() {
  var email = document.getElementById("emailid").value
  var password = document.getElementById("passwordid").value
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (authData) {
      authData.user.sendEmailVerification().then(function () {
        console.log("verification sent")
        console.log('Thank you!<br> You have sucessfully signed up, verification e-mail sent.');
      })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
          console.log("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
        });
    });
}