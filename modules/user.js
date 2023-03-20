import { auth, signOut, onAuthStateChanged } from "../modules/firebase.js";
import { addProfile } from "../query/userProfile.js";

let uid;

// LOGGING OUT
async function loggingOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User Logged out!");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// USER STATE
async function userState() {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, resolve);
    });
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      await addProfile(uid, { displayName, email, photoURL });
      return uid;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error bro");
  }
}

export { loggingOut, userState };
