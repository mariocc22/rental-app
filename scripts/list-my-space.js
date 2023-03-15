// console.log('works')
import "/styles/list-my-space.css";
import "/styles/standard-styles.css";
import "../node_modules/leaflet/dist/leaflet.css";
import "/styles/common-styles.css";
import { createProperty } from "/query/propertycreate.js";
import { equipmentFormParser } from "../utility/equipmentFormParser.js";
import {
  input,
  UploadProcess,
  urlString,
  cameraUpload,
  uploadAllFiles,
} from "../utility/pictures-api";
// import { userId } from "../utility/getuserid.js";
import { SaveURLtoFirestore } from "/query/imagecreate.js";
import { addPlace } from "../query/neo4jQueries.js";
import QuantityInput from "../utility/quantity.js";
// import { easepick } from "@easepick/bundle";
// import { RangePlugin } from "@easepick/range-plugin";
import { calendarBook } from "../utility/datePicker.js";
import * as L from "../node_modules/leaflet/dist/leaflet.js";

// Geolocation
import { whereAmI, getPosition } from "../modules/geolocation.js";

const allPages = document.querySelectorAll("div.page");
allPages[0].style.display = "block";

function navigateToPage(event) {
  let pagecontinue = true;
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


// Address
const addressvalidation = document.getElementById("addressvalidation");
addressvalidation.addEventListener("click", (e) =>{

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
      }
      else if (city == "") {
        alert("City must be filled out");
        return false;
      }
      else if (state == "") {
        alert("State must be filled out");
        return false;
      }
      else if (postalcode == "") {
        alert("Postal Code must be filled out");
        return false;
      }
      else if (country == "") {
        alert("Country Code must be filled out");
        return false;
      }
      else{
        return true;
      }
    } 
    validatepage = validateForm();
    console.log(validatepage);
    if(validatepage){
      e.preventDefault();
      window.location.href = 'http://localhost:3000/list-my-space.html#page4';
    }
    else{
      e.preventDefault();
      window.location.href = 'http://localhost:3000/list-my-space.html#page3';
    }
})



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
        const closeimg = document.getElementById("closeimg");

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
        });
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
} else {
  console.error("Camera not supported by this browser");
}

// Uploading Pictures
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");
const upvideobtn = document.getElementById("upvideobtn");
const addphoto = document.getElementById("addphoto");
const nextcamera = document.getElementById("nextcamera");
const nextvideo = document.getElementById("nextvideo");
const takephoto = document.getElementById("takephoto");

takephoto.addEventListener("click", () => {
  nextvideo.style.visibility = "hidden";
});

addphoto.addEventListener("click", () => {
  UpBtn.classList.add("hide");
  nextcamera.style.visibility = "hidden";
  SelBtn.classList.remove("hide");
});

SelBtn.onclick = function () {
  input.click();
  UpBtn.classList.remove("hide");
  SelBtn.classList.add("hide");
};

let fromImage = false;

UpBtn.addEventListener("click", () => {
  // UploadProcess();
  camera = false;
  uploadAllFiles(featureImageNum);
  fromImage = true;
  UpBtn.classList.add("hide");
  nextcamera.style.visibility = "visible";
});

upvideobtn.addEventListener("click", () => {
  camera = true;
  cameraUpload(file, randomNumber);
  nextvideo.style.visibility = "visible";
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
  if ( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition(( position ) => { // success callback is called w. GeoLocationPosition
      console.log( "latitude = " + position.coords.latitude );
      console.log( "longitude = " + position.coords.longitude );
      _lat = position.coords.latitude;// test2.latt;
      _long = position.coords.longitude;//test2.longt;
      // console.log(_lat);
      // console.log(_long);

      // Map
      const _map = document.getElementById("map");
      let map = L.map(_map, {
        renderer: L.canvas(),
      }).setView([_lat, _long], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        maxZoom: 21,
        zoomSnap: 0.25,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      let marker = L.marker([_lat, _long]).addTo(map);
      marker.bindPopup("<h3> I'm here! </h3>").openPopup();

      //LOCATION IQ API
      var xhr = new XMLHttpRequest();
      // var _url = $(`https://us1.locationiq.com/v1/search?key=pk.bacaddd84141d8123622e2937d0b47b0&q=221b%2C%20Baker%20St%2C%20London%20&format=json`);
      // var _url = `https://us1.locationiq.com/v1/search?key=pk.bacaddd84141d8123622e2937d0b47b0&lat=${_lat}&lon=${_long}&format=json`;
      // var _url = `https://us1.locationiq.com/v1/reverse?key=pk.bacaddd84141d8123622e2937d0b47b0&lat=49.2244201&lon=-123.1110692&format=json`;
      var _url = `https://us1.locationiq.com/v1/reverse?key=pk.bacaddd84141d8123622e2937d0b47b0&lat=${_lat}&lon=${_long}&format=json`;
      console.log(_url);
      const userAction = async () => {
        const response = await fetch(_url);
        const myJson = await response.json(); //extract JSON from the http response
        console.log(myJson);

        street.value = myJson.address.road;
        city.value = myJson.address.city;//response.address.city;//dataGeo.city;
        state.value = myJson.address.state;
        postalcode.value = myJson.address.postcode;
        country.value = myJson.address.country;
      }

      userAction();

      /*xhr.open('GET', _url, true);
      xhr.send();
      xhr.onreadystatechange = processRequest;
      xhr.addEventListener("readystatechange", processRequest, false);
      var response = JSON.parse(xhr.responseText);
      console.log(response);

      function processRequest(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
              var response = JSON.parse(xhr.responseText);
              var city = response.address.city;
              console.log(city);

              // street.value = dataGeo.staddress;
              city.value = response.address.city;//dataGeo.city;
              // state.value = dataGeo.state;
              // postalcode.value = dataGeo.postalcode;
              // country.value = dataGeo.country;
              return;
          }
      }*/

      // function getCoordintes() {
      //     var options = {
      //         enableHighAccuracy: true,
      //         timeout: 5000,
      //         maximumAge: 0
      //     };
        
      //     function success(pos) {
      //         var crd = pos.coords;
      //         var lat = crd.latitude.toString();
      //         var lng = crd.longitude.toString();
      //         var coordinates = [lat, lng];
      //         console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      //         getCity(coordinates);
      //         return;
        
      //     }
        
      //     function error(err) {
      //         console.warn(`ERROR(${err.code}): ${err.message}`);
      //     }
        
      //     navigator.geolocation.getCurrentPosition(success, error, options);
      // }
      


      // function getCity(coordinates) {
      //   var xhr = new XMLHttpRequest();
      //   var lat = coordinates[0];
      //   var lng = coordinates[1];
      
      //   // Paste your LocationIQ token below. pk.bacaddd84141d8123622e2937d0b47b0
      //   xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=bacaddd84141d8123622e2937d0b47b0&lat=" +
      //     lat + "&lon=" + long + "&format=json", true);
      //     xhr.send();
      //     xhr.onreadystatechange = processRequest;
      //     xhr.addEventListener("readystatechange", processRequest, false);
          
      //     function processRequest(e) {
      //         if (xhr.readyState == 4 && xhr.status == 200) {
      //             var response = JSON.parse(xhr.responseText);
      //             var city = response.address.city;
      //             console.log(city);

      //             // street.value = dataGeo.staddress;
      //             city.value = response.address.city;//dataGeo.city;
      //             // state.value = dataGeo.state;
      //             // postalcode.value = dataGeo.postalcode;
      //             // country.value = dataGeo.country;
      //             return;
      //         }
      //     }
      // }
      // getCoordintes();

      // GEOCODE API
      // setTimeout(async () => {
      //   const resGeo = await fetch(`https://geocode.xyz/${_lat},${_long}?geoit=json`);
      //   // === Handle errors
      //   if (!resGeo.ok) {
      //     alert('Was no possible to get your current address, please enter data manually')
      //     // throw new Error("Problem getting the location data");
      //   }
      //   else{
      //     const dataGeo = await resGeo.json();
      //     if(dataGeo){
      //       street.value = dataGeo.staddress;
      //       city.value = dataGeo.city;
      //       state.value = dataGeo.state;
      //       // postalcode.value = dataGeo.postalcode;
      //       country.value = dataGeo.country;
      //     }
      //     console.log("Current location!", dataGeo);
      //   }
      // }, 4000);

    },( error ) => { // failure callback is called w. error object
        console.log( error );
        if ( error.code == error.PERMISSION_DENIED ) {
        window.alert( "geolocation permission denied" );
        }
      });
    } else { // no geolocation in navigator. in case running in an old browser
      console.log( "Geolocation is not supported by this browser." );
    }
    
    // setTimeout(async () => {
    // const resGeo = await fetch(`https://geocode.xyz/${_lat},${_long}?geoit=json`);
    // // === Handle errors
    // if (!resGeo.ok) {
    //   throw new Error("Problem getting the location data");
    // }
    // const dataGeo = await resGeo.json();
    // console.log("Current location!", dataGeo);
    // }, 4000);

  // setTimeout(() => {
    // console.log(test2);
    // street.value = test2.staddress;
    // city.value = test2.city;
    // state.value = test2.state;
    // postalcode.value = test2.city;
    // country.value = test2.country;
    // _lat = position.coords.latitude;// test2.latt;
    // _long = position.coords.longitude;//test2.longt;
    // console.log(_lat);
    // console.log(_long);
    // const _map = document.getElementById("map");

    // let map = L.map(_map, {
    //   renderer: L.canvas(),
    // }).setView([_lat, _long], 13);
    // L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    //   maxZoom: 21,
    //   zoomSnap: 0.25,
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);

    // let marker = L.marker([_lat, _long]).addTo(map);
    // marker.bindPopup("<h3> I'm here! </h3>").openPopup();
  // }, 4000);
  
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

// // Select price and date
// const picker = new easepick.create({
//   element: document.getElementById("datepicker"),
//   css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"],
//   plugins: [RangePlugin],
//   RangePlugin: {
//     tooltipNumber(num) {
//       return num - 1;
//     },
//     locale: {
//       one: "night",
//       other: "nights",
//     },
//   },
// });
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

// Review info and setting values to create a property
reviewfieldsbtn.addEventListener("click", () => {
  // console.log(propertytitle.value);
  // console.log(propertydescription.value);
  // console.log(street.value +
  //   " " +
  //   flatroom.value +
  //   " " +
  //   city.value +
  //   " " +
  //   state.value +
  //   " " +
  //   postalcode.value +
  //   " " +
  //   country.value);
  // console.log(_foodphotography
  //   ? "Food Photography "
  //   : "" + _commercial
  //   ? "Food Photography "
  //   : "" + _fashion
  //   ? "Fashion "
  //   : "" + _portrait
  //   ? "Portrait "
  //   : "" + _lifestyle
  //   ? "Lifestyle "
  //   : "" + _newborn
  //   ? "Newborn "
  //   : "" + _wedding
  //   ? "Wedding "
  //   : "");

  // console.log( _light
  //   ? "Light "
  //   : "" + _lightshapers
  //   ? "Light Shapers "
  //   : "" + _camerastand
  //   ? "Camera Stand "
  //   : "" + _camera
  //   ? "Camera "
  //   : "" + _lens
  //   ? "Lens "
  //   : "" + _otherequipment
  //   ? "Other equipment "
  //   : "");

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

  // tagsreview.value = _foodphotography
  //   ? "Food Photography "
  //   : "" + _commercial
  //   ? "Food Photography "
  //   : "" + _fashion
  //   ? "Fashion "
  //   : "" + _portrait
  //   ? "Portrait "
  //   : "" + _lifestyle
  //   ? "Lifestyle "
  //   : "" + _newborn
  //   ? "Newborn "
  //   : "" + _wedding
  //   ? "Wedding "
  //   : "";

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

  equipmentreview.value = equipmenttext; //_equipments;
  // _light
  //   ? "Light "
  //   : "" + _lightshapers
  //   ? "Light Shapers "
  //   : "" + _camerastand
  //   ? "Camera Stand "
  //   : "" + _camera
  //   ? "Camera "
  //   : "" + _lens
  //   ? "Lens "
  //   : "" + _otherequipment
  //   ? "Other equipment "
  //   : "";
  availabilityreview.value = datepicker.value;
  pricereview.value = `$ ${pricevalue.value} per day`;

  let _dealtext = "";

  if (cameracheckboxvalue.checked) {
    _dealtext += "Camera \n";
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

  _uid = localStorage.getItem("uid");
  // _media.push(urlString);

  if (!camera) {
    const container = document.querySelector(".wrap-img-page12");
    container.innerHTML = "";
    urlString.forEach((url) => {
      _media.push(url);
      const img = document.createElement("img");
      img.src = url;
      container.insertAdjacentElement("beforeend", img);
    });
  } else {
    photolistmyspace.src = photoList;
    _media.push(urlString[0]);
  }
});

// Select featured image!
let featureImageNum;
const imageContainerSelected = document.querySelector(".wrap-img-page12");

imageContainerSelected.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("selectImage");
  featureImageNum = Array.from(imageContainerSelected.children).indexOf(
    e.target
  );
  console.log(featureImageNum);
});

// Create a property function
let propertyInfo;
const createPropertybtn = document.getElementById("createPropertybtn");

createPropertybtn.addEventListener("click", async function (event) {
  if (_media.length !== 1) {
    console.log("before sorting array: ", _media);
    [_media[0], _media[featureImageNum]] = [_media[featureImageNum], _media[0]];
    console.log("AFTER sorting array: ", _media);
  }

  console.log(_media);

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

  // alert(`Property created successfully ${propertyInfo}`);
  // Post Image Collection with propertyId
  await SaveURLtoFirestore(urlString, propertyInfo);

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

  // Take user back to home page after all Database Functions
  window.location.href = window.location.origin;
});
