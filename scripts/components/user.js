class User {
  constructor(fName, lName, age, interests, friends) {
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.interests = interests;
    this.lsConversations = [];
    this.friends = friends;
    const that = this;

    refConversations.on('value', function (snapshot) {
      that.lsConversations = [];
      let data = snapshot.val()
      const nKeys = Object.keys(data)
      nKeys.forEach(nKey => {
        const messages = [];
        const data2 = data[nKey]
        const conversationId = nKey;
        console.log(data2)
        let keys = [];
        if (data2.messages != undefined)
          keys = Object.keys(data2.messages);

        for (const key of keys) {
          const dataText = data2.messages[key];
          messages.push(new Message(dataText.text, dataText.time, dataText.from));
        }
        const conversation = new Conversation(data2.u1, data2.u2, messages, conversationId);
        that.lsConversations.push(conversation);
        // console.log(conversation);
      });

      chatDisplay.update(that.lsConversations);
    });
  }
}