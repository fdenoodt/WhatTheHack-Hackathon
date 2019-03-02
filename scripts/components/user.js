class User {
    constructor(fName, lName, age, interests) {
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.interests = interests;
        this.lsConversations = [];
        const that = this;

        refConversations.on('value', function (snapshot) {
            const messages = [];
            let data = snapshot.val()
            const nKeys = Object.keys(data)[0]
            data = data[nKeys]
            const conversationId = nKeys;
            // const conversationId = snapshot.ref.key;

            let keys = [];
            if (data.messages != undefined)
                keys = Object.keys(data.messages);

            for (const key of keys) {
                const dataText = data.messages[key];
                messages.push(new Message(dataText.text, dataText.time, dataText.from));
            }
            const conversation = new Conversation(data.u1, data.u2, messages, conversationId);
            that.lsConversations.push(conversation);
            chatDisplay.update(that.lsConversations);
        });
    }
}