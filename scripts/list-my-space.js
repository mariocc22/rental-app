// console.log('works')
import '/styles/list-my-space.css';
import { createProperty } from '/query/propertycreate.js'
import {
  input,
  UploadProcess,
  GetImagefromFirestore,
  downloadURL,
} from "../utility/pictures-api";
import { SaveURLtoFirestore } from '/query/imagecreate.js';

const allPages = document.querySelectorAll("div.page");
allPages[0].style.display = "block";

function navigateToPage(event) {
  const pageId = location.hash ? location.hash : "#page1";
  for (let page of allPages) {
    if (pageId === "#" + page.id) {
      page.style.display = "block";
    } else {
      page.style.display = "none";
    }
  }
  return;
}
navigateToPage();

//init handler for hash navigation
window.addEventListener('hashchange', navigateToPage);


// What kind of space do you offer
let indoor;
let outdoor;
let house;
let studio;
let other;

const indoorButtonPressed = document.getElementById('indoorButton');
const outdoorButton = document.getElementById('outdoorButton');
const houseButton = document.getElementById('houseButton');
const studioButton = document.getElementById('studioButton');
const otherButton = document.getElementById('otherButton');

indoorButtonPressed.addEventListener('click', () => {
  // Other button turn it off
  if (outdoorButton.classList.contains("selected") ||
    houseButton.classList.contains("selected") ||
    studioButton.classList.contains("selected") ||
    otherButton.classList.contains("selected")) {
      outdoorButton.classList.remove("selected");
      houseButton.classList.remove("selected");
      studioButton.classList.remove("selected");
      otherButton.classList.remove("selected");
  }

  // Turn it on
  if (indoorButtonPressed.classList.contains("selected")) {
    indoorButtonPressed.classList.remove("selected");
  } else {
    indoorButtonPressed.classList.add("selected");
  }

  indoor = true;
  outdoor = false;
  house = false;
  studio = false;
  other = false;
})

outdoorButton.addEventListener('click', () => {
  // Other button turn it off
  if (indoorButtonPressed.classList.contains("selected") ||
    houseButton.classList.contains("selected") ||
    studioButton.classList.contains("selected") ||
    otherButton.classList.contains("selected")) {
      indoorButtonPressed.classList.remove("selected");
      houseButton.classList.remove("selected");
      studioButton.classList.remove("selected");
      otherButton.classList.remove("selected");
  }

  // Turn it on
  if (outdoorButton.classList.contains("selected")) {
    outdoorButton.classList.remove("selected");
  } else {
    outdoorButton.classList.add("selected");
  }

  indoor = false;
  outdoor = true;
  house = false;
  studio = false;
  other = false;
})

houseButton.addEventListener('click', () => {
  // Other button turn it off
  if (indoorButtonPressed.classList.contains("selected") ||
    outdoorButton.classList.contains("selected") ||
    studioButton.classList.contains("selected") ||
    otherButton.classList.contains("selected")) {
      indoorButtonPressed.classList.remove("selected");
      outdoorButton.classList.remove("selected");
      studioButton.classList.remove("selected");
      otherButton.classList.remove("selected");
  }

  // Turn it on
  if (houseButton.classList.contains("selected")) {
    houseButton.classList.remove("selected");
  } else {
    houseButton.classList.add("selected");
  }

  indoor = false;
  outdoor = false;
  house = true;
  studio = false;
  other = false;
})

studioButton.addEventListener('click', () => {
  // Other button turn it off
  if (indoorButtonPressed.classList.contains("selected") ||
    outdoorButton.classList.contains("selected") ||
    houseButton.classList.contains("selected") ||
    otherButton.classList.contains("selected")) {
      indoorButtonPressed.classList.remove("selected");
      outdoorButton.classList.remove("selected");
      houseButton.classList.remove("selected");
      otherButton.classList.remove("selected");
  }

  // Turn it on
  if (studioButton.classList.contains("selected")) {
    studioButton.classList.remove("selected");
  } else {
    studioButton.classList.add("selected");
  }

  indoor = false;
  outdoor = false;
  house = false;
  studio = true;
  other = false;
})

otherButton.addEventListener('click', () => {
  // Other button turn it off
  if (indoorButtonPressed.classList.contains("selected") ||
    outdoorButton.classList.contains("selected") ||
    houseButton.classList.contains("selected") ||
    studioButton.classList.contains("selected")) {
      indoorButtonPressed.classList.remove("selected");
      outdoorButton.classList.remove("selected");
      houseButton.classList.remove("selected");
      studioButton.classList.remove("selected");
  }

  // Turn it on
  if (otherButton.classList.contains("selected")) {
    otherButton.classList.remove("selected");
  } else {
    otherButton.classList.add("selected");
  }

  indoor = false;
  outdoor = false;
  house = false;
  studio = false;
  other = true;
})

// Camera functionality
const captureButton = document.getElementById('capture-btn');
const previewImage = document.getElementById('picture-preview');
const video = document.getElementById('video');
previewImage.style.display = 'none';

// Check if the browser supports the camera API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Set up the camera stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Attach the camera stream to the video element
      video.srcObject = stream;
      video.play();

      // Capture the picture when the button is clicked
      captureButton.addEventListener('click', () => {
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL and display it in the preview element
        previewImage.src = canvas.toDataURL('image/png');
        console.log(previewImage.src);
        previewImage.style.display = 'block';
      });
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
    });
} else {
  console.error('Camera not supported by this browser');
}

// Getting values from UI
// const _uid = 
const street = document.getElementById("street");
const flatroom = document.getElementById("flatroom");
const city = document.getElementById("city");
const state = document.getElementById("state");
const postalcode = document.getElementById("postalcode");
const country = document.getElementById("country");
const propertytitle = document.getElementById("propertytitle");
const propertydescription = document.getElementById("propertydescription");


// Test create a property
let propertyInfo;
const createPropertybtn = document.getElementById("createPropertybtn");
createPropertybtn.addEventListener('click', async function (event) {
  console.log('button');
  event.preventDefault();
  let _media = [];
  propertyInfo = await createProperty('4BTWTvRfqDEQ7vXdrIxA', //uid
                                    street.value,
                                    flatroom.value,
                                    city.value,
                                    state.value,
                                    postalcode.value,
                                    country.value,
                                    propertytitle.value,
                                    propertydescription.value,
                                    // _media, //aray
                                    1, //number
                                    2, //number
                                    3, //number
                                    4, //number
                                    5, //number
                                    //_tags, // object
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true,
                                    true
                                    );

    console.log(propertyInfo);

    // Post Image Collection with propertyId
    await SaveURLtoFirestore(downloadURL,propertyInfo);
})

// const submitbutton = document.getElementById("save");
// console.log('a');
// submitbutton.addEventListener("click", async function (event) {
//     console.log('b');
//     event.preventDefault();
//     let variable = await propertyFuncion("4BTWTvRfqDEQ7vXdrIxA");
//     console.log(variable);
//     //console.log(properties);
//     console.log('c');
// })

// function toggleSelection() {
//   var button = document.getElementsByClassName("button")
//   // .getElementById("myButton");
//   if (button.classList.contains("selected")) {
//     button.classList.remove("selected");
//   } else {
//     button.classList.add("selected");
//   }
// }

// function selectOption(option) {
//   // do something with selected option
//   console.log(option + " selected");
// }

// Uploading Pictures
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");

SelBtn.onclick = function () {
  input.click();
};

UpBtn.onclick = UploadProcess;
// DownBtn.onclick = GetImagefromFirestore;

