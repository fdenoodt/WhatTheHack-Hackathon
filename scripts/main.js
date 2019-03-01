var database = firebase.database();

const refMessage = firebase.database().ref('messages/');
const refUsers = firebase.database().ref('user/');
const refQueue = firebase.database().ref('Queue/');

var Messages = [];
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

const init = () => {
  const pages = ['home', 'login', 'register', 'profile']
  for (const page of pages) {
    document.querySelector('.' + page).style.display = 'none'
  }
  /**firebase.database().ref('user/' + 'User 1').set({
        username:'Hello world'
    })**/
  router = new Router(pages)

}

const register = () => {

}

const login = () => {

}