var config = {
  apiKey: "AIzaSyD0tAG0wpQNi-FEhwIR62hJT27K7rJ_AoE",
  authDomain: "whatahack-dd596.firebaseapp.com",
  databaseURL: "https://whatahack-dd596.firebaseio.com",
  projectId: "whatahack-dd596",
  storageBucket: "whatahack-dd596.appspot.com",
  messagingSenderId: "287574696148"
};

var provider = new firebase.auth.GoogleAuthProvider();

let ConvoId;


const init = () => {
  const pages = ['home', 'login', 'register', 'profile', 'chat']
  for (const page of pages) {
    document.querySelector('.' + page).style.display = 'none'
  }

  router = new Router(pages);

  firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
      //user is logged in
      const id = u.uid;
      refUsers.child('/' + id).once('value').then(function (snapshot) {
        const data = snapshot.val();
        user = new User(data.fName,data.lName,data.age,data.interests);
      });

      router.goTo('chat');
    } else {
      // User is signed out.
      router.goTo('home');
    }
  });

};
firebase.initializeApp(config);

const database = firebase.database();
const refConversations = firebase.database().ref('conversations/');
const refUsers = firebase.database().ref('users/');
const refQueue = firebase.database().ref('queue/');
const refConversation = firebase.database().ref('conversations/');
let user;

const Messages = [];
// Luister naar nieuwe berichten voeg toe aan berichten indien er nieuwe zijn
const getMessages = () => {
  refConversations.once('value').then(function (snapshot) {
    for (const key in snapshot.val()) {
      Messages.push(key);
    }
  })
};

function sendMessage() {
    let text = document.getElementById('msg_text').value;
    let sendby = firebase.auth().currentUser.uid;
    let time = new Date().getTime();
    let message = new Message(sendby,text,time);
    firebase.database().ref('conversations/'+ ConvoId +'/messages').push(message);
}

function findUser() {
  return refQueue.limitToFirst(1);
}

//function

const register = () => {
  let email = document.getElementById("register_inp_username").value
  let password = document.getElementById("register_inp_password").value
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (authData) {
      authData.user.sendEmailVerification().then(function () {
        const id = firebase.auth().currentUser.uid;

        let user = {
          fname: 'tempN',
          lname: 'temL',
          age: 21,
          interests: ['sport', 'school', 'lol']
        }

        refUsers.child(id).set(user,
          err => { if (err) warn('Something went wrong loggin in.'); else warn('Successfully created an account.'); });
      })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          warn("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
          warn("Error happened while signing up: " + errorCode + " " + errorMessage + " ")
        });
    });
};

const login = () => {
  let email = document.getElementById("login_inp_username").value
  let password = document.getElementById("login_inp_password").value
  // if (firebase.auth().currentUser) {
  //   warn("You are already logged in!")
  // }
  // else {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
  })
    .catch(function (error) {
      warn("error logging in")
    })
  // };

  //logout
  // firebase.auth().signOut().then(function () {
  //   warn("user logged out")
  // }).catch(function (error) {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       warn("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User is still logged in")
  //       app.dialog.alert("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User is still logged in")
  //     } else {
  //       warn("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User has Logged out")
  //       app.dialog.alert("Error code:" + errorCode + " " + errorMessage + " An error happened while logging out, User has Logged out")
  //     }
  //   });
  // });



};

const GoogleAuth = () => {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;

    var userObj = result.user;
    warn("logged in with google");
    const id = firebase.auth().currentUser.uid;

      let user = {
          fname: userObj.displayName,
          lname: 'temL',
          age: 21,
          interests: ['sport', 'school', 'lol']
      };
      refUsers.child(id).set(user);
  }).catch(function (error) {
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
};

const warn = (message) => {
  console.log(message)
};

const getPeopleWhoWantToChat = () =>{
    refQueue.limitToFirst(1).once('value').then(function (snapshot) {
        let user2 = snapshot.val()[Object.keys(snapshot.val())];
        if(snapshot.val() === null){
            addToQueue();
        }
        else{
            let conversation = new Conversation(firebase.auth().currentUser.uid,user2,null);
            ConvoId = refConversation.push().key;
            refConversation.child(ConvoId).set(conversation);
            refQueue.child(user2).Remove();
        }
    });
};

const addToQueue = () => {
    refQueue.push(firebase.auth().currentUser.uid);
};



const makeConversation = () =>{
    getPeopleWhoWantToChat();
};