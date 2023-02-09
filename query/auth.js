"use-strict";

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
} from "../modules/firebase.js";

// DOM HTML elements

// ===== BUTTONS =====
const menu_btn = document.querySelector(".hamburger");
const menu_btn_auth = document.querySelector(".modal-btn");
const modal_profile_btn = document.querySelector(".arrow-btn");
const logSignIn_btn = document.querySelector("#btn-auth");
const btn_logout = document.querySelector(".logout-wrp");
const btn_login = document.querySelector(".login-wrp");
const btn_google = document.querySelector(".google");
const btnLogOut = document.getElementById("btn-auth-logout");
const btn_fb = document.querySelector(".fb");
const btn_email = document.querySelector(".email");
const edit_profile_btn = document.querySelector(".edit-profile-link");

// ==== SCREENS & VARIABLES ====
const modal_profile = document.querySelector(".modal-profile");
const modal_logSignIn = document.querySelector(".modal-signup-login");
const loginForm = document.getElementById("login-form");
const user_name = document.getElementById("user-name");

// Phone Verification
const btn_space = document.querySelector("#btn-space");
const modal_phone_ver = document.querySelector(".modal-phone-verify");
const close_phone_modal = document.querySelector(".phone-close");
// ===== Event Listeners =====
// These event handlers are specifically to open or close the modals or screens on the app
menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("is-active");
  modal_profile.classList.toggle("is-active");

  menu_btn.disabled = true;
});

modal_profile_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("is-active");
  modal_profile.classList.toggle("is-active");
  menu_btn.disabled = false;
});

logSignIn_btn.addEventListener("click", () => {
  modal_logSignIn.classList.toggle("is-active");
});

menu_btn_auth.addEventListener("click", () => {
  menu_btn.classList.toggle("is-active");
  modal_profile.classList.toggle("is-active");
  modal_logSignIn.classList.toggle("is-active");
  menu_btn.disabled = false;
});

// ============ PHONE LISTENERS ========
close_phone_modal.addEventListener("click", () => {
  modal_phone_ver.classList.toggle("is-active");
});
btn_space.addEventListener("click", () => {
  modal_phone_ver.classList.toggle("is-active");
});

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
      user.displayName = "Mario Cesena";
      console.log("Welcome, ", user.email + "!");
      user_name.innerHTML = user.displayName;

      // Hide the Log in/Sign up screen
      modal_logSignIn.classList.toggle("is-active");

      // Hide button of log in and show the log out button
      btn_login.classList.add("hidden");
      btn_logout.classList.remove("hidden");

      // Show Edit Profile link below the Username
      edit_profile_btn.classList.remove("hidden");

      // Empty Form values
      loginForm.reset();
    })
    .catch((error) => {
      // If failed show the error
      alert(error.message);
      loginForm.reset();
    });
});

//  ================= GET USER STATUS CHANGES ================
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
// if the user clicks the Log out button:
btnLogOut.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User Logged out!");

      // Changes in the pages (buttons, names, etc.)
      btn_login.classList.remove("hidden");
      btn_logout.classList.add("hidden");
      modal_profile.classList.toggle("is-active");
      menu_btn.classList.toggle("is-active");
      menu_btn.disabled = false;
      user_name.innerHTML = "dear visitor";

      // Hide Edit Profile link
      edit_profile_btn.classList.add("hidden");
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

      // Hide the modal of Sign In
      modal_logSignIn.classList.remove("is-active");

      // Show Edit Profile link
      edit_profile_btn.classList.remove("hidden");

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

      // Hide the modal of Sign In
      modal_logSignIn.classList.remove("is-active");

      // Show Edit Profile link
      edit_profile_btn.classList.remove("hidden");
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

//  ============ Sign In / Sign UP FACEBOOK ==============
const providerFb = new FacebookAuthProvider();
btn_fb.addEventListener("click", () => {
  signInWithPopup(auth, providerFb)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("Hello: ", user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
});
