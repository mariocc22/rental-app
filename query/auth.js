import "/styles/login.css";
import "/styles/standard-styles.css";

import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../modules/firebase.js";

import { addUser } from "../query/neo4jQueries.js";

// DOM HTML elements

// ===== BUTTONS =====
const logSignIn_btn = document.querySelector("#btn-auth");
const btn_login = document.querySelector(".btn-login");
const btn_logout = document.querySelector(".btn-logout");
const btn_google = document.querySelector(".google");
const btn_email = document.querySelector(".email");

// ==== SCREENS & VARIABLES ====
const modal_profile = document.querySelector(".modal-profile");
const modal_logSignIn = document.querySelector(".modal-signup-login");
const loginForm = document.getElementById("login-form");
const user_name = document.getElementById("user-name");

// Phone Verification
const btn_space = document.querySelector("#btn-space");
const modal_phone_ver = document.querySelector(".modal-phone-verify");
const close_phone_modal = document.querySelector(".phone-close");

//  ================= SIGN IN USER (email/password) ================
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get User Info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in!
      const user = userCredential.user;
      // Adding a Display Name since it doesn't have if sign up with email & password
      console.log(user);
      user.displayName = "Michael Smith";
      console.log("Welcome, ", user.displayName, user.email + "!");

      // Get the parameter from the previous page
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get("name");
      console.log(name);
      // Empty Form values
      loginForm.reset();
      // If the user is approved, it takes you to the previous screen to follow the process
      window.location.href = `${name}.html`;
    })
    .catch((error) => {
      // If failed show the error
      alert(error.message);
      loginForm.reset();
    });
});

//  ================= GET USER STATUS CHANGES ================
const userState = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("active user: ", uid);
    btn_logout.classList.toggle("hidden");
    btn_login.classList.toggle("hidden");
    // ...
  } else {
    // User is signed out
    console.log("No user logged!!");
    // ...
  }
});

// onAuthStateChanged(auth, (user) => {
//   // Any changes to the user status if there's a user logged in
//   if (user) {
//     // Show the current user
//     const user = auth.currentUser;
//     // This is just for testing, but you can set the Display name or change any of the user's value by taking the "user" const
//     const username = !user.displayName ? "User" : user.displayName;
//     console.log("Welcome, ", user.displayName + "!");

//     // Modify the Username on the screen to user's logged
//     user_name.innerHTML = username;

//     // Keep the button Log out active and remove the Login button
//     btn_logout.classList.remove("hidden");
//     btn_login.classList.add("hidden");
//   } else {
//     console.log("No users");
//   }
// });

// ================ SIGN OUT ===============
// IF THE USER CLICKS THE LOG OUT BUTTON
btn_logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User Logged out!");
      loginForm.reset();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//  ============ Sign In / Sign UP EMAIL ==============
btn_email.addEventListener("click", () => {
  // Get User Info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User Created! ", user.email);
      // Reset Login Form Values
      loginForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
});

// ============ Sign In / Sign UP Google Provider ===========
const provider = new GoogleAuthProvider();
btn_google.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)

      console.log("User logged in with Gmail!");
      console.log(user);

      // const urlParams = new URLSearchParams(window.location.search);
      // const name = urlParams.get("name");
      // console.log(name);
      // // Reset Login Form Values
      // loginForm.reset();
      // If the user is approved, it takes you to the previous screen to follow the process

      const userId = user.uid;
      // Adds user to Neo4j Database
      createUser(userId)
        .then((r) => {
          window.location.href = window.location.origin;
        })
        .catch((error) => {
          console.log(error);
          throw new Error("Could not create user in Neo4j");
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
});

async function createUser(userId) {
  await addUser(userId);
  return "saved";
}

export { userState };
