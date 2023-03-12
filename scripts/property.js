import "/styles/common-styles.css";
import "/styles/property.css";
// import { DateRangePicker } from "vanillajs-datepicker";
// import "vanillajs-datepicker/css/datepicker.css";

// import queries
import { propertyFuncion } from "../query/propertylist.js";
import { tagnameToInfo } from "../utility/tagnameToInfo.js";
import { calendarBook } from "../utility/datePicker.js";
import { calculateDays } from "../utility/dateRangeToDays.js";

let datePicker = undefined;

// global variables to view property
const params = new URLSearchParams(document.location.search);
const propertyId = params.get("propertyId");
const VALID_TABS = ["customize", "details", "showcases"];

// use this to calculate total price -> selected by the user
let all_propertyInfo = undefined;
let BUNDLE_INFO = undefined;
let property_BASE_PRICE = undefined;
const USER_CART = { basePrice: undefined, equipments: [], dateTo: undefined, dateFrom: undefined, daysInfo: undefined };


init();

// ================= FUNCTIONS

async function init() {

  // validate url and selected tabs
  validateURL();

  // load data in the website from database
  const propertyInfo = await showPropertyDetails();

  // Update Variables and Load the Price Dtails Section
  loadPriceDetails(propertyInfo)

  // register event
  registerLoadTabs()
  registerDatesSelection();
  registerBundleSelection()
  registerPropsSelection();
  registerBookButton();


  // load the slider
}

async function showPropertyDetails() {
  const propertyInfo = await propertyFuncion(propertyId);

  // add name
  const propertyName = document.getElementById("propery-name");
  propertyName.innerText = propertyInfo.propertytitle;

  // This will set the calendar with the availability of the place
  const [min, max] = propertyInfo.dates.split(" - ");
  if(min) {
    datePicker = calendarBook(min, max);
  } else {
    datePicker = calendarBook();
  }
  

  // load images
  let propertyImages = propertyInfo.media.filter((link) => link != "");

  if (!propertyImages.length) {
    propertyImages = ["https://source.unsplash.com/random?landscape,mountain"];
  }

  const imgSlider = document.getElementById("slider");
  imgSlider.innerHTML = "";
  propertyImages.forEach((link) => {
    imgSlider.innerHTML = `<div class="slide" style="transform: translateX(0%);">
          <img src="${link}" alt="">
      </div>`;
  });

  // load bundle information
  const bundleInfo = propertyInfo.bundleinfo;
  BUNDLE_INFO = bundleInfo;
  const bundlePrice = bundleInfo.price;
  const bundleEquipment = bundleInfo.equipment.filter((val) => val != "");

  const bundlePriceElem = document.getElementsByClassName("bundle-title")[0];
  bundlePriceElem.innerHTML = `Reduced Base Price $${bundlePrice}`;

  const bundleEquipWrapper = document.querySelector(".bundle-equipments ul");
  bundleEquipWrapper.innerHTML = "";

  // bundleEquipments

  bundleEquipment.forEach((equip) => {
    const string = `<li>
            <span class="bundle-prop">
                <i class="fa fa-camera"></i>
                ${equip}
            </span>
        </li>`;

    bundleEquipWrapper.innerHTML += string;
  });

  // load equipments
  const equipmentObjectList = propertyInfo.equipments;
  const equipmentWrapper = document.querySelector(".property-equipments ul");
  equipmentWrapper.innerHTML = "";
  equipmentObjectList.forEach((object) => {
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
        </li>`;

    equipmentWrapper.innerHTML += string;
  });

  // customize options
  const detailsWrapper = document.querySelector(".property-description > p");
  detailsWrapper.innerText = propertyInfo.propertydescription;

  // amenities
  const amenitiesTagNames = propertyInfo.amenities;

  const amenitiesWrapper = document.querySelector(".property-amenities > ul");
  amenitiesWrapper.innerHTML = "";
  amenitiesTagNames.forEach((tagname) => {
    const tagInfo = tagnameToInfo(tagname);
    const tag = tagInfo.name;

    const string = `<li>${tag}</li>`;
    amenitiesWrapper.innerHTML += string;
  });

  // address
  const addressWrapper = document.querySelector(".property-address > p")
  const address = propertyInfo.address;
  addressWrapper.innerText = `${address.street}, ${address.city}, ${address.state}, ${address.postalcode}, ${address.country}`

  // show price details
  return propertyInfo;
}


// load price details
function loadPriceDetails(propertyInfo) {
  // update base
  all_propertyInfo = propertyInfo;
  property_BASE_PRICE = propertyInfo.price;
  updateBasePrice(propertyInfo.price);
}




function validateURL() {
  const URLhash = window.location.hash;
  if(URLhash) {
    const splitHash = URLhash.split("#");
    const elemValue = splitHash[1];
    if(elemValue) {
      if(!VALID_TABS.includes(elemValue)) {
        const urlWithoutHash = window.location.origin + window.location.pathname + window.location.search;
        window.location.href = urlWithoutHash + "#customize"
      } else {
        displaySelectedMenuInfo(elemValue);
      }
    }
  } else {
    window.location.href = window.location.href + "#customize";
    window.location.reload();
  }
}



// =========================================================== DOM insertions and User Cart in some cases

function updateBasePrice(price) {

  // update in dom
  const basePriceElem = document.querySelector(".detail-base ul > li:first-child span:last-child");
  // console.log(propertyInfo.price)
  basePriceElem.innerHTML = `CAD ${price}`;

  // update in cart
  USER_CART.basePrice = price;
}

function updateProps(props) {
  const propsList = document.querySelector(".detail-props ul");

  propsList.innerHTML = "";
  props.forEach(propObj => {
    propsList.innerHTML += `<li>
                            <span> ${propObj.name} </span>
                            <span> CAD ${propObj.price} </span>
                          </li>`
  })

  // show props
  const propsElem = document.querySelector(".detail-props");
  if(props.length) {
    propsElem.classList.remove("hide");
  } else {
    propsElem.classList.add("hide")
  }


  // update in cart
  USER_CART.equipments = props;

}

// total price is reflected with date
function updateTotalPrice() {

  const totalPriceElem = document.querySelector(".detail-total-price");
  const bookBtn = document.querySelector("#property-booking-btn input")
  const priceDescription = document.querySelector(".detail-total-price ul span:first-child")
  const priceCalculation = document.querySelector(".detail-total-price ul span:last-child")
 
  
  const {priceWithProps, totalPrice, daysInfo} = calculatePrice()

  priceDescription.innerText = `Price for ${daysInfo} days`
  priceCalculation.innerText = `${priceWithProps} x ${daysInfo} days = CAD ${totalPrice}`

  if(daysInfo) {
      // show the element
    totalPriceElem.classList.remove("hide")

    // show button
    bookBtn.removeAttribute("disabled");
    bookBtn.value = "Book"
  } else {
    totalPriceElem.classList.add("hide")
    bookBtn.value = "Select Dates";
    bookBtn.setAttribute("disabled", true);
  }


}

function calculatePrice () {

  const totalProps = USER_CART.equipments.map(obj => Number(obj.price) ).reduce(function(a, b) { return a + b; }, 0);
  const basePrice = Number(USER_CART.basePrice);
  const priceWithProps = basePrice + totalProps;
  const totalPrice = priceWithProps * Number(USER_CART.daysInfo);

  return {priceWithProps, totalPrice, daysInfo: USER_CART.daysInfo}

}

// =========================================================== Register Event Listeners

function registerBookButton() {
  
  const bookBtn = document.querySelector("#property-booking-btn > input");
  bookBtn.addEventListener("click", ()  => {
    const bookingInfo = JSON.parse(JSON.stringify(USER_CART));
    bookingInfo.propertyId = propertyId;
    const bookingInfoBase64 = btoa(JSON.stringify(bookingInfo));
    window.location.href = window.location.origin + "/booking-confirmation.html?bookingInfo=" + bookingInfoBase64
  })
}

function registerPropsSelection() {
  const propsElements = document.querySelectorAll(".property-equipments input[type='checkbox']");
  propsElements.forEach(propElement => {
    propElement.addEventListener('change', (event) => {
      if(event.target.checked) {
        const tagInfo = tagnameToInfo(event.target.id);
        const tag = tagInfo.name;
        const equipmentObj = {name: tag, price: event.target.value }

        const z  = USER_CART.equipments.filter(function( obj ) {
          return obj.price != 0;
        });
        USER_CART.equipments = z;


        USER_CART.equipments.push(equipmentObj);
      } else {
        const tagInfo = tagnameToInfo(event.target.id);
        const tag = tagInfo.name;

        const z  = USER_CART.equipments.filter(function( obj ) {
          return obj.name !== tag;
        });
        USER_CART.equipments = z;
      }

      updateBasePrice(property_BASE_PRICE)
      updateProps(USER_CART.equipments)
      updateTotalPrice()

    })

    
  })


};

function registerDatesSelection() {
  const dateElement = document.getElementById("datepicker");
 
  datePicker.on("select", (event) => {
    // get info
    const startDate = dateElement.value.split(" - ")[0];
    const endDate = dateElement.value.split(" - ")[1];
    const daysDifference = calculateDays(startDate, endDate);

    // update cart
    USER_CART.dateFrom = startDate;
    USER_CART.dateTo = endDate;
    USER_CART.daysInfo = daysDifference;

    // total Price and Enable button
    updateTotalPrice()
  })

}



function registerBundleSelection() {
  const bundleSelectBtn = document.querySelector(".bundle-details-props input[type='button']");
  const bundleInfo = BUNDLE_INFO;
  bundleSelectBtn.addEventListener("click", (event) => {
    const price = bundleInfo.price
    const props = bundleInfo.equipment.filter(prop => prop != "").map(prop => {
      return {name: prop, price: 0}
    });

    // unselect existing props
    const allProps = document.querySelectorAll(".property-equipments input[type='checkbox']");
    allProps.forEach(propElement => {
     propElement.checked = false;
    })

    updateBasePrice(price)
    updateProps(props)
    updateTotalPrice()

  })
}

function registerLoadTabs() {
  // Code to toggle tabs
  const menuTabs = document.getElementsByClassName('menu-tabs');
  const menuTabsArray = Array.from(menuTabs);

  menuTabsArray.forEach(elem => {
    elem.addEventListener('click', function(event) {
      const elemValue = this.dataset.value;
      displaySelectedMenuInfo(elemValue);
    })
  })

};


// displays the selected menu info based on user selection and url
function displaySelectedMenuInfo(elemValue) {
  // hide all elements inside the wrapper
    // .property-menu-info-wrapper
    const allElementsToHide = document.querySelectorAll('.property-menu-info-wrapper > div')
    allElementsToHide.forEach(elem => elem.classList.add("hide"));

    // remove hide class
    const elemToShowClass = `property-${elemValue}-tab`;
    const elemToShow = document.getElementsByClassName(elemToShowClass);
    elemToShow[0].classList.remove("hide");
};


