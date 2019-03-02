class ChatDisplay {
  constructor() {
    this.convsDispl = document.querySelector('.inbox_chat');
    this.msgDispl = document.querySelector('.msg_history');
    this.selectedConv = null;
  }

  update(lsConv) {
    this.convsDispl.innerHTML = ""
    const that = this;

    document.getElementById("buttonjoinchat").style.display = "none"
    document.getElementById("buttonsendmessage").style.display = "block"
    
    let id = firebase.auth().currentUser.uid;
    for (const conv of lsConv) {
      if (id == conv.u1 || id == conv.u2) {

        if (conv.u1 == id)
          id = conv.u2;
        else
          id = conv.u1;
        refUsers.child('/' + id).once('value').then(function (snapshot) {
          const data = (snapshot.val())
          const name = data.fname + " " + data.lname;
          const convId = conv.id;

          that.convsDispl.innerHTML += `
        <div class="chat_list" onclick=handleConfIniated('${convId}')>
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

    if (this.selectedConv != null) {
      this.showMessages(this.selectedConv)
    }
  }


  showMessages(convId) {
    this.selectedConv = convId;

    var newArray = user.lsConversations.filter(function (el) {
      return el.id == convId;
    });

    const conv = newArray[0]

    this.msgDispl.innerHTML = '';
    for (const msg of conv.lsMessages) {
      let id = firebase.auth().currentUser.uid;

      if (id == msg.from) {
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

    this.msgDispl.innerHTML += "<span id='down'></span>";
    var mydiv = $("#down");
    mydiv.scrollTop(mydiv.prop("scrollHeight"));

    var myDiv = $(".msg_history").get(0);
    myDiv.scrollTop = myDiv.scrollHeight;


  }
}