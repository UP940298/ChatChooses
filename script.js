//Declare html elements.
const counterNum = document.querySelector("#counterNum");
const messageText = document.querySelector("#message");

//Declear gamelist from other js file.
const gameList = rawGamelist;

//Create client and specify channel.
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    channels: ['peterparktv'],
});

//Connect to client.
client.connect();

/**Turn on client to listen to messages
 * Split the message by spaces - TODO: split message by punctuation.
 * Loop through each word in message then loop through each entry in game list and compare to detect if the message contains a game name.
 * Send the message and the users name to the database.
**/

client.on('message', (channel, tags, message, self) => {
    if (self) return true;
    let splitMessage = message.toLowerCase().split(" ");
    messageChecker(splitMessage);
    console.log(message);
});


//Connect to firebase database, create a new object of the message. If message already exists in database, update it, otherwsie create new entry.
function sendToFirebase(message) {

    var messageObject = {
        [message]: 1,
    };

    firebase.database().ref(`game-names/${message}`).once("value", snapshot => {
        if (snapshot.exists()) {
            console.log("exists", message);
            firebase.database().ref(`game-names/${message}`).set(firebase.database.ServerValue.increment(1));
        }
        else {
            firebase.database().ref('game-names').update(messageObject);
        }
    });

}

function messageChecker(message) {
    let wordCount = 0;
    for (let i = 0; i < 4; i++) {
        let gameName = gameList[i].split(" ");
        for (let j = 0; j < message.length; j++) {
            for (let k = 0; k < gameName.length; k++) {
                if (gameName[k] == message[j]) {
                    wordCount += 1;
                }
            }
        }
        if (gameName.length == 1) {
            if (wordCount == 1) {
                sendToFirebase(gameList[i]);
            }
        } else if (gameName.length > 1) {
            if (wordCount >= (gameName.length - 1)) {
                sendToFirebase(gameList[i]);
            }
        }
        wordCount = 0;
    }
}