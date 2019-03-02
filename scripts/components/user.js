class User {
  constructor(fName, lName, age, interests) {
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.interests = interests;
    this.lsConversations = [];
    
    const that = this;
    refConversations.on('child_added', function (snapshot) {
      const messages = [];
      const data = snapshot.val();

      let keys = [];
      if (data.messages != undefined)
        keys = Object.keys(data.messages);

      for (const key of keys) {
        const dataText = data.messages[key];
        messages.push(new Message(dataText.text, dataText.time, dataText.ufrom));
      }

      const conversation = new Conversation(data.u1, data.u2, messages);
      that.lsConversations.push(conversation);
    });
  }
}