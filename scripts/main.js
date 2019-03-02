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
  const pages = ['home', 'login', 'register', 'profile', 'chat','QRcode','QRreader','make_profile','event'];
  chatDisplay = new ChatDisplay();
  for (const page of pages) {
    document.querySelector('.' + page).style.display = 'none';
  }

  //eventen ophalen
  firebase.database().ref('Events/').on('value', data => {
    data.forEach(element => {
      var key = element.val();
      document.getElementById("eventinformation").innerHTML += '<h1> ' + key.name + '</h1>';
      document.getElementById("eventinformation").innerHTML += '<p> ' + key.date + ' - ' + key.starttime + ' duration: ' + key.duration + '</p>';
      document.getElementById("eventinformation").innerHTML += '<p> ' + key.description + '</p>';
      document.getElementById("eventinformation").innerHTML += '<p> ' + key.location + '</p>';

    });

  });

  router = new Router(pages);

  firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
      //user is logged in
      const id = u.uid;
      refUsers.child('/' + id).once('value').then(function (snapshot) {
        const data = snapshot.val();
        user = new User(data.fname, data.lname, data.age, data.interests,data.experience);
        document.getElementById("profile_name").innerHTML = user.fName +' '+ user.lName ;
        document.getElementById("profile_age").innerHTML = user.age;
        document.getElementById("profile_experience").innerHTML = user.experience;
        document.getElementById("profile_interests").innerHTML = user.interests;
  
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
let user;
let chatDisplay;


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
  let sender = firebase.auth().currentUser.uid;
  let time = new Date().getTime();
  let message = new Message(text, time, sender);
  firebase.database().ref('conversations/' + ConvoId + '/messages').push(message);
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

//event maken
/* let datetime = new Date();
var Eventinfo = {
  name: "Workshop",
  date: datetime.getDate(),
  location: "Brussel"
  starttime: 13,
  duration: 2,
  description: "Extra info Here"
}; */

//event toevoegen aan database
/* const Addevent =() => {
  firebase.database().ref('Events/').push(Eventinfo);
} */

const GoogleAuth = () => {
  firebase.auth().signInWithPopup(provider).then(function (result) {

    var userObj = result.user;
    warn("logged in with google");
    const id = firebase.auth().currentUser.uid;

    //refUsers.child(id).set(user);
    if (result.additionalUserInfo.isNewUser) {
      router.goTo('make_profile')
    }
    else {
      router.goTo('chat')
    }

  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    warn("error logging in with google" + errorCode + " " + errorMessage)
  });

  firebase.auth().signOut().then(function () {
    warn("user logged out")
  })
  //}

}


const saveProfile = () => {
  var userObj = firebase.auth().currentUser;
  const id = firebase.auth().currentUser.uid;
  let user = {
    fname: userObj.displayName,
    lname: document.getElementById("register_inp_lastname").value,
    age: document.getElementById("register_inp_age").value,
    interests: [document.getElementById("register_inp_interest1").value, document.getElementById("register_inp_interest2").value, document.getElementById("register_inp_interest3").value],
    bio: document.getElementById("register_inp_bio").value,
    pfp: userObj.photoURL,
    experience: 0
  };
  refUsers.child(id).set(user);
  console.log("profile saved")
}

const warn = (message) => {
  console.log(message)
};

const getPeopleWhoWantToChat = () =>{
    refQueue.limitToFirst(1).once('value').then(function (snapshot) {
        let user2 = snapshot.val();
        if(snapshot.val() === null){
            addToQueue();
            refConversations.on('child_added', function (snapshot) {
                for(let key in snapshot.val()){
                    console.log(snapshot.val()[key]);
                    if (snapshot.val()[key] === firebase.auth().currentUser.uid){
                        ConvoId = snapshot.key;
                        break;
                    }
                }
            })
        }
        else{
            let user2Value = user2[Object.keys(user2)];
            //console.log(user2Value);
            let conversation = new Conversation(firebase.auth().currentUser.uid,user2Value,null);
            ConvoId = refConversations.push().key;
            refConversations.child(ConvoId).set(conversation);
            refQueue.equalTo(user2Value).once('value').then(function (snapshot) {
                snapshot.ref.remove();
            })
        }
    });
};

const addToQueue = () => {
  refQueue.push(firebase.auth().currentUser.uid);
};

const addFriend = () => {
    let user1UID;
    let user2UID;
    firebase.database().ref('conversations/'+ ConvoId +'/u1').once('value').then(function (snapshot) {
       if(snapshot.val())
       { user1UID = snapshot.val()}
    });
    firebase.database().ref('conversations/'+ ConvoId +'/u2').once('value').then(function (snapshot) {
        if(snapshot.val()) {
            user2UID = snapshot.val();
        }
    });
    let thisuserUID = firebase.auth().currentUser.uid;
    let friendUID;
    if(user1UID === thisuserUID){
        friendUID = user1UID;
    }
    else {
        friendUID = user2UID;
    }
};

const makeConversation = () => {
  getPeopleWhoWantToChat();
};


const goToProfile = (userId) => {
  router.goTo('profile')
  onProfileLoaded(userId)
}

const onProfileLoaded = (userId) => {
  if (userId == null)
    goTo('home')
  else {
    refUsers.child('/' + userId).once('value').then(function (snapshot) {
      const data = snapshot.val();
      document.querySelector('.profile_name').innerHTML = data.fname + ' ' + data.lname
      document.querySelector('.profile_age').innerHTML = data.age
      document.querySelector('.profile_interests').innerHTML = ''

      data.interests.forEach(inter => {
        document.querySelector('.profile_interests').innerHTML += inter + '<br>'

      });

      console.log();



    });
  }

}
