import firebase from "firebase";

class Backend {
    uid = '';
    messagesRef = null;
    constructor() {
        // firebase.initializeApp({
        //     apiKey: "AIzaSyB9TdsMiuHr_2KT8MuSxsHg-AD-pAthPIE",
        //     authDomain: "book-store-56297.firebaseapp.com",
        //     databaseURL: "https://book-store-56297.firebaseio.com",
        //     projectId: "book-store-56297",
        //     storageBucket: "book-store-56297.appspot.com"
        // });
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                alert(user);
                this.setUid(user.uid);
                alert(user.uid);
            }
            else {
                firebase.auth().signInAnonymously().catch((error) => {
                    // alert(error.message);
                });
            }
        });
    }

    setUid(value){
        this.uid = value;
    }
    getUid(value){
        return this.uid;
    }
    
    loadMessages(callback){
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id : data.key,
                text : message.text,
                createdAt : new Date(message.createdAt),
                user : {
                    _id : message.user._id,
                    name : message.user.name
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added',onReceive);
    }

    sendMessage(message){
        alert(JSON.stringify(message));
        for(let i=0; i<message.length;i++){
            this.messagesRef.push({
                text : message[i].text,
                user : message[i].user,
                createdAt : firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    closeChat() {
        if(this.messagesRef){
            this.messagesRef.off();
        }
    }
}

export default new Backend;
