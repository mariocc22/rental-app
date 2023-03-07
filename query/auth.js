import "/styles/login.css";

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

import { addUser } from '../query/neo4jQueries.js';

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
// menu_btn.addEventListener("click", () => {
//     menu_btn.classList.toggle("is-active");
//     modal_profile.classList.toggle("is-active");

//     menu_btn.disabled = true;
// });

// modal_profile_btn.addEventListener("click", () => {
//     menu_btn.classList.toggle("is-active");
//     modal_profile.classList.toggle("is-active");
//     menu_btn.disabled = false;
// });

// logSignIn_btn.addEventListener("click", () => {
//     modal_logSignIn.classList.toggle("is-active");
// });

// menu_btn_auth.addEventListener("click", () => {
//     menu_btn.classList.toggle("is-active");
//     modal_profile.classList.toggle("is-active");
//     modal_logSignIn.classList.toggle("is-active");
//     menu_btn.disabled = false;
// });

// ============ PHONE LISTENERS ========
// close_phone_modal.addEventListener("click", () => {
//     modal_phone_ver.classList.toggle("is-active");
// });
// btn_space.addEventListener("click", () => {
//     modal_phone_ver.classList.toggle("is-active");
// });

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

            // Hide the Log in/Sign up screen
            // modal_logSignIn.classList.toggle("is-active");

            // Hide button of log in and show the log out button
            // btn_login.classList.add("hidden");
            // btn_logout.classList.remove("hidden");

            // Show Edit Profile link below the Username
            // edit_profile_btn.classList.remove("hidden");

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
// btnLogOut.addEventListener("click", (e) => {
//     signOut(auth)
//         .then(() => {
//             // Sign-out successful.
//             console.log("User Logged out!");

//             // Changes in the pages (buttons, names, etc.)
//             btn_login.classList.remove("hidden");
//             btn_logout.classList.add("hidden");
//             modal_profile.classList.toggle("is-active");
//             menu_btn.classList.toggle("is-active");
//             menu_btn.disabled = false;
//             user_name.innerHTML = "dear visitor";

//             // Hide Edit Profile link
//             edit_profile_btn.classList.add("hidden");
//         })
//         .catch((error) => {
//             console.log(error.message);
//         });
// });

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
            // modal_logSignIn.classList.remove("is-active");

            // Show Edit Profile link
            // edit_profile_btn.classList.remove("hidden");

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

            // Hide the modal of Sign In
            // modal_logSignIn.classList.remove("is-active");

            // Show Edit Profile link
            // edit_profile_btn.classList.remove("hidden");

            // Get the parameter from the previous page
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get("name");
            console.log(name);
            // Reset Login Form Values
            loginForm.reset();
            // If the user is approved, it takes you to the previous screen to follow the process
            
            // await delay(5000);

            // window.location.href = window.location.origin;

            // addNewUser.then(() => {
            //     console.log('soemthing went wrong')
            // })
            
            const userId = user.uid;
            // Adds user to Neo4j Database
            createUser(userId).then((r) => {
                window.location.href = window.location.origin;
              }).catch((error) => {
                console.log(error)
                throw new Error("Could not create user in Neo4j")
              });

        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error?.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage);
            // ...
        });
});


async function createUser(userId) {
    await addUser(userId);
    return 'saved';
}


//  ============ Sign In / Sign UP FACEBOOK ==============
// const providerFb = new FacebookAuthProvider();
// btn_fb.addEventListener("click", () => {
//     signInWithPopup(auth, providerFb)
//         .then((result) => {
//             // The signed-in user info.
//             const user = result.user;

//             // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//             const credential =
//                 FacebookAuthProvider.credentialFromResult(result);
//             const accessToken = credential.accessToken;

//             // IdP data available using getAdditionalUserInfo(result)
//             // ...
//             console.log("Hello: ", user);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = FacebookAuthProvider.credentialFromError(error);
//             console.log(errorMessage);
//             // ...
//         });
// });

/////////////// PHONE VERIFICATION /////////////////////
// ==== Verification Phone ====
// Create the recaptcha code container
// window.recaptchaVerifier = new RecaptchaVerifier(
//     "recaptcha-container",
//     {},
//     auth
// );
// recaptchaVerifier.render().then((widgetId) => {
//     window.recaptchaWidgetId = widgetId;
// });

// const phoneForm = document.getElementById("verification-form");

// const btn_phone_login = document.getElementById("btn-phone");
// const btn_send_code = document.getElementById("btn-code");

// const phoneInput = phoneForm["phone-input"].value;
// const user_phone = document.getElementById("user-phone-succesful");

// ============= Phone verification functionality ==============
// Here we send the SMS to the phone number specified
// const sendVerificationCode = () => {
//     const appVerifier = window.recaptchaVerifier;
//     // If the message was successfully sent then print a message and proceed to log in with Phone with "btn_phone_login"
//     signInWithPhoneNumber(auth, phoneInput, appVerifier).then(
//         (confirmationResult) => {
//             const sentCodeId = confirmationResult;
//             console.log("Message sent!");
//             phoneForm.reset();
//             btn_phone_login.addEventListener("click", () =>
//                 signInWithPhone(sentCodeId)
//             );
//         }
//     );
// };

// Callback function from clicking the Log In button
// const signInWithPhone = (sentCodeId) => {
//     // The user type the code sent to his phone
//     const codeInput = phoneForm["verified-code"].value;
//     const code = codeInput;
//     sentCodeId
//         .confirm(code)
//         .then((result) => {
//             // if the code is correct then print something and display the user's phone
//             const user = result.user;
//             console.log(user);
//             phoneForm.reset();
//             user_phone.innerHTML = `${user.phoneNumber}`;
//         })
//         .catch((err) => {
//             console.log(err.message);
//         });
// };

// Event listener of requesting the number to send the SMS
// btn_send_code.addEventListener("click", (e) => sendVerificationCode());
