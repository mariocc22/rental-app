// console.log('works')
import "/styles/list-my-space.css";
import { createProperty } from "/query/propertycreate.js";
import {
  input, UploadProcess, urlString
} from "../utility/pictures-api";

import { SaveURLtoFirestore } from '/query/imagecreate.js';
import QuantityInput from '../utility/quantity.js';
import { easepick } from '@easepick/bundle';
import { RangePlugin } from '@easepick/range-plugin';

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
let _indoor;
let _outdoor;
let _house;
let _studio;
let _others;
let _beach;

const indoorButtonPressed = document.getElementById('indoorButton');
const outdoorButton = document.getElementById('outdoorButton');
const houseButton = document.getElementById('houseButton');
const studioButton = document.getElementById('studioButton');
const otherButton = document.getElementById('otherButton');
const beachButton = document.getElementById('beachButton');

indoorButtonPressed.addEventListener('click', () => {
  // Turn it on
  if (indoorButtonPressed.classList.contains("selected")) {
    indoorButtonPressed.classList.remove("selected");
    _indoor = false;
  } else {
    indoorButtonPressed.classList.add("selected");
    _indoor = true;
  }  
})

outdoorButton.addEventListener('click', () => {

  // Turn it on
  if (outdoorButton.classList.contains("selected")) {
    outdoorButton.classList.remove("selected");
    _outdoor = false;
  } else {
    outdoorButton.classList.add("selected");
    _outdoor = true;
  }
})

houseButton.addEventListener('click', () => {
  // Turn it on
  if (houseButton.classList.contains("selected")) {
    houseButton.classList.remove("selected");
    _house = false;
  } else {
    houseButton.classList.add("selected");
    _house = true;
  }
})

studioButton.addEventListener('click', () => {
  // Turn it on
  if (studioButton.classList.contains("selected")) {
    studioButton.classList.remove("selected");
    _studio = false;
  } else {
    studioButton.classList.add("selected");
    _studio = true;
  }
})

otherButton.addEventListener('click', () => {
  // Turn it on
  if (otherButton.classList.contains("selected")) {
    otherButton.classList.remove("selected");
    _others = false;
  } else {
    otherButton.classList.add("selected");
    _others = true;
  }
})

beachButton.addEventListener('click', () => {
  // Turn it on
  if (beachButton.classList.contains("selected")) {
    beachButton.classList.remove("selected");
    beach = false;
  } else {
    beachButton.classList.add("selected");
    beach = true;
  }
})

// Camera functionality
const captureButton = document.getElementById("capture-btn");
const previewImage = document.getElementById("picture-preview");
const video = document.getElementById("video");
previewImage.style.display = "none";

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
        console.log(previewImage.src);
        previewImage.style.display = "block";
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
} else {
  console.error("Camera not supported by this browser");
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

// Tags
let _foodphotography;
let _commercial;
let _fashion;
let _portrait;
let _lifestyle;
let _newborn;
let _wedding;

const foodPhotoButton = document.getElementById('foodPhotographybtn');
const commercialButton = document.getElementById('commercialbtn');
const fashionButton = document.getElementById('fashionbtn');
const portraitButton = document.getElementById('portraitbtn');
const lifestyleButton = document.getElementById('lifestylebtn');
const newbornButton = document.getElementById('newbornbtn');
const weddingButton = document.getElementById('weddingbtn');

foodPhotoButton.addEventListener('click', () => {
  // Turn it on
  if (foodPhotoButton.classList.contains("selected")) {
    foodPhotoButton.classList.remove("selected");
    _foodphotography = false;
  } else {
    foodPhotoButton.classList.add("selected");
    _foodphotography = true;
  }  
})

commercialButton.addEventListener('click', () => {
  // Turn it on
  if (commercialButton.classList.contains("selected")) {
    commercialButton.classList.remove("selected");
    _commercial = false;
  } else {
    commercialButton.classList.add("selected");
    _commercial = true;
  }  
})

fashionButton.addEventListener('click', () => {
  // Turn it on
  if (fashionButton.classList.contains("selected")) {
    fashionButton.classList.remove("selected");
    _fashion = false;
  } else {
    fashionButton.classList.add("selected");
    _fashion = true;
  }  
})

portraitButton.addEventListener('click', () => {
  // Turn it on
  if (portraitButton.classList.contains("selected")) {
    portraitButton.classList.remove("selected");
    _portrait = false;
  } else {
    portraitButton.classList.add("selected");
    _portrait = true;
  }  
})

lifestyleButton.addEventListener('click', () => {
  // Turn it on
  if (lifestyleButton.classList.contains("selected")) {
    lifestyleButton.classList.remove("selected");
    _lifestyle = false;
  } else {
    lifestyleButton.classList.add("selected");
    _lifestyle = true;
  }  
})

newbornButton.addEventListener('click', () => {
  // Turn it on
  if (newbornButton.classList.contains("selected")) {
    newbornButton.classList.remove("selected");
    _newborn = false;
  } else {
    newbornButton.classList.add("selected");
    _newborn = true;
  }  
})

weddingButton.addEventListener('click', () => {
  // Turn it on
  if (weddingButton.classList.contains("selected")) {
    weddingButton.classList.remove("selected");
    _wedding = false;
  } else {
    weddingButton.classList.add("selected");
    _wedding = true;
  }  
})

// Amenities
let _washroom;
let _kitchen;
let _natural;
let _wifi;
let _elevator;
let _parking;
let _airconditioner;

const washroombtn = document.getElementById('washroombtn');
const kitchenbtn = document.getElementById('kitchenbtn');
const naturalbtn = document.getElementById('naturalbtn');
const wifibtn = document.getElementById('wifibtn');
const elevatorbtn = document.getElementById('elevatorbtn');
const parkingbtn = document.getElementById('parkingbtn');
const airconditionerbtn = document.getElementById('airconditionerbtn');

washroombtn.addEventListener('click', () => {
  // Turn it on
  if (washroombtn.classList.contains("selected")) {
    washroombtn.classList.remove("selected");
    _washroom = false;
  } else {
    washroombtn.classList.add("selected");
    _washroom = true;
  }  
})

kitchenbtn.addEventListener('click', () => {
  // Turn it on
  if (kitchenbtn.classList.contains("selected")) {
    kitchenbtn.classList.remove("selected");
    _kitchen = false;
  } else {
    kitchenbtn.classList.add("selected");
    _kitchen = true;
  }  
})

naturalbtn.addEventListener('click', () => {
  // Turn it on
  if (naturalbtn.classList.contains("selected")) {
    naturalbtn.classList.remove("selected");
    _natural = false;
  } else {
    naturalbtn.classList.add("selected");
    _natural = true;
  }  
})

wifibtn.addEventListener('click', () => {
  // Turn it on
  if (wifibtn.classList.contains("selected")) {
    wifibtn.classList.remove("selected");
    _wifi = false;
  } else {
    wifibtn.classList.add("selected");
    _wifi = true;
  }  
})

elevatorbtn.addEventListener('click', () => {
  // Turn it on
  if (elevatorbtn.classList.contains("selected")) {
    elevatorbtn.classList.remove("selected");
    _elevator = false;
  } else {
    elevatorbtn.classList.add("selected");
    _elevator = true;
  }  
})

parkingbtn.addEventListener('click', () => {
  // Turn it on
  if (parkingbtn.classList.contains("selected")) {
    parkingbtn.classList.remove("selected");
    _parking = false;
  } else {
    parkingbtn.classList.add("selected");
    _parking = true;
  }  
})

airconditionerbtn.addEventListener('click', () => {
  // Turn it on
  if (airconditionerbtn.classList.contains("selected")) {
    airconditionerbtn.classList.remove("selected");
    _airconditioner = false;
  } else {
    airconditionerbtn.classList.add("selected");
    _airconditioner = true;
  }  
})


// Equipment
let _light;
let _lightshapers;
let _camerastand;
let _camera;
let _lens;
let _otherequipment;

const lightbtn = document.getElementById('lightbtn');
const lightdiv = document.getElementById('lightdiv');
lightbtn.addEventListener('click', () => {
  lightdiv.classList.toggle('active');

  if (lightbtn.classList.contains("selected")) {
    lightbtn.classList.remove("selected");
    _light = false;
  } else {
    lightbtn.classList.add("selected");
    _light = true;
  }
});

const lightshapersbtn = document.getElementById('lightshapersbtn');
const lightshapersdiv = document.getElementById('lightshapersdiv');
lightshapersbtn.addEventListener('click', () => {
  lightshapersdiv.classList.toggle('active');

  if (lightshapersbtn.classList.contains("selected")) {
    lightshapersbtn.classList.remove("selected");
    _lightshapers = false;
  } else {
    lightshapersbtn.classList.add("selected");
    _lightshapers = true;
  }
});

const camerastandbtn = document.getElementById('camerastandbtn');
const camerastanddiv = document.getElementById('camerastanddiv');
camerastandbtn.addEventListener('click', () => {
  camerastanddiv.classList.toggle('active');

  if (camerastandbtn.classList.contains("selected")) {
    camerastandbtn.classList.remove("selected");
    _camerastand = false;
  } else {
    camerastandbtn.classList.add("selected");
    _camerastand = true;
  }
});

const camerabtn = document.getElementById('camerabtn');
const cameradiv = document.getElementById('cameradiv');
camerabtn.addEventListener('click', () => {
  cameradiv.classList.toggle('active');

  if (camerabtn.classList.contains("selected")) {
    camerabtn.classList.remove("selected");
    _camera = false;
  } else {
    camerabtn.classList.add("selected");
    _camera = true;
  }
});

const lensbtn = document.getElementById('lensbtn');
const lensdiv = document.getElementById('lensdiv');
lensbtn.addEventListener('click', () => {
  lensdiv.classList.toggle('active');

  if (lensbtn.classList.contains("selected")) {
    lensbtn.classList.remove("selected");
    _lens = false;
  } else {
    lensbtn.classList.add("selected");
    _lens = true;
  }
});

const othersbtn = document.getElementById('othersbtn');
const othersdiv = document.getElementById('othersdiv');
othersbtn.addEventListener('click', () => {
  othersdiv.classList.toggle('active');

  if (othersbtn.classList.contains("selected")) {
    othersbtn.classList.remove("selected");
    _otherequipment = false;
  } else {
    othersbtn.classList.add("selected");
    _otherequipment = true;
  }
});

// Set up quantity forms
(function(){
  let quantities = document.querySelectorAll('[data-quantity]');

  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach(div => (div.quantity = new QuantityInput(div, 'Down', 'Up')));
  }
})();

// Equipment inputs
const validateinputs = document.getElementById('validateinputs');
validateinputs.addEventListener('click', () => {
  // console.log('a');
  const ceilingflashinput = document.getElementById('ceilingflash');
  const cellingflashform = document.getElementById('cellingflashform');
  const cellingflashvalue = document.getElementById('cellingflashvalue');

  cellingflashvalue.value = ceilingflashinput.value;
  // console.log(cellingflashvalue.value)
  if(cellingflashvalue.value > 0 ){
    cellingflashform.classList.remove('active');
  }
  else{
    cellingflashform.classList.add('active');
  }

  const floorflashform = document.getElementById('floorflashform');
  const floorflashinput = document.getElementById('floorflash');  
  const floorflashvalue = document.getElementById('floorflashvalue');

  floorflashvalue.value = floorflashinput.value;
  if(floorflashvalue.value > 0 ){
    floorflashform.classList.remove('active');
  }
  else{
    floorflashform.classList.add('active');
  }
  
  const umbrellaform = document.getElementById('umbrellaform');
  const umbrellainput = document.getElementById('umbrella');  
  const umbrellavalue = document.getElementById('umbrellavalue');

  umbrellavalue.value = umbrellainput.value;
  if(umbrellavalue.value > 0 ){
    umbrellaform.classList.remove('active');
  }
  else{
    umbrellaform.classList.add('active');
  }

  const breautydishform = document.getElementById('breautydishform');
  const beautydishinput = document.getElementById('beautydish');  
  const breautydishvalue = document.getElementById('breautydishvalue');

  breautydishvalue.value = beautydishinput.value;
  if(breautydishvalue.value > 0 ){
    breautydishform.classList.remove('active');
  }
  else{
    breautydishform.classList.add('active');
  }

  const softboxform = document.getElementById('softboxform');
  const softboxinput = document.getElementById('softbox');  
  const softboxvalue = document.getElementById('softboxvalue');

  softboxvalue.value = softboxinput.value;
  if(softboxvalue.value > 0 ){
    softboxform.classList.remove('active');
  }
  else{
    softboxform.classList.add('active');
  }

  const lightboxform = document.getElementById('lightboxform');
  const lightboxinput = document.getElementById('lightbox');  
  const lightboxvalue = document.getElementById('lightboxvalue');

  lightboxvalue.value = lightboxinput.value;
  if(lightboxvalue.value > 0 ){
    lightboxform.classList.remove('active');
  }
  else{
    lightboxform.classList.add('active');
  }

  const tripodform = document.getElementById('tripodform');
  const tripodinput = document.getElementById('tripod');  
  const tripodvalue = document.getElementById('tripodvalue');

  tripodvalue.value = tripodinput.value;
  if(tripodvalue.value > 0 ){
    tripodform.classList.remove('active');
  }
  else{
    tripodform.classList.add('active');
  }

  const fullframeform = document.getElementById('fullframeform');
  const fullframeinput = document.getElementById('fullframe');  
  const fullframevalue = document.getElementById('fullframevalue');

  fullframevalue.value = fullframeinput.value;
  if(fullframevalue.value > 0 ){
    fullframeform.classList.remove('active');
  }
  else{
    fullframeform.classList.add('active');
  }

  const cropdslrform = document.getElementById('cropdslrform');
  const cropdslrinput = document.getElementById('cropdslr');  
  const cropdslrvalue = document.getElementById('cropdslrvalue');

  cropdslrvalue.value = cropdslrinput.value;
  if(cropdslrvalue.value > 0 ){
    cropdslrform.classList.remove('active');
  }
  else{
    cropdslrform.classList.add('active');
  }

  const wideangleform = document.getElementById('wideangleform');
  const wideangleinput = document.getElementById('wideangle');  
  const wideanglevalue = document.getElementById('wideanglevalue');

  wideanglevalue.value = wideangleinput.value;
  if(wideanglevalue.value > 0 ){
    wideangleform.classList.remove('active');
  }
  else{
    wideangleform.classList.add('active');
  }

  const normalform = document.getElementById('normalform');
  const normalinput = document.getElementById('normal');  
  const normalvalue = document.getElementById('normalvalue');

  normalvalue.value = normalinput.value;
  if(normalvalue.value > 0 ){
    normalform.classList.remove('active');
  }
  else{
    normalform.classList.add('active');
  }

  const othersformprice = document.getElementById('othersformprice');
  const othersinput = document.getElementById('others');  
  const othersvalue = document.getElementById('othersvalue');

  othersvalue.value = othersinput.value;
  if(othersvalue.value > 0 ){
    othersformprice.classList.remove('active');
  }
  else{
    othersformprice.classList.add('active');
  }

})

// Select price and date

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
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
      one: 'night',
      other: 'nights',
    },
  },
});

// Review your listing
const reviewfieldsbtn = document.getElementById('reviewfields');
reviewfieldsbtn.addEventListener('click', () => {
  const titlereview = document.getElementById('titlereview');
  const descriptionreview = document.getElementById('descriptionreview');
  const addressreview = document.getElementById('addressreview');
  const tagsreview = document.getElementById('tagsreview');
  const equipmentreview = document.getElementById('equipmentreview');
  const dealsreview = document.getElementById('dealsreview');
  const dealdaysvalue = document.getElementById('dealdaysvalue');
  const dealpricevalue = document.getElementById('dealpricevalue');
  const availabilityreview = document.getElementById('availabilityreview');
  const pricereview = document.getElementById('pricereview');
  const pricevalue = document.getElementById('pricevalue');
  const datepicker = document.getElementById('datepicker');

  titlereview.value = propertytitle.value;
  descriptionreview.value = propertydescription.value;
  addressreview.value = street.value+' '+
                        flatroom.value+' '+
                        city.value+' '+
                        state.value+' '+
                        postalcode.value+' '+
                        country.value;
  tagsreview.value = _foodphotography?"Food Photography ":""+
                    _commercial?"Food Photography ":""+
                    _fashion?"Fashion ":""+
                    _portrait?"Portrait ":""+
                    _lifestyle?"Lifestyle ":""+
                    _newborn?"Newborn ":""+
                    _wedding?"Wedding ":"";
  equipmentreview.value = _light?"Light ":""+
                        _lightshapers?"Light Shapers ":""+
                        _camerastand?"Camera Stand ":""+
                        _camera?"Camera ":""+
                        _lens?"Lens ":""+
                        _otherequipment?"Other equipment ":"";
  dealsreview.value = `$ ${dealpricevalue.value} for ${dealdaysvalue.value} days`;
  availabilityreview.value = datepicker.value;
  pricereview.value = `$ ${pricevalue.value} per day`;
});

// Test create a property
let _mediaArray = [];
let _lightObj = {};
let _lightshapersObj = {};
let _camerastandObj = {};
let _cameraObj = {};
let _lensObj = {};
let _othersObj = {};
let _price;
let _from;
let _to;

let propertyInfo;
const createPropertybtn = document.getElementById("createPropertybtn");
createPropertybtn.addEventListener("click", async function (event) {
  console.log("button");
  event.preventDefault();
  //let _media = [];
  propertyInfo = await createProperty('4BTWTvRfqDEQ7vXdrIxA', //uid
                                    _indoor, // indoor
                                    _outdoor, // outdoor
                                    _studio, // studio
                                    _house, // house
                                    _beach, // beachhouse
                                    _others, // other
                                    street.value,
                                    flatroom.value,
                                    city.value,
                                    state.value,
                                    postalcode.value,
                                    country.value,
                                    propertytitle.value,
                                    propertydescription.value,
                                    true, // foodphotography
                                    true, // commercial
                                    true, // fashion
                                    true, // portrait
                                    true, // lifestyle
                                    true, // newborn
                                    true, // wedding
                                    _mediaArray, // Media Array 5 images
                                    _lightObj, // Light Object: ceilingflash, floorflash
                                    _lightshapersObj, 
                                    _camerastandObj, // Camera Stand Object: tripod
                                    _cameraObj, // Camera Object: fullframe, cropdslr
                                    _lensObj, // Lens Object: wideangle, normal
                                    _othersObj, // Other Object: 
                                    true, // wifi Amenities
                                    true, // elevator Amenities
                                    true, // washroom Amenities
                                    true, // kitchen Amenities
                                    true, // airconditioner Amenities
                                    true, // parking Amenities
                                    true, // naturallight Amenities
                                    _price, // price property price
                                    _from, // availability from 
                                    _to, // availability to
                                    3, // dealdays Deals
                                    150, // dealprice Deals
                                    true // enabledeal Deals
                                    );

    console.log(propertyInfo);

    // Post Image Collection with propertyId
    await SaveURLtoFirestore(urlString,propertyInfo);
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

// UpBtn.onclick = UploadProcess;
UpBtn.addEventListener("click", () => {
  UploadProcess();
});
// DownBtn.onclick = GetImagefromFirestore;