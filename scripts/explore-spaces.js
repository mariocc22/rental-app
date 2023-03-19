import "/styles/common-styles.css";
import "/styles/explore-spaces.css";

// import utility functions
import { tagnameToInfo, activitysubCatList } from "../utility/tagnameToInfo.js";
import { getCurrentPosition } from "../utility/getCurrentPosition.js";

// queries
import { filterPlaces } from "../query/neo4jQueries.js";
import { propertyFuncion } from "../query/propertylist.js";

// modules
import { addOfflineSupport } from "../modules/offline";

// global variables for the file
const params = new URLSearchParams(document.location.search);
const activity = params.get("activity");
const validateActivities = ["music", "performance", "photography"];
// used for properties filteration
const MY_COORDINATES = { lat: undefined, lng: undefined };
let SEARCHED_STRING = "";
let SPACE_TYPE = undefined;
let SELECTED_PROPS = [];
let SELECTED_AMENITIES = [];
let PRICE = 200;
let DISTANCE = 100;

// initialise logic by calling init
init();

// function that triggers all scripts on the page
function init() {
  // redirect to photography
  validateActivity();

  // ask user to turn on his coordinates
  allowLocationSharing();

  addOfflineSupport();

  // register event listerners on the page
  registerFilterToggle();

  // register space type selection, props selection
  registerSearchInput();
  registerSpaceTypeSelection();
  registerPropsSelection();
  registerAmenitiesSelection();
  registerAdditionalFilterBtns();

  // load all Tags Info
  loadAllTags(activity);

  // display Properties
  displayProperties();

  // console.log(tagnameToInfo("photography-type-house"))

  // store coordinates
  storeLocationInfo();
}

// ========================== Functions

// allow location sharing
function allowLocationSharing() {}

// validate activity type
function validateActivity() {
  var url = window.location.href.split("?")[0];
  if (!validateActivities.includes(activity)) {
    window.location = `${url}?activity=photography`;
  }
}

// register listeners on page
// range distance overlay

// const rangeOverlay = document.querySelector('#range-overlay');
// const rangeInput = document.getElementById("distance");
// rangeOverlay.addEventListener('click', () => {

//     // ask user to enable if he disabled it
//     getLocation();

//     // geolocation starts
//     if ('geolocation' in navigator) {
//         // Prompt the user for permission to access their location
//         navigator.geolocation.getCurrentPosition(
//           // If the user allows access, store the coordinates in a variable
//           (position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//              // hide overlay and enable range input
//             rangeOverlay.classList.add("hide");
//             rangeInput.removeAttribute('disabled');

//             console.log(latitude)
//             console.log(longitude)

//           },
//         );
//       }
// });

// function getLocation() {
//     navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
//     if (permissionStatus.state === 'denied') {
//         // User has denied permission
//         alert('Please enable location services in your browser or device settings.');
//       }
//     });
//   }

// function registerDistanceSelector() {
//     const distance = document.getElementById("distance-wrapper");
//     console.log(distance)
//     distance.addEventListener("click", (event) => {
//         console.log(event)
//     }, true)
// }

let searchTimeout = null;
function registerSearchInput() {
  const searchInput = document.getElementById("search-places");
  searchInput.addEventListener("keyup", () => {
    clearTimeout(searchTimeout);

    SEARCHED_STRING = searchInput.value;

    searchTimeout = setTimeout(function () {
      displayProperties();
    }, 500);
  });
}

// ask browser to allow permission to share location

async function storeLocationInfo() {
  const resp = await navigator.permissions.query({ name: "geolocation" });
  if (resp.state === "denied") {
    alert(
      "Please enable location services in your browser or device settings."
    );
  } else {
    storeCoords();
  }
}

async function storeCoords() {
  const position = await getCurrentPosition();
  MY_COORDINATES.lat = position.coords.latitude;
  MY_COORDINATES.lng = position.coords.longitude;
  console.log(MY_COORDINATES);
}

function registerAdditionalFilterBtns() {
  // apply filter
  const applyFilterBtn = document.getElementById("applyFilters");

  applyFilterBtn.addEventListener("click", () => {
    // hide it using same toggle logic
    const priceValue = document.getElementById("price").value;
    const distanceValue = document.getElementById("distance").value;

    PRICE = priceValue;
    DISTANCE = distanceValue;

    toggleAdditionalFilter();
    // TODO change the list now

    displayProperties();
  });

  // close filter
  const closeFilterBtn = document.getElementById("clearFilters");

  closeFilterBtn.addEventListener("click", () => {
    SELECTED_AMENITIES = [];
    SELECTED_PROPS = [];

    const addtionalFilterForm = document.getElementById(
      "additional-filter-form"
    );
    addtionalFilterForm.reset();
  });
}

function registerFilterToggle() {
  const filterOn = document.getElementById("additional-filters-on");
  const filterOff = document.getElementsByClassName(
    "additional-filters-off"
  )[0];
  filterOn.addEventListener("click", toggleAdditionalFilter);
  filterOff.addEventListener("click", toggleAdditionalFilter);
}
// register listeners on space type selection
function registerSpaceTypeSelection() {
  const spaceTypeParent = document.getElementsByClassName("types-of-spaces")[0];
  spaceTypeParent.addEventListener("click", (event) => {
    // console.log(event.target.nodeName)
    if (event.target.nodeName == "INPUT" && event.target.getAttribute("name")) {
      SPACE_TYPE = event.target.id;

      displayProperties();
    }
  });
}

// register listerners on the equipments and props field
function registerPropsSelection() {
  const elementProps = document.querySelector(".props-input > ul");
  elementProps.addEventListener("click", (event) => {
    if (event.target.nodeName == "INPUT") {
      const selectedPropsNodes =
        document.querySelectorAll(".props-input input");
      const selectedProps = [...selectedPropsNodes]
        .filter((element) => element.checked)
        .map((element) => element.id);
      SELECTED_PROPS = selectedProps;
    }
  });
}

// register listeneres on amenities selection
function registerAmenitiesSelection() {
  const elementAmenities = document.querySelector(".amenities-input > ul");
  elementAmenities.addEventListener("click", (event) => {
    if (event.target.nodeName == "INPUT") {
      const selectedAmenitiessNodes = document.querySelectorAll(
        ".amenities-input input"
      );

      const selectedAmenities = [...selectedAmenitiessNodes]
        .filter((element) => element.checked)
        .map((element) => element.id);
      SELECTED_AMENITIES = selectedAmenities;
    }
  });
}

// toggle additional filters

function toggleAdditionalFilter() {
  const filterOff = document.getElementsByClassName(
    "additional-filters-off"
  )[0];
  filterOff.classList.toggle("hide");

  const mainNav = document.getElementsByClassName("index-nav")[0];
  mainNav.classList.toggle("hide");

  const additionalFilters =
    document.getElementsByClassName("additional-filters")[0];
  additionalFilters.classList.toggle("hide");

  const exploreMain = document.getElementsByClassName("explore-space-main")[0];
  exploreMain.classList.toggle("hide");
}

// load all tags in the html page
function loadAllTags(activity) {
  // load Space Types
  const elementType = document.getElementsByClassName("types-of-spaces")[0];
  const typeList = activitysubCatList(activity, "type");
  // console.log(typeList);
  elementType.innerHTML = "";

  typeList.forEach((tagInfo) => {
    const string = `<input type="radio" name="spaceType" id="${tagInfo.tagname}" value="${tagInfo.name}" />
        <label for="${tagInfo.tagname}">
            <span>
                <span>
                  <img src='../assets/svg-icons/${tagInfo.svg}' class='explore-spaces-svg'>
                </span>
                <span>
                  ${tagInfo.name}
                </span>
            </span>
        </label>`;
    elementType.innerHTML += string;
  });

  // load props
  const elementProps = document.querySelector(".props-input > ul");
  // console.log(elementProps)
  const propsList = activitysubCatList(activity, "equipments");
  elementProps.innerHTML = "";

  propsList.forEach((tagInfo) => {
    const string = `<li>
            <input type="checkbox" id="${tagInfo.tagname}" name="props" value="${tagInfo.name}">
            <label for="${tagInfo.tagname}">
                <span>
                    <i class="fa fa-camera"></i>
                    ${tagInfo.name}
                </span>
            </label>
        </li>`;

    elementProps.innerHTML += string;
  });

  // load amenities
  // load props
  const elementAmenities = document.querySelector(".amenities-input > ul");
  const amenitiesList = activitysubCatList(activity, "amenities");
  elementAmenities.innerHTML = "";

  amenitiesList.forEach((tagInfo) => {
    const string = `<li>
            <input type="checkbox" id="${tagInfo.tagname}" name="props" value="${tagInfo.name}">
            <label for="${tagInfo.tagname}">
                <span>
                    <i class="fa fa-camera"></i>
                    ${tagInfo.name}
                </span>
            </label>
        </li>`;
    elementAmenities.innerHTML += string;
  });
}

// prepare tags for displayProperties
function prepareTags() {
  // activity
  const activityTag = `activity-${activity}`;
  let tags = [activityTag];

  // type of space
  if (SPACE_TYPE) {
    tags.push(SPACE_TYPE);
  }

  // props
  if (SELECTED_PROPS.length) {
    tags = [...tags, ...SELECTED_PROPS];
  }

  // amenities
  if (SELECTED_AMENITIES.length) {
    tags = [...tags, ...SELECTED_AMENITIES];
  }

  return tags;
}

// Update List of Spaces

async function displayProperties() {
  // todo use the tags and properties
  // todo use the string search

  // await to get the list from the database

  // empty the container
  const listContainer = document.getElementsByClassName(
    "suggested-spaces-list"
  )[0];
  listContainer.innerHTML = "";

  const tags = prepareTags();
  const price = PRICE;
  const distance = DISTANCE;
  const string = SEARCHED_STRING;
  const coords =
    MY_COORDINATES.lat && MY_COORDINATES.lng ? MY_COORDINATES : undefined;

  const propertyIds = await filterPlaces(tags, price, string, distance, coords);

  // TODO add limit

  for (let propertyId of propertyIds) {
    const propertyInfo = await propertyFuncion(propertyId);
    if (propertyInfo) {
      const propertyObject = {
        img:
          propertyInfo?.media[0] || "https://picsum.photos/1200/500?random=1",
        title: propertyInfo.propertytitle,
        rating: 5,
        location: propertyInfo.address.city + " ," + propertyInfo.address.state,
        propertyId: propertyId,
        price: propertyInfo.price,
      };

      populateList(listContainer, propertyObject);
    }
  }
}

// function to populate list inside html script
function populateList(listContainer, propertyObj) {
  const string = `<li>
        <section>
            <a href="/property.html?propertyId=${propertyObj.propertyId}#customize">
                <img src="${propertyObj.img}" alt="">
            </a>
            <div class="space-details">
                <a href="/property.html?propertyId=${propertyObj.propertyId}">
                    <div class="space-name">${propertyObj.title}</div>
                </a>
                <p class="space-price">CAD ${propertyObj.price}</p>
            </div>
            <div class="space-location">
                <p>${propertyObj.location}</p>
                <p class="space-rating">${propertyObj.rating}</p>
            </div>
        </section>
    </li>`;

  listContainer.innerHTML += string;
}
