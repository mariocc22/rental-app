// console.log('works')
import "/styles/list-my-space.css";
import "/styles/standard-styles.css";
import "../node_modules/leaflet/dist/leaflet.css";
import "/styles/common-styles.css";
import { createProperty } from "/query/propertycreate.js";
import { equipmentFormParser } from "../utility/equipmentFormParser.js";
import { rightslide, leftslide, counter } from "../utility/imageSlider";
import { userState } from "../modules/user.js";
import {
  input,
  UploadProcess,
  urlString,
  cameraUpload,
  uploadAllFiles,
  files,
  uploadFiles2,
} from "../utility/pictures-api";
// import { userId } from "../utility/getuserid.js";
import { SaveURLtoFirestore } from "/query/imagecreate.js";
import { addPlace } from "../query/neo4jQueries.js";
import QuantityInput from "../utility/quantity.js";
// import { easepick } from "@easepick/bundle";
// import { RangePlugin } from "@easepick/range-plugin";
import { calendarBook } from "../utility/datePicker.js";
import * as L from "../node_modules/leaflet/dist/leaflet.js";

// modules
import { addOfflineSupport } from "../modules/offline";
addOfflineSupport();

// Geolocation
import { whereAmI, getPosition } from "../modules/geolocation.js";

// General Listeners
// SPA FUNCTIONALITY!!!
// const allPages = document.querySelectorAll("div.page");
// allPages[0].style.display = "block";

// function navigateToPage(event) {
//   let pagecontinue = true;
//   const pageId = location.hash ? location.hash : "#page1";
//   for (let page of allPages) {
//     if (pageId === "#" + page.id) {
//       page.style.display = "block";
//     } else {
//       page.style.display = "none";
//     }
//   }
//   return;
// }
// navigateToPage();

//init handler for hash navigation

// Header
const btn_links = document.querySelectorAll(".link-btn");
const moveTo = function (link) {
  window.location.href = `/${link}.html`;
};
btn_links.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.classList.contains("explore")) {
      moveTo("explore");
    }
    if (btn.classList.contains("showcase")) {
      moveTo("showcase");
    }
    if (btn.classList.contains("list-space")) {
      moveTo("list-my-space");
    }
  });
});

// DESKTOP VERSION
let desktopVIew = false;
const allPages = document.querySelectorAll("div.page");
allPages[0].style.display = "block";

function navigateToPage(event) {
  let pagecontinue = true;
  const pageId = location.hash ? location.hash : "#page1";
  let x = window.matchMedia("(max-width: 891px)");
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const page3 = document.getElementById("page3");
  const page4 = document.getElementById("page4");
  const page5 = document.getElementById("page5");
  const page6 = document.getElementById("page6");
  const page7 = document.getElementById("page7");
  const page8 = document.getElementById("page8");
  const page9 = document.getElementById("page9");
  const page10 = document.getElementById("page10");
  const page11 = document.getElementById("page11");
  const page12 = document.getElementById("page12");
  const page13 = document.getElementById("page13");

  // Navigations page
  const navigationPage1 = document.querySelector("#page1 .navigation");
  const progressPageMobile = document.querySelectorAll(".progressMobile");
  const progressPageDesktop13 = document.querySelector(".progressDesktop-1-3");
  const progressPageDesktop456 = document.querySelector(
    ".progressDesktop-4-5-6"
  );
  const progressDesktop7 = document.querySelector(".progressDesktop-7");
  const progressDesktop9 = document.querySelector(".progressDesktop-9");
  const progressDesktop10 = document.querySelector(".progressDesktop-10");
  const progressDesktop11 = document.querySelector(".progressDesktop-11");
  const progressDesktop12 = document.querySelector(".progressDesktop-12");
  const backButtonAddress = document.querySelectorAll(".backButtonAddress");
  const pageTitle = document.querySelector(".list-space-title");
  // Mobile
  if (x.matches) {
    desktopVIew = false;
    progressPageMobile.forEach((progress) => {
      progress.style.display = "block";
    });
    progressPageDesktop13.style.display = "none";
    progressPageDesktop456.style.display = "none";
    progressDesktop7.style.display = "none";
    progressDesktop9.style.display = "none";
    progressDesktop10.style.display = "none";
    progressDesktop11.style.display = "none";
    progressDesktop12.style.display = "none";

    backButtonAddress.forEach((back) => {
      back.style.display = "block";
    });
    pageTitle.style.display = "none";
    if (pageId === "#page1") {
      pageTitle.style.display = "block";
      navigationPage1.style.display = "flex";
      page1.style.display = "block";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page3") {
      page1.style.display = "none";
      page3.style.display = "block";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page4") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "block";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page5") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "block";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page6") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "block";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page7") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "block";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page9") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "block";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page10") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "block";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page11") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "block";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page12") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "block";
      page13.style.display = "none";
    } else if (pageId === "#page13") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "block";
    }
    // Desktop
  } else {
    progressPageDesktop13.style.display = "none";
    progressPageDesktop456.style.display = "none";
    progressDesktop7.style.display = "block";
    progressDesktop9.style.display = "block";
    progressDesktop10.style.display = "block";
    progressDesktop11.style.display = "block";
    progressDesktop12.style.display = "block";
    desktopVIew = true;
    backButtonAddress.forEach((back) => {
      back.style.display = "none";
    });
    progressPageMobile.forEach((progress) => {
      progress.style.display = "none";
      // if (
      //   pageId === "#page7" ||
      //   pageId === "#page9" ||
      //   pageId === "#page10" ||
      //   pageId === "#page11" ||
      //   pageId === "#page12"
      // ) {
      //   progress.style.display = "block";
      // }
    });
    pageTitle.style.display = "none";
    if (pageId === "#page1" || pageId === "#page3") {
      pageTitle.style.display = "block";
      navigationPage1.style.display = "none";
      page1.style.display = "block";
      page3.style.display = "block";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
      progressPageDesktop13.style.display = "block";
    } else if (pageId === "#page3") {
      page1.style.display = "block";
      page3.style.display = "block";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (
      pageId === "#page4" ||
      pageId === "#page5" ||
      pageId === "#page6"
    ) {
      progressPageDesktop456.style.display = "block";
      if (addphotoDesktop) {
        page6.style.display = "block";
        page5.style.display = "none";
      } else if (takePhotoDesktop) {
        page5.style.display = "block";
        page6.style.display = "none";
      }
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "block";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page7") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "block";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page9") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "block";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page10") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "block";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page11") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "block";
      page12.style.display = "none";
      page13.style.display = "none";
    } else if (pageId === "#page12") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "block";
      page13.style.display = "none";
    } else if (pageId === "#page13") {
      page1.style.display = "none";
      page3.style.display = "none";
      page4.style.display = "none";
      page5.style.display = "none";
      page6.style.display = "none";
      page7.style.display = "none";
      page9.style.display = "none";
      page10.style.display = "none";
      page11.style.display = "none";
      page12.style.display = "none";
      page13.style.display = "block";
    }
  }
  return;
}
navigateToPage();
window.addEventListener("hashchange", navigateToPage);
window.addEventListener("resize", navigateToPage);

// Activity
let _activity;
const musician = document.getElementById("musician");
const photographer = document.getElementById("photographer");
const performance = document.getElementById("performance");

musician.addEventListener("click", () => {
  _activity = "musician";
});

photographer.addEventListener("click", () => {
  _activity = "photography";
});

performance.addEventListener("click", () => {
  _activity = "performance";
});

// Camera or Select Files
let camera = false;

// What kind of space do you offer
let _indoor = false;
let _outdoor = false;
let _house = false;
let _studio = false;
let _others = false;
let _beach = false;

const indoorButtonPressed = document.getElementById("indoorButton");
const outdoorButton = document.getElementById("outdoorButton");
const houseButton = document.getElementById("houseButton");
const studioButton = document.getElementById("studioButton");
const otherButton = document.getElementById("otherButton");
const beachButton = document.getElementById("beachButton");
const btn_activities = document.querySelectorAll(".activity-btn");

btn_activities.forEach((activity) => {
  activity.addEventListener("click", () => {
    btn_activities.forEach((btn) => {
      btn.classList.toggle("selected", btn === activity);
    });
  });
});

indoorButtonPressed.addEventListener("click", () => {
  // Turn it on
  indoorButtonPressed.classList.toggle("selected");
  outdoorButton.classList.remove("selected");
  houseButton.classList.remove("selected");
  studioButton.classList.remove("selected");
  otherButton.classList.remove("selected");
  beachButton.classList.remove("selected");

  if (indoorButtonPressed.classList.contains("selected")) {
    _indoor = true;
  } else {
    _indoor = false;
  }

  _outdoor = false;
  _house = false;
  _studio = false;
  _others = false;
  _beach = false;
});

outdoorButton.addEventListener("click", () => {
  // Turn it on
  outdoorButton.classList.toggle("selected");
  indoorButtonPressed.classList.remove("selected");
  houseButton.classList.remove("selected");
  studioButton.classList.remove("selected");
  otherButton.classList.remove("selected");
  beachButton.classList.remove("selected");

  if (outdoorButton.classList.contains("selected")) {
    _outdoor = true;
  } else {
    _outdoor = false;
  }

  _indoor = false;
  _house = false;
  _studio = false;
  _others = false;
  _beach = false;
});

houseButton.addEventListener("click", () => {
  // Turn it on
  outdoorButton.classList.remove("selected");
  indoorButtonPressed.classList.remove("selected");
  houseButton.classList.toggle("selected");
  studioButton.classList.remove("selected");
  otherButton.classList.remove("selected");
  beachButton.classList.remove("selected");

  if (houseButton.classList.contains("selected")) {
    _house = true;
  } else {
    _house = false;
  }

  _indoor = false;
  _outdoor = false;
  _studio = false;
  _others = false;
  _beach = false;
});

studioButton.addEventListener("click", () => {
  // Turn it on
  outdoorButton.classList.remove("selected");
  indoorButtonPressed.classList.remove("selected");
  houseButton.classList.remove("selected");
  studioButton.classList.toggle("selected");
  otherButton.classList.remove("selected");
  beachButton.classList.remove("selected");

  if (studioButton.classList.contains("selected")) {
    _studio = true;
  } else {
    _studio = false;
  }

  _indoor = false;
  _outdoor = false;
  _house = false;
  _others = false;
  _beach = false;
});

otherButton.addEventListener("click", () => {
  // Turn it on
  outdoorButton.classList.remove("selected");
  indoorButtonPressed.classList.remove("selected");
  houseButton.classList.remove("selected");
  studioButton.classList.remove("selected");
  otherButton.classList.toggle("selected");
  beachButton.classList.remove("selected");

  if (otherButton.classList.contains("selected")) {
    _others = true;
  } else {
    _others = false;
  }

  _indoor = false;
  _outdoor = false;
  _house = false;
  _studio = false;
  _beach = false;
});

beachButton.addEventListener("click", () => {
  // Turn it on
  outdoorButton.classList.remove("selected");
  indoorButtonPressed.classList.remove("selected");
  houseButton.classList.remove("selected");
  studioButton.classList.remove("selected");
  otherButton.classList.remove("selected");
  beachButton.classList.toggle("selected");

  if (beachButton.classList.contains("selected")) {
    _beach = true;
  } else {
    _beach = false;
  }

  _indoor = false;
  _outdoor = false;
  _house = false;
  _others = false;
  _studio = false;
});

// Address
const addressvalidation = document.getElementById("addressvalidation");
addressvalidation.addEventListener("click", (e) => {
  // Validations:
  let validatepage = true;
  console.log(validatepage);
  function validateForm() {
    let street = document.forms["formAddress"]["street"].value;
    let city = document.forms["formAddress"]["city"].value;
    let state = document.forms["formAddress"]["state"].value;
    let postalcode = document.forms["formAddress"]["postalcode"].value;
    let country = document.forms["formAddress"]["country"].value;
    if (street == "") {
      alert("Street must be filled out");
      return false;
    } else if (city == "") {
      alert("City must be filled out");
      return false;
    } else if (state == "") {
      alert("State must be filled out");
      return false;
    } else if (postalcode == "") {
      alert("Postal Code must be filled out");
      return false;
    } else if (country == "") {
      alert("Country Code must be filled out");
      return false;
    } else if (_activity == "") {
      alert("Please select an activity");
      return false;
    } else if (
      _indoor == false &&
      _outdoor == false &&
      _house == false &&
      _studio == false &&
      _others == false &&
      _beach == false
    ) {
      alert("Please select type space");
      return false;
    } else {
      return true;
    }
  }
  validatepage = validateForm();
  console.log(validatepage);
  if (validatepage) {
    e.preventDefault();
    window.location.href = `${window.location.origin}/list-my-space.html#page4`;
  } else {
    e.preventDefault();
    window.location.href = `${window.location.origin}/list-my-space.html#page3`;
  }
});

// Camera functionality
const captureButton = document.getElementById("capture-btn");
const previewImage = document.getElementById("picture-preview");
const video = document.getElementById("video");
previewImage.style.display = "none";

let file;
let randomNumber;
let photoList;

// Check if the browser supports the camera API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Set up the camera stream
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // Attach the camera stream to the video element
      video.srcObject = stream;
      video.play();

      // Capture the picture when the button is clicked
      captureButton.addEventListener("click", () => {
        // const closeimg = document.getElementById("closeimg");
        closeimg.style.display = "flex";
        upvideobtn.style.display = "block";

        // Create a canvas element to capture the image
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL and display it in the preview element
        previewImage.src = canvas.toDataURL("image/png");
        // console.log(previewImage.src);
        previewImage.style.display = "block";
        photoList = previewImage.src;
        console.log(photoList);
        console.log(previewImage.src);

        // Converting base64 to Img
        async function test() {
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 0.9)
          );
          console.log(blob);
          file = new File([blob], "image.jpg", { type: "image/jpeg" });
          // console.log(file);
        }

        test();
        randomNumber = Math.floor(Math.random() * 100) + 1;

        const imgtaken = document.getElementById("imgtaken");

        // imgtaken.classList.toggle('imageactive');
        imgtaken.classList.add("imageactive");
        if (imgtaken.classList.contains("imageactive")) {
          imgtaken.style.display = "initial";
        }
        // else{
        //   imgtaken.style.display = "none";
        // }

        closeimg.addEventListener("click", () => {
          imgtaken.style.display = "none";
          upvideobtn.style.display = "none";
          nextvideo.classList.add("hide");
        });
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
} else {
  console.error("Camera not supported by this browser");
}

const btnBackHome = document.querySelectorAll(".backToHome");
btnBackHome.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (desktopVIew) {
      window.location.href = "/list-my-space.html#page1";
    } else {
      window.location.href = "/list-my-space.html#page4";
    }
  });
});

// Uploading Pictures
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");
const upvideobtn = document.getElementById("upvideobtn");
const addphoto = document.getElementById("addphoto");
let addphotoDesktop = false;
const takephoto = document.getElementById("takephoto");
let takePhotoDesktop = false;
const nextcamera = document.getElementById("nextcamera");
const nextvideo = document.getElementById("nextvideo");
const containerSelectedImg = document.querySelector(".image-container");
const containerImagePreview = document.querySelector(
  ".wrap-img-page12-container"
);
const addphoto2 = document.getElementById("imageSelect");
let photosCamera = true;
const backCameraBtn = document.getElementById("backToPhotos");

backCameraBtn.addEventListener("click", (e) => {
  if (!photosCamera) {
    window.location.href = `${window.location.origin}/list-my-space.html#page6`;
    e.preventDefault();
  } else {
    window.location.href = `${window.location.origin}/list-my-space.html#page5`;
    e.preventDefault();
  }
});

nextvideo.addEventListener("click", (e) => {
  photosCamera = true;
});

let featureImage = "";

containerSelectedImg.addEventListener("click", (e) => {
  const imageContainer = document.querySelectorAll(".img");
  let target = e.target;
  // Store the feature Image

  featureImage = target.closest(".img").getAttribute("data-set");
  console.log("Feature Image is!", featureImage);

  // Remove all the feature image effect selection
  imageContainer.forEach((img) => {
    img.classList.remove("featureImg");
  });
  // Add the feature image effect to the target
  target.closest(".img").classList.add("featureImg");

  if (target.tagName === "SPAN" || target.tagName === "I") {
    let attr = target.closest(".img").getAttribute("data-set");
    containerSelectedImg.removeChild(target.closest(".img"));

    files.forEach((file) => {
      if (file.name === attr) {
        console.log("Index", files.indexOf(file));
        files.splice(files.indexOf(file), 1);
      }
    });
  }
  console.log("Current File Array: ", files);
});

// Next Button in Page 6 (Selected files)
nextcamera.addEventListener("click", (e) => {
  photosCamera = false;
  if (containerSelectedImg.hasChildNodes()) {
    window.location.href = `${window.location.origin}/list-my-space.html#page7`;

    e.preventDefault();
  } else {
    window.location.href = `${window.location.origin}/list-my-space.html#page6`;
    e.preventDefault();
  }
  console.log("Files before sorting: ", files);
  files.forEach((file) => {
    console.log("File name: ", file.name);
  });

  let featureImageIndex = files.findIndex((file) => file.name === featureImage);

  if (featureImageIndex >= 0) {
    [files[0], files[featureImageIndex]] = [files[featureImageIndex], files[0]];
  }

  console.log("Files after sorting!", files);
});

takephoto.addEventListener("click", () => {
  nextvideo.classList.add("hide");
  nextcamera.classList.add("hide");
  upvideobtn.style.display = "none";
  takePhotoDesktop = true;
  addphotoDesktop = false;
  navigateToPage();
});

addphoto.addEventListener("click", () => {
  input.click();
  SelBtn.classList.add("hide");
  nextcamera.classList.remove("hide");
  containerSelectedImg.innerHTML = "";
  addphotoDesktop = true;
  takePhotoDesktop = false;
  navigateToPage();
});

addphoto2.addEventListener("click", (e) => {
  if (!containerSelectedImg.hasChildNodes()) {
    input.click();
    SelBtn.classList.add("hide");
    nextcamera.classList.remove("hide");
  } else {
    nextcamera.classList.remove("hide");
  }
});

SelBtn.onclick = function () {
  input.click();

  SelBtn.classList.add("hide");
  nextcamera.classList.remove("hide");
};

let fromImage = false;

upvideobtn.addEventListener("click", () => {
  camera = true;
  cameraUpload(file, randomNumber);
  nextvideo.style.visibility = "visible";
  nextvideo.classList.remove("hide");
  upvideobtn.style.display = "none";
});

// Getting values from UI
let _lat;
let _long;
const street = document.getElementById("street");
const flatroom = document.getElementById("flatroom");
const city = document.getElementById("city");
const state = document.getElementById("state");
const postalcode = document.getElementById("postalcode");
const country = document.getElementById("country");
const propertytitle = document.getElementById("propertytitle");
const propertydescription = document.getElementById("propertydescription");

// Geolocation
const geobtn = document.getElementById("geobtn");

geobtn.addEventListener("click", async function (event) {
  // const test = await getPosition();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // success callback is called w. GeoLocationPosition
        console.log("latitude = " + position.coords.latitude);
        console.log("longitude = " + position.coords.longitude);
        _lat = position.coords.latitude; // test2.latt;
        _long = position.coords.longitude; //test2.longt;
        // console.log(_lat);
        // console.log(_long);
        //LOCATION IQ API
        var xhr = new XMLHttpRequest();
        var _url = `https://us1.locationiq.com/v1/reverse?key=pk.bacaddd84141d8123622e2937d0b47b0&lat=${_lat}&lon=${_long}&format=json`;
        console.log(_url);
        const userAction = async () => {
          const response = await fetch(_url);
          const myJson = await response.json(); //extract JSON from the http response
          console.log(myJson);

          street.value = myJson.address.road;
          city.value = myJson.address.city; //response.address.city;//dataGeo.city;
          state.value = myJson.address.state;
          postalcode.value = myJson.address.postcode;
          country.value = myJson.address.country;
        };
        userAction();
        // Map
        const _map = document.getElementById("map");
        _map.style.display = "block";
        let map = L.map(_map, {
          renderer: L.canvas(),
        }).setView([_lat, _long], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          maxZoom: 21,
          zoomSnap: 0.25,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        let stage = L.icon({
          iconUrl: "../assets/svg-icons/locationdm.svg",
          iconSize: [40, 40],
          iconAnchor: [31, 38],
        });
        L.marker([_lat, _long], { icon: stage }).addTo(map);
      },
      (error) => {
        // failure callback is called w. error object
        console.log(error);
        if (error.code == error.PERMISSION_DENIED) {
          window.alert("geolocation permission denied");
        }
      }
    );
  } else {
    // no geolocation in navigator. in case running in an old browser
    console.log("Geolocation is not supported by this browser.");
  }
});

// Tags
let _foodphotography = false;
let _commercial = false;
let _fashion = false;
let _portrait = false;
let _lifestyle = false;
let _newborn = false;
let _wedding = false;

// Amenities
let _amenities = []; // Amenities[]
let _washroom = false;
let _kitchen = false;
let _natural = false;
let _wifi = false;
let _elevator = false;
let _parking = false;
let _airconditioner = false;

const amenitiesWrapper = document.querySelectorAll(
  ".div-amenities-buttons button"
);
const amenitiesBtns = [...amenitiesWrapper];
amenitiesBtns.forEach((btnElement) => {
  btnElement.addEventListener("click", (event) => {
    const target = event.target;

    const tagname = target.getAttribute("data-tagname");
    // console.log(tagname)
    if (_amenities.includes(tagname)) {
      const removedArray = _amenities.filter(
        (selectedTags) => selectedTags != tagname
      );
      _amenities = removedArray;
    } else {
      _amenities.push(tagname);
    }
  });
});

const washroombtn = document.getElementById("washroombtn");
const wifibtn = document.getElementById("wifibtn");
const elevatorbtn = document.getElementById("elevatorbtn");
const parkingbtn = document.getElementById("parkingbtn");
const airconditionerbtn = document.getElementById("airconditionerbtn");
// const naturalLight = document.getElementById("naturalLight");
// const heater = document.getElementById("heater");
/////// PENDING!!!!
// naturalLight.addEventListener("click", () => {
//   if (naturalLight.classList.contains("selected")) {
//     naturalLight.classList.remove("selected");
//     // _washroom = false;
//   } else {
//     naturalLight.classList.add("selected");
//     // _washroom = true;
//   }
// });

// heater.addEventListener("click", () => {
//   if (heater.classList.contains("selected")) {
//     heater.classList.remove("selected");
//     // _washroom = false;
//   } else {
//     heater.classList.add("selected");
//     // _washroom = true;
//   }
// });

washroombtn.addEventListener("click", () => {
  if (washroombtn.classList.contains("selected")) {
    washroombtn.classList.remove("selected");
    _washroom = false;
  } else {
    washroombtn.classList.add("selected");
    _washroom = true;
  }
});

wifibtn.addEventListener("click", () => {
  // Turn it on
  if (wifibtn.classList.contains("selected")) {
    wifibtn.classList.remove("selected");
    _wifi = false;
  } else {
    wifibtn.classList.add("selected");
    _wifi = true;
  }
});

elevatorbtn.addEventListener("click", () => {
  // Turn it on
  if (elevatorbtn.classList.contains("selected")) {
    elevatorbtn.classList.remove("selected");
    _elevator = false;
  } else {
    elevatorbtn.classList.add("selected");
    _elevator = true;
  }
});

parkingbtn.addEventListener("click", () => {
  // Turn it on
  if (parkingbtn.classList.contains("selected")) {
    parkingbtn.classList.remove("selected");
    _parking = false;
  } else {
    parkingbtn.classList.add("selected");
    _parking = true;
  }
});

airconditionerbtn.addEventListener("click", () => {
  // Turn it on
  if (airconditionerbtn.classList.contains("selected")) {
    airconditionerbtn.classList.remove("selected");
    _airconditioner = false;
  } else {
    airconditionerbtn.classList.add("selected");
    _airconditioner = true;
  }
});

//...
// Amenities validation
const nextpage7to9 = document.getElementById("nextpage7to9");
nextpage7to9.addEventListener("click", () => {
  console.log(_amenities);
  if (!_washroom && !_wifi && !_elevator && !_parking && !_airconditioner) {
    alert("Please select an amenity");
  } else if (!propertytitle.value) {
    alert("Please type property title");
  } else if (!propertydescription.value) {
    alert("Please type property description");
  } else {
    window.location.href = "/list-my-space.html#page9";
  }
});
//....

// Equipment
let _light;
let _lightshapers;
let _camerastand;
let _camera;
let _lens;
let _otherequipment;
let _equipments = []; // Equip[{tagname, desc, price},{},{} ]

const equipmentWrapper = document.getElementById("equipmentnextbutton");
// console.log(equipmentWrapper);
equipmentWrapper.addEventListener("click", (event) => {
  const equipmentForm = document.getElementById("equipmentform");
  const equipmentid = Object.fromEntries(new FormData(equipmentForm));
  const parsedData = equipmentFormParser(equipmentid);
  // console.log(parsedData);
  _equipments = parsedData;
});

// Set up quantity forms
(function () {
  let quantities = document.querySelectorAll("[data-quantity]");

  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach(
      (div) => (div.quantity = new QuantityInput(div, "Down", "Up"))
    );
  }
})();

calendarBook();

// Bundles values
const cameracheckboxvalue = document.getElementById("cameracheckboxvalue");
const lenscheckboxvalue = document.getElementById("lenscheckboxvalue");
const backdropcheckboxvalue = document.getElementById("backdropcheckboxvalue");
const flashlightcheckboxvalue = document.getElementById(
  "flashlightcheckboxvalue"
);
const tripodscheckboxvalue = document.getElementById("tripodscheckboxvalue");
const bundlevalue = document.getElementById("bundlevalue");
const bundleCheckboxes = document.querySelectorAll(".dropdown-equipment");

bundleCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const childCheckbox = checkbox.querySelector('input[type="checkbox"');
    if (childCheckbox.checked) {
      console.log("Checkbox checked!!");
      checkbox.classList.toggle("selected");
    }
  });
});

// Values to create property
let _uid = undefined;
let _propertytitle;
let _propertydescription;
let _price; // property pricereview
let _media = []; // Object 5 images
let _dates = {}; // Obj {from, to}
let _bundleinfo = {}; // Obj {price, equipments[] }
let _address = {}; // Obj {street,flatroom,city,state,postalcode,country,_lat,_long}
let _typeofspace;

// Review your listing
const reviewfieldsbtn = document.getElementById("reviewfields");
const titlereview = document.getElementById("titlereview");
const descriptionreview = document.getElementById("descriptionreview");
const addressreview = document.getElementById("addressreview");
// const tagsreview = document.getElementById("tagsreview");
const equipmentreview = document.getElementById("equipmentreview");
const dealsreview = document.getElementById("dealsreview");
const dealdaysvalue = document.getElementById("dealdaysvalue");
const dealpricevalue = document.getElementById("dealpricevalue");
const availabilityreview = document.getElementById("availabilityreview");
const pricereview = document.getElementById("pricereview");
const pricevalue = document.getElementById("pricevalue");
const datepicker = document.getElementById("datepicker");
const photolistmyspace = document.getElementById("photolistmyspace");
const amenitiesreview = document.getElementById("amenitiesreview");

// Equipment Description
const cellingflashdesc = document.getElementById("cellingflashdesc");
const floorflashdesc = document.getElementById("floorflashdesc");

// Validation dates and price
const nextpage10to11 = document.getElementById("nextpage10to11");
nextpage10to11.addEventListener("click", () => {
  if (pricevalue.value == 0) {
    alert("Please enter your space price");
  } else if (!datepicker.value) {
    alert("Please select a range of dates");
  } else {
    window.location.href = "/list-my-space.html#page11";
  }
});
let carouselImages = document.querySelectorAll(".wrap-img-page12 .imgCar");
// Review info and setting values to create a property

reviewfieldsbtn.addEventListener("click", () => {
  const carouselSlide = document.querySelector(".wrap-img-page12");
  carouselImages = document.querySelectorAll(".wrap-img-page12 .imgCar");
  if (!camera) {
    console.log("Number of Files: ", files.length);
  } else {
    carouselSlide.innerHTML = `<img
    src="${photoList}"
    id="photolistmyspace"
    alt="Space"
    width="100%"
    height="100%"
  />`;
    // photolistmyspace.src = photoList;
    _media.push(urlString[0]);
  }

  titlereview.value = propertytitle.value;
  descriptionreview.value = propertydescription.value;
  addressreview.value =
    street.value +
    " " +
    flatroom.value +
    " " +
    city.value +
    " " +
    state.value +
    " " +
    postalcode.value +
    " " +
    country.value;

  let amenitiestext = "";

  if (_washroom) {
    amenitiestext += "Washroom, ";
  }
  if (_wifi) {
    amenitiestext += "WiFi, ";
  }
  if (_elevator) {
    amenitiestext += "Elevator, ";
  }
  if (_parking) {
    amenitiestext += "Parking, ";
  }
  if (_airconditioner) {
    amenitiestext += "Air Conditioner.";
  }

  amenitiesreview.value = amenitiestext;

  let equipmenttext = "";

  if (_equipments[0].price > 0) {
    equipmenttext += `Camera for ${_equipments[0].price}\n`;
  }
  if (_equipments[1].price > 0) {
    equipmenttext += `Lens for ${_equipments[1].price}\n`;
  }
  if (_equipments[2].price > 0) {
    equipmenttext += `Backdrop for ${_equipments[2].price}\n`;
  }
  if (_equipments[3].price > 0) {
    equipmenttext += `Flash Lights for ${_equipments[3].price}\n`;
  }
  if (_equipments[4].price > 0) {
    equipmenttext += `Tripods for ${_equipments[4].price}\n`;
  }

  equipmentreview.value = equipmenttext;
  availabilityreview.value = datepicker.value;
  pricereview.value = `$ ${pricevalue.value} per day`;

  let _dealtext = "";

  if (cameracheckboxvalue.checked) {
    _dealtext += "Camera \n";
    console.log("CHecked Input!");
  }
  if (lenscheckboxvalue.checked) {
    _dealtext += "Lens \n";
  }
  if (backdropcheckboxvalue.checked) {
    _dealtext += "Back Drop \n";
  }
  if (flashlightcheckboxvalue.checked) {
    _dealtext += "Flash Light \n";
  }
  if (tripodscheckboxvalue.checked) {
    _dealtext += "Tripods.";
  }

  dealsreview.value = `$ ${bundlevalue.value} for ` + _dealtext;

  _propertytitle = propertytitle.value;
  _propertydescription = propertydescription.value;
  _price = pricevalue.value;
  _dates = datepicker.value;
  _bundleinfo = {
    price: bundlevalue.value,
    equipment: [_dealtext],
  };

  _address = {
    street: street.value,
    flatroom: flatroom.value,
    city: city.value,
    state: state.value,
    postalcode: postalcode.value,
    country: country.value,
    lat: _lat, //"49.2577143", //_lat.value,
    long: _long, //"-123.1939433",
  }; //_long.value};

  if (_indoor) _typeofspace = "photography-type-indoor";
  else if (_outdoor) _typeofspace = "photography-type-outdoor";
  else if (_studio) _typeofspace = "photography-type-studio";
  else if (_house) _typeofspace = "photography-type-house";
  else if (_beach) _typeofspace = "photography-type-beach-house";
  else if (_others) _typeofspace = "photography-type-cottage";

  // _uid = localStorage.getItem("uid");

  // _media.push(urlString);

  // if (!camera) {
  //   // container.innerHTML = containerSelectedImg.innerHTML;
  //   console.log("Number of Files: ", files.length);
  // } else {
  //   photolistmyspace.src = photoList;
  //   _media.push(urlString[0]);
  // }
});
// Image Container
const carouselSlide = document.querySelector(".wrap-img-page12");
const leftBtn = document.querySelector(".selectorImg.left");
const rightBtn = document.querySelector(".selectorImg.right");
rightBtn.addEventListener("click", (e) => {
  if (!camera) {
    rightslide(carouselSlide, carouselImages);
  }
});

leftBtn.addEventListener("click", (e) => {
  if (!camera) {
    leftslide(carouselSlide, carouselImages);
  }
});

window.addEventListener("resize", () => {
  let x = window.matchMedia("(min-width: 891px)");
  if (x.matches) {
    carouselSlide.style.transform = "translateX(0)";
  } else {
    carouselSlide.style.transition = "none";
    let size = carouselImages[0].clientWidth;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

// Select featured image!
// let featureImageNum;
// const imageContainerSelected = document.querySelector(".wrap-img-page12");

// imageContainerSelected.addEventListener("click", (e) => {
//   console.log(e.target);
//   e.target.classList.toggle("selectImage");
//   featureImageNum = Array.from(imageContainerSelected.children).indexOf(
//     e.target
//   );
//   console.log(featureImageNum);
// });

// Create a property function
let propertyInfo;
const createPropertybtn = document.getElementById("createPropertybtn");
createPropertybtn.addEventListener("click", async (event) => {
  console.log("Files: ", files);

  if (!camera) {
    const urlStringArray = await uploadFiles2(files);
    _media = [...urlStringArray];
  }

  async function property() {
    _uid = await userState();
    // Return the array as a Promise
    console.log("Inside Property Now");
    propertyInfo = await createProperty(
      _uid, //string
      _activity,
      _propertytitle,
      _propertydescription,
      _price, // property pricereview
      _media, // Object 5 images
      _dates, // Obj {from, to}
      _bundleinfo, // Obj {price, equipments[] }
      _address, // Obj {street,flatroom,city,state,postalcode,country,_lat,_long}
      _typeofspace,
      _amenities, // Amenities[]
      _equipments // Equip[{tagname, desc, price},{},{} ]
    );

    // Add Property Info to Neo4j
    // Use _lat and _long values, also _activity
    const coordinates = {
      lat: _address.lat || 49.2244201,
      long: _address.long || -123.1110692,
    };
    await addPlace(
      propertyInfo,
      _price,
      _propertytitle,
      _uid,
      _typeofspace,
      _amenities,
      _equipments,
      _activity,
      coordinates
    );
    // Post Image Collection with propertyId
    // await SaveURLtoFirestore(urlString, propertyInfo);
  }
  await property();
  window.location.href = `${window.location.origin}/list-my-space.html#page13`;
});

// Page 13 Buttons
const btnListings = document.getElementById("myListings");
const btnhomeBtn = document.getElementById("homeBtn");

btnhomeBtn.addEventListener(
  "click",
  () => (window.location.href = window.origin)
);

btnListings.addEventListener(
  "click",
  () => (window.location.href = window.origin)
);
