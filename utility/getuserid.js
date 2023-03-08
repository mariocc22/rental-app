// import { FirebaseApp } from "@firebase/app";
import { db, auth, onAuthStateChanged } from "../modules/firebase.js";

// User state (logged In or Logged Out)
const userId = onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
        console.log(user.id)
        console.log(user)
      return user.uid;
    } else {
        return undefined;
    }
});

export {userId}