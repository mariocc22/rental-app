// include your styles like this

import "../styles/index.css";
import { db, auth, onAuthStateChanged } from "../modules/firebase.js";
import { whereAmI } from "../modules/geolocation.js";

// import queries
import { addProfile } from "../query/userProfile.js";


if (process.env.NODE_ENV == "production") {
  if ('serviceWorker' in navigator) {
    // console.log(process.env.NODE_ENV);
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
}


console.log("hello from index.js");

// Buttons to access different paths
const btn_explore = document.querySelector(".btn-explore"),
  btn_showcase = document.querySelector(".btn-showcase"),
  btn_list_space = document.querySelector(".btn-list-space"),
  btn_geo = document.querySelector(".btn-geo");

// User state (logged In or Logged Out)
const userState = onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    // todo fix this later
    localStorage.setItem("uid", uid);


    // merges details or creates a new one in USERS Collection
    const { displayName, email, photoURL } = user;
    await addProfile(uid, { displayName, email, photoURL })

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

btn_geo.addEventListener("click", whereAmI);


// todo work in progress
window.addEventListener('online', () => {
  const offlineMessage = document.getElementById('offline-message');
  if (!window.navigator.onLine) {
    offlineMessage.style.display = 'none';
  }
});

window.addEventListener('offline', () => {
  const offlineMessage = document.getElementById('offline-message');
  if (window.navigator.onLine) {
    offlineMessage.style.display = 'block';
  }
});

setInterval(function () {
  console.log("bingo")

  
  console.log("Online status: " + window.navigator.onLine);
}, 5000); // Check every 5 seconds (5000ms)