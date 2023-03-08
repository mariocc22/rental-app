import '/styles/common-styles.css';
import '/styles/property.css';
import { DateRangePicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/css/datepicker.css';

// import queries
import { propertyFuncion } from '../query/propertylist.js'
import { tagnameToInfo } from '../utility/tagnameToInfo.js'

const elem = document.getElementById('foo');
const rangepicker = new DateRangePicker(elem, {
  autohide: true
});

const startElem = document.getElementById('start');
const endElem = document.getElementById('end');

startElem.addEventListener('changeDate', function(e) {
  console.log('start', e.detail.date);
});

endElem.addEventListener('changeDate', function(e) {
  console.log('end', e.detail.date);
});


// Slider Code ===================

// https://codepen.io/davehert/pen/MWrYjZy

// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// Slider Code ends ===============


// global variables to view property
const params = new URLSearchParams(document.location.search);
const propertyId = params.get("propertyId");


init()

// ================= FUNCTIONS

function init() {


  // load the data from firebase
  showPropertyDetails()
}


async function showPropertyDetails() {
  const propertyInfo = await propertyFuncion(propertyId)
  console.log(propertyInfo);

  // add name
  const propertyName = document.getElementById("propery-name");
  propertyName.innerText = propertyInfo.propertytitle;

  // load images
  let propertyImages = propertyInfo.media.filter(link => link != "");

  if(!propertyImages.length) {
    propertyImages = ["https://source.unsplash.com/random?landscape,mountain"]
  }

  const imgSlider = document.getElementById("slider");
  imgSlider.innerHTML = "";
  propertyImages.forEach(link => {
    imgSlider.innerHTML = `<div class="slide" style="transform: translateX(0%);">
          <img src="${link}" alt="">
      </div>`;
  })


  // load bundle information
  const bundleInfo = propertyInfo.bundleinfo;
  const bundlePrice = bundleInfo.price;
  const bundleEquipment = bundleInfo.equipment.filter(val => val != "");

  const bundlePriceElem = document.getElementsByClassName("bundle-title")[0]
  bundlePriceElem.innerHTML = `Reduced Base Price $${bundlePrice}`;

  const bundleEquipWrapper = document.querySelector(".bundle-equipments ul");
  console.log(bundleEquipWrapper)
  bundleEquipWrapper.innerHTML = "";

  // bundleEquipments

    bundleEquipment.forEach(equip => {
      const string = `<li>
            <span class="bundle-prop">
                <i class="fa fa-camera"></i>
                ${equip}
            </span>
        </li>`;


        bundleEquipWrapper.innerHTML += string;
    })


  // load equipments
  const equipmentObjectList = propertyInfo.equipments;
  const equipmentWrapper = document.querySelector('.property-equipments ul');
  equipmentWrapper.innerHTML = "";
  equipmentObjectList.forEach(object => {
    // console.log(object)
    const tagname = object.tagname;
    const tagInfo = tagnameToInfo(tagname);
    const tag = tagInfo.name;
    const price = object.price;

    const string = `<li>
            <input type="checkbox" id="${tagname}" name="props" value="${price}">
            <label for="${tagname}">
                <span>
                    <i class="fa fa-camera"></i>
                    ${tag}
                </span>
                <span class="prop-price">
                    ${price}
                </span>
            </label>
        </li>`

    equipmentWrapper.innerHTML += string;
  })



  // customize options
  const detailsWrapper = document.querySelector('.property-description > p');
  detailsWrapper.innerText = propertyInfo.propertydescription;

  // amenities
  const amenitiesTagNames = propertyInfo.amenities;

  const amenitiesWrapper = document.querySelector(".property-amenities > ul");
  amenitiesWrapper.innerHTML = "";
  amenitiesTagNames.forEach(tagname => {

   
    const tagInfo = tagnameToInfo(tagname);
    const tag = tagInfo.name;

    const string = `<li>${tag}</li>`
    amenitiesWrapper.innerHTML += string;
  })

  // show price details

}








// // display menu section based on URL
// const URLhash = window.location.hash;
// if(URLhash) {
//   // get split value
//   const splitHash = URLhash.split("#")
//   if(splitHash[1]) {
//     const elemValue = splitHash[1];
//     displaySelectedMenuInfo(elemValue);

//   } 
// }

// // Code to toggle tabs
// const menuTabs = document.getElementsByClassName('menu-tabs');
// const menuTabsArray = Array.from(menuTabs);

// menuTabsArray.forEach(elem => {
//   elem.addEventListener('click', function(event) {
//     const elemValue = this.dataset.value;
//     displaySelectedMenuInfo(elemValue);
//   })
// })


// // displays the selected menu info based on user selection and url
// function displaySelectedMenuInfo(elemValue) {
//   // hide all elements inside the wrapper
//     // .property-menu-info-wrapper
//     const allElementsToHide = document.querySelectorAll('.property-menu-info-wrapper > div')
//     allElementsToHide.forEach(elem => elem.classList.add("hide"));

//     // remove hide class
//     const elemToShowClass = `property-${elemValue}-tab`;
//     const elemToShow = document.getElementsByClassName(elemToShowClass);
//     elemToShow[0].classList.remove("hide");
// }

// // Connect items to calculate total price


// // displays the content to the user and attaches buttons
// async function displayContent() {
//   // read data from the server to populate the content
//   const allPropertyData = await readPropertyData();

//   populatePropertyInfo(allPropertyData)
//   populateCustomizeInfo(allPropertyData)
//   populateDetailsInfo(allPropertyData);
//   populateShowcases(allPropertyData)
//   // attach all events to the page
// }



// function populateShowcases(allPropertyData) {
//   // update showcases
//   const showcases = allPropertyData.showcases;
//   const showcaseListElement = document.getElementById("showcase-list");
//   showcaseListElement.innerHTML = "";

//   showcases.forEach(showcase => {
//     console.log(showcase);

//     showcaseListElement.innerHTML = `
//     <li class="property-showcase">
//       <img src="${showcase.img}">
//       <h3 class="showcase-title">
//           ${showcase.title}
//       </h3>
//       <p class="showcase-description">
//           ${showcase.description}
//       </p>
//     </li>`
//   })

//   const x = `
//   <li class="property-showcase">
//     <img src="https://picsum.photos/1200/500?random=2">
//     <h3 class="showcase-title">
//         Showcase
//     </h3>
//     <p class="showcase-description">
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. A delectus aperiam eos non
//         dolorem. Odit corrupti voluptatem iste quae perspiciatis?
//     </p>
//   </li>`;

// }


// function populateDetailsInfo(allPropertyData) {
//   // update property
//   const description = document.getElementById("property-description");
//   description.innerHTML = `
//     <h2>Property Description</h2>
//     <p>${allPropertyData.propertyDetails.description}</p>
//   `

//   // amenities
//   const amenities = document.getElementById("property-amenities");

//   amenities.innerHTML = `<h2>Property Amenities</h2>`;
//   let amenitiesList = ""
//   allPropertyData.propertyDetails.amenities.forEach(amenity => {
//     amenitiesList += ` <li>${amenity}</li>`
//   })
//   amenities.innerHTML += `<ul>${amenitiesList}</ul>`
// }


// function populateCustomizeInfo(allPropertyData) {
  
//   // bundles
//   const bundlesInfo = document.getElementById("property-bundles");
//   bundlesInfo.innerHTML = "";
//   bundlesInfo.innerHTML += `<h2>Suggested Bundles</h2>`
//   allPropertyData.customize.bundles.forEach(bundleInfo => {
//     let equipmentList = "";
//     bundleInfo.equipments.forEach(equipment => {
//       // todo tag id to name
//       equipmentList += `<li>${equipment}</li>`
//     })

//     const elems = `
//     <div class="bundle">
//       <h3>$${bundleInfo.price} / Per Day</h3>
//       <p>THIS P TAG TEXT NEEDS TO BE UPDATED</p>
//       <div class="bundle-equipments">
//           <ul>
//               ${equipmentList}
//           </ul>
//       </div>
//       <input type="button" value="Choose Bundle" data-price="${bundleInfo.price}">
//   </div>`

//   bundlesInfo.innerHTML += elems;
//   })
//   bundlesInfo.classList.remove('hide');

//   // Equipments and Props
//   const equipment = document.getElementById("property-equipments");
//   equipment.innerHTML = "";
//   equipment.innerHTML += `<h2>Equipment and Props</h2>`;
//   let equipmentList = ""
//   allPropertyData.customize.equipments.forEach(({price, tagname}) => {
//     equipmentList += `<li data-price="${price}">${tagname} $${price}</li>`
//   })
//   equipment.innerHTML += `<ul>${equipmentList}</ul>`

//   // TODO enable date with custom changes

// }

// function populatePropertyInfo(allPropertyData) {
  
//   // name
//   const nameElement = document.getElementById("propery-name");
//   nameElement.innerText = allPropertyData.propertyName + ` @ CAD ${allPropertyData.price}`;

//   // images
//   const slider = document.getElementById("slider");
//   slider.innerHTML = "";
//   allPropertyData.propertyImages.forEach(imageLink => {
//     slider.innerHTML += `
//     <div class="slide">
//     <img src="${imageLink}" alt="" />
//     </div>`
//   })
//   // btns
//   slider.innerHTML += `
//   <button class="btn btn-next"> > </button>
//   <button class="btn btn-prev"> < </button>`
//   slider.classList.remove('hide');

// }



// async function readPropertyData() {
//   const data = {
//     propertyId: "0djsGVd2vaDz4cs7KM1j",
//     propertyName: "Kevin's Rooftop Bar",
//     propertyImages: ["https://source.unsplash.com/random?landscape,mountain", "https://source.unsplash.com/random?landscape,cars"],
//     price: "100",
//     customize: {
//       bundles: [
//         {
//           price: "300",
//           equipments: ["photography-equipments-camera-stand", "photography-equipments-light-shaper-umbrella", "photography-equipments-light-stand"]
//         },
//         {
//           price: "250",
//           equipments: ["photography-equipments-lens"]
//         }
//       ],
//       equipments: [
//         {
//           price: "30",
//           tagname: "photography-equipments-light-shaper-umbrella"
//         },
//         {
//           price: "20",
//           tagname: "photography-equipments-camera-stand"
//         },
//         {
//           price: "10",
//           tagname: "photography-equipments-light-stand"
//         }
//       ],
//       availableTimestamp: {
//         from: "",
//         to: ""
//       },
//       bookingsTimestamp: [
//         {
//           from: "",
//           to: ""
//         }
//       ]
//     },
//     propertyDetails: {
//       description: "long textual descprtion about the property",
//       ownerInfo: {},
//       amenities: ["first", "second", "third"]
//     },
//     showcases: [
//       {
//         id: "someid",
//         img: "https://source.unsplash.com/random?landscape,mountain",
//         description: "a long text lorem ipsum maybe wmdd wwwooaahh",
//         userInfo: {},
//         title: "Nice Bar"
//       }
//     ]
//   }

//   return data;
// }


// // ============ call display content
// displayContent()