class ChatDisplay {
  constructor() {
    this.convsDispl = document.querySelector('.inbox_chat');
    this.msgDispl = document.querySelector('.msg_history');
  }

  update(lsConv) {
    this.convsDispl.innerHTML = ""
    const that = this;

    let id = firebase.auth().currentUser.uid;
    for (const conv of lsConv) {
      if (conv.u1 == id)
        id = conv.u2;
      refUsers.child('/' + id).once('value').then(function (snapshot) {
        const data = (snapshot.val())
        const name = data.fname + " " + data.lname;
        const convId = conv.id;

        that.convsDispl.innerHTML += `
        <div class="chat_list" onclick=chatDisplay.showMessages('${convId}')>
          <div class="chat_people">
            <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="chat_ib"> 
                <h5>${name} <span onclick="goToProfile('${id}')" class="chat_date"> <i class="material-icons" style='vertical-align: middle'>assignment_ind</i> Profile</span></h5>
              </div>
            </div>
          </div>`
      })
    }
  }


  showMessages(convId) {
    var newArray = user.lsConversations.filter(function (el) {
      return el.id == convId;
    });

    const conv = newArray[0]
    this.msgDispl.innerHTML = '';
    for (const msg of conv.lsMessages) {
      let id = firebase.auth().currentUser.uid;
      if (id == conv.from) {
        this.msgDispl.innerHTML += `
        <div class="outgoing_msg">
          <div class="sent_msg">
            <p>${msg.text}</p>
            <span class="time_date">${new Date(msg.time * 1000)}</span>
          </div>
        </div>`
      }
      else {
        this.msgDispl.innerHTML += `
          <div class="incoming_msg">
            <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
          </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>${msg.text}</p>
                  <span class="time_date">${new Date(msg.time * 1000)}</span>
                </div>
              </div>
            </div>`
      }

    }


  }
}