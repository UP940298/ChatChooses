const counterNum = document.querySelector("#counterNum");
const messageText = document.querySelector("#message");
var counter = 0;

const gameList = {};

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    channels: ['lirik'],
});

const users = {};

client.connect();

/**client.on('message', (channel, tags, message, self) => {
    if (self) return true;
    let splitMessage = message.split(" ");
    for (let i = 0; i < splitMessage.length; i++) {
        for (let j = 0; j < splitMessage.length; j++) {
            if (splitMessage[i].toLowerCase() == gameList2[j]) {
                counter += 1;
                counterNum.innerHTML = counter;
                messageText.innerHTML += message + " , ";
            }
        }
    }
})
**/