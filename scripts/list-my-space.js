// console.log('works')
import "/styles/list-my-space.css";
import { createProperty } from "/query/propertycreate.js";
import { equipmentFormParser } from "../utility/equipmentFormParser.js";
import { input, UploadProcess, urlString, cameraUpload } from "../utility/pictures-api";
// import { userId } from "../utility/getuserid.js";
import { SaveURLtoFirestore } from "/query/imagecreate.js";
import { addPlace } from "../query/neo4jQueries.js"
import QuantityInput from "../utility/quantity.js";
import { easepick } from "@easepick/bundle";
import { RangePlugin } from "@easepick/range-plugin";

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

window.addEventListener("hashchange", navigateToPage);

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
        async function test(){
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
          console.log(blob);
          file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          // console.log(file);
        }

        test();
        randomNumber = Math.floor(Math.random() * 100) + 1;
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
} else {
  console.error("Camera not supported by this browser");
};

// Uploading Pictures
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");
const upvideobtn = document.getElementById('upvideobtn');

SelBtn.onclick = function () {
  input.click();
};

UpBtn.addEventListener("click", () => {
  UploadProcess();
  photoList = urlString;
  console.log(photoList);
  console.log(urlString);
});

upvideobtn.addEventListener("click", () => {
  cameraUpload(file,randomNumber);
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

const amenitiesWrapper = document.querySelectorAll(".div-amenities-buttons button");
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

washroombtn.addEventListener("click", () => {
  // Turn it on
  if (washroombtn.classList.contains("selected")) {
    washroombtn.classList.remove("selected");
    _washroom = false;
  } else {
    washroombtn.classList.add("selected");
    _washroom = true;
  }
});

// kitchenbtn.addEventListener('click', () => {
//   // Turn it on
//   if (kitchenbtn.classList.contains("selected")) {
//     kitchenbtn.classList.remove("selected");
//     _kitchen = false;
//   } else {
//     kitchenbtn.classList.add("selected");
//     _kitchen = true;
//   }
// })

// naturalbtn.addEventListener('click', () => {
//   // Turn it on
//   if (naturalbtn.classList.contains("selected")) {
//     naturalbtn.classList.remove("selected");
//     _natural = false;
//   } else {
//     naturalbtn.classList.add("selected");
//     _natural = true;
//   }
// })

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

// Equipment
let _light;
let _lightshapers;
let _camerastand;
let _camera;
let _lens;
let _otherequipment;
let _equipments = []; // Equip[{tagname, desc, price},{},{} ]

const equipmentWrapper = document.getElementById("equipmentnextbutton");
console.log(equipmentWrapper);
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

// Select price and date
const picker = new easepick.create({
  element: document.getElementById("datepicker"),
  css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"],
  // css: [
  //   'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
  //   'https://easepick.com/css/customize_sample.css',
  // ],
  plugins: [RangePlugin],
  RangePlugin: {
    tooltipNumber(num) {
      return num - 1;
    },
    locale: {
      one: "night",
      other: "nights",
    },
  },
});

// Bundles values
const cameracheckboxvalue = document.getElementById("cameracheckboxvalue");
const lenscheckboxvalue = document.getElementById("lenscheckboxvalue");
const backdropcheckboxvalue = document.getElementById("backdropcheckboxvalue");
const flashlightcheckboxvalue = document.getElementById("flashlightcheckboxvalue");
const tripodscheckboxvalue = document.getElementById("tripodscheckboxvalue");
const bundlevalue = document.getElementById("bundlevalue");

// Values to create property
let _uid;
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
const tagsreview = document.getElementById("tagsreview");
const equipmentreview = document.getElementById("equipmentreview");
const dealsreview = document.getElementById("dealsreview");
const dealdaysvalue = document.getElementById("dealdaysvalue");
const dealpricevalue = document.getElementById("dealpricevalue");
const availabilityreview = document.getElementById("availabilityreview");
const pricereview = document.getElementById("pricereview");
const pricevalue = document.getElementById("pricevalue");
const datepicker = document.getElementById("datepicker");
const photolistmyspace = document.getElementById('photolistmyspace');

// Equipment Description
const cellingflashdesc = document.getElementById("cellingflashdesc");
const floorflashdesc = document.getElementById("floorflashdesc");

// Review info and setting values to create a property
reviewfieldsbtn.addEventListener("click", () => {
  titlereview.value = propertytitle.value;
  descriptionreview.value = propertydescription.value;
  addressreview.value = street.value +
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

  tagsreview.value = _foodphotography ? "Food Photography " : "" + 
                      _commercial ? "Food Photography " : "" +
                      _fashion ? "Fashion ": "" + 
                      _portrait ? "Portrait ": "" + 
                      _lifestyle ? "Lifestyle " : "" + 
                      _newborn ? "Newborn " : "" + 
                      _wedding ? "Wedding " : "";

  equipmentreview.value = _light ? "Light ": "" + 
                          _lightshapers ? "Light Shapers " : "" + 
                          _camerastand ? "Camera Stand " : "" + 
                          _camera ? "Camera " : "" + 
                          _lens ? "Lens " : "" + 
                          _otherequipment ? "Other equipment ": "";

  _propertytitle = propertytitle.value;
  _propertydescription = propertydescription.value;
  _price = pricevalue.value;
  _dates = datepicker.value;
  _bundleinfo = {price: bundlevalue.value,
                equipment: [cameracheckboxvalue.checked ? "Camera" : "",
                            lenscheckboxvalue.checked ? "Lens" : "",
                            backdropcheckboxvalue.checked ? "Back Drop" : "",
                            flashlightcheckboxvalue.checked ? "Flash Light" : "",
                            tripodscheckboxvalue.checked ? "Tripods" : ""]};
  _address = {street: street.value,
              flatroom: flatroom.value,
              city: city.value,
              state: state.value,
              postalcode: postalcode.value,
              country: country.value,
              lat: "49.2577143", //_lat.value,
              long: "-123.1939433",}; //_long.value};

  if (_indoor) 
    _typeofspace = "photography-type-indoor";
  else if (_outdoor) 
    _typeofspace = "photography-type-outdoor";
  else if (_studio) 
    _typeofspace = "photography-type-studio";
  else if (_house) 
    _typeofspace = "photography-type-house";
  else if (_beach) 
    _typeofspace = "photography-type-beach-house";
  else if (_others) 
    _typeofspace = "photography-type-cottage";

  _uid = localStorage.getItem("uid");
  _media.push(urlString);
  photolistmyspace.src = photoList;
});

// Create a property function
let propertyInfo;
const createPropertybtn = document.getElementById("createPropertybtn");
createPropertybtn.addEventListener("click", async function (event) {
  // console.log("button");
  // event.preventDefault();
  // Validate values
  // console.log(_uid); //string
  // console.log(_propertytitle);
  // console.log(_propertydescription);
  // console.log(_price); // property pricereview
  // console.log(_media); // Object 5 images
  // console.log(_dates); // Obj {from, to}
  // console.log(_bundleinfo); // Obj {price, equipments[] }
  // console.log(_address); // Obj {street,flatroom,city,state,postalcode,country,_lat,_long}
  // console.log(_typeofspace);
  // console.log(_amenities); // Amenities[]
  // console.log(_equipments);

  propertyInfo = await createProperty(//'4BTWTvRfqDEQ7vXdrIxA', //uid
                                        _uid, //string
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

    // alert(`Property created successfully ${propertyInfo}`);
    // Post Image Collection with propertyId
    await SaveURLtoFirestore(urlString,propertyInfo);

    // Add Property Info to Neo4j
    await addPlace(propertyInfo, _propertytitle, _uid, _typeofspace, _amenities, _equipments, "photography")

    // Take user back to home page after all Database Functions
    window.location.href = window.location.origin;
});
