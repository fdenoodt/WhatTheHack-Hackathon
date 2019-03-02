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
      console.log(snapshot.val());

      const messages = [];
      let data = snapshot.val()
      const nKeys = Object.keys(data)
      nKeys.forEach(nKey => {
        // const nKeys = Object.keys(data)[0]
        const data2 = data[nKey]
        console.log(data2);
        const conversationId = nKey;

        let keys = [];
        if (data2.messages != undefined)
          keys = Object.keys(data2.messages);

        for (const key of keys) {
          const dataText = data2.messages[key];
          messages.push(new Message(dataText.text, dataText.time, dataText.from));
        }
        const conversation = new Conversation(data2.u1, data2.u2, messages, conversationId);
        that.lsConversations.push(conversation);
      });

      chatDisplay.update(that.lsConversations);
    });
  }
}