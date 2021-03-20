import firebase from 'firebase'
import "firebase/database"

// Set the configuration for your app
  var config = {
    databaseURL: "https://joriswebsitefirebase-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  firebase.initializeApp(config);

  export {firebase};