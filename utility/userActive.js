import {
  app,
  auth,
  db,
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  getStorage,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "../modules/firebase.js";

async function userState() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const uid = user.uid;
          console.log("active user: ", uid);
          unsubscribe();
          resolve(user);
        } else {
          // User is signed out
          console.log("No user logged!!");
          resolve(null);
        }
      },
      (error) => {
        reject(error);
        console.log("No user logged!!");
      }
    );
  });
}

export { userState };
