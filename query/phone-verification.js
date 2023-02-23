"use-strict";

import {
    app,
    auth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "../modules/firebase.js";

// ==== Verification Phone ====
// Create the recaptcha code container
window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
);
recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
});

const phoneForm = document.getElementById("verification-form");

const btn_phone_login = document.getElementById("btn-phone");
const btn_send_code = document.getElementById("btn-code");

const phoneInput = phoneForm["phone-input"].value;
const user_phone = document.getElementById("user-phone-succesful");

// ============= Phone verification functionality ==============
// Here we send the SMS to the phone number specified
const sendVerificationCode = () => {
    const appVerifier = window.recaptchaVerifier;
    // If the message was successfully sent then print a message and proceed to log in with Phone with "btn_phone_login"
    signInWithPhoneNumber(auth, phoneInput, appVerifier).then(
        (confirmationResult) => {
            const sentCodeId = confirmationResult;
            console.log("Message sent!");
            phoneForm.reset();
            btn_phone_login.addEventListener("click", () =>
                signInWithPhone(sentCodeId)
            );
        }
    );
};

// Callback function from clicking the Log In button
const signInWithPhone = (sentCodeId) => {
    // The user type the code sent to his phone
    const codeInput = phoneForm["verified-code"].value;
    const code = codeInput;
    sentCodeId
        .confirm(code)
        .then((result) => {
            // if the code is correct then print something and display the user's phone
            const user = result.user;
            console.log(user);
            phoneForm.reset();
            user_phone.innerHTML = `${user.phoneNumber}`;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

// Event listener of requesting the number to send the SMS
btn_send_code.addEventListener("click", (e) => sendVerificationCode());
