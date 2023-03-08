// include your styles like this

import "/styles/index.css";
import { db, auth, onAuthStateChanged } from "../modules/firebase.js";

console.log("hello from index.js");

// Buttons to access different paths
const btn_explore = document.querySelector(".btn-explore"),
  btn_showcase = document.querySelector(".btn-showcase"),
  btn_list_space = document.querySelector(".btn-list-space");

// User state (logged In or Logged Out)
const userState = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("active user: ", uid);
  } else {
    // User is signed out
    const authPage = "login-modal.html";
    btn_explore.setAttribute("href", authPage);
    btn_showcase.setAttribute("href", authPage);
    btn_list_space.setAttribute("href", authPage);
    console.log("No user logged!!");
  }
});
