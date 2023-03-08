import '/styles/common-styles.css';
import '/styles/explore-spaces.css';

// import utility functions
import { tagnameToInfo, activitysubCatList } from '../utility/tagnameToInfo.js'

// global variables for the file
const params = new URLSearchParams(document.location.search);
const activity = params.get("activity");
const validateActivities = ["music", "performance", "photography"];
// used for properties filteration
const MY_COORDINATES = { lat: undefined, lng: undefined };
let SEARCHED_STRING = undefined;
let SPACE_TYPE = undefined;
let SELECTED_PROPS = [];
let SELECTED_AMENITIES = [];
let PRICE = undefined;
let DISTANCE = undefined;

// const 


// initialise logic by calling init
init();

// function that triggers all scripts on the page
function init() {
    // redirect to photography
    validateActivity()

    // register event listerners on the page
    registerFilterToggle()


    // register space type selection, props selection
    registerSpaceTypeSelection();
    registerPropsSelection();
    registerAmenitiesSelection();
    registerAdditionalFilterBtns();

    // load all Tags Info
    loadAllTags(activity);


    // display Properties
    // displayProperties()

    // console.log(tagnameToInfo("photography-type-house"))
}




// ========================== Functions

// validate activity type
function validateActivity() {
    var url = window.location.href.split('?')[0];
    if (!validateActivities.includes(activity)) {
        window.location = `${url}?activity=photography`;
    }
}

// register listeners on page

function registerAdditionalFilterBtns() {

    // apply filter
    const applyFilterBtn = document.getElementById("applyFilters");

    applyFilterBtn.addEventListener("click", () => {
        // hide it using same toggle logic
        const priceValue = document.getElementById("price").value;
        const distanceValue = document.getElementById("distance").value;

        PRICE = priceValue;
        DISTANCE = distanceValue;

        toggleAdditionalFilter()
        // TODO change the list now

        updateList()
    })


    // close filter
    const closeFilterBtn = document.getElementById("clearFilters");

    closeFilterBtn.addEventListener("click", () => {

        SELECTED_AMENITIES = [];
        SELECTED_PROPS = [];

        const addtionalFilterForm = document.getElementById("additional-filter-form");
        addtionalFilterForm.reset();
    })


}

function registerFilterToggle() {

    const filterOn = document.getElementById("additional-filters-on");
    const filterOff = document.getElementsByClassName("additional-filters-off")[0];
    filterOn.addEventListener('click', toggleAdditionalFilter)
    filterOff.addEventListener('click', toggleAdditionalFilter)

}
// register listeners on space type selection
function registerSpaceTypeSelection() {
    const spaceTypeParent = document.getElementsByClassName("types-of-spaces")[0];
    spaceTypeParent.addEventListener("click", (event) => {
        // console.log(event.target.nodeName)
        if (event.target.nodeName == "INPUT" && event.target.getAttribute("name")) {
            SPACE_TYPE = event.target.id;
        }
    })
}

// register listerners on the equipments and props field
function registerPropsSelection() {
    const elementProps = document.querySelector('.props-input > ul')
    elementProps.addEventListener("click", (event) => {

        if (event.target.nodeName == "INPUT") {
            const selectedPropsNodes = document.querySelectorAll('.props-input input');
            const selectedProps = [...selectedPropsNodes].filter(element => element.checked).map(element => element.id);
            SELECTED_PROPS = selectedProps;
        }
    })
}

// register listeneres on amenities selection
function registerAmenitiesSelection() {
    const elementAmenities = document.querySelector('.amenities-input > ul');
    elementAmenities.addEventListener("click", event => {
        if (event.target.nodeName == "INPUT") {
            const selectedAmenitiessNodes = document.querySelectorAll('.amenities-input input');

            const selectedAmenities = [...selectedAmenitiessNodes].filter(element => element.checked).map(element => element.id);
            SELECTED_AMENITIES = selectedAmenities;
        }
    })
}


// toggle additional filters

function toggleAdditionalFilter() {
    const filterOff = document.getElementsByClassName("additional-filters-off")[0]
    filterOff.classList.toggle("hide");

    const mainNav = document.getElementsByClassName("index-nav")[0]
    mainNav.classList.toggle("hide");

    const additionalFilters = document.getElementsByClassName("additional-filters")[0];
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
    elementType.innerHTML = ""

    typeList.forEach(tagInfo => {
        const string = `<input type="radio" name="spaceType" id="${tagInfo.tagname}" value="${tagInfo.name}" />
        <label for="${tagInfo.tagname}">
            <span>
                <i class="fa-solid fa-person-shelter"></i>
                ${tagInfo.name}
            </span>
        </label>`;
        elementType.innerHTML += string;
    });


    // load props
    const elementProps = document.querySelector('.props-input > ul')
    // console.log(elementProps)
    const propsList = activitysubCatList(activity, "equipments");
    elementProps.innerHTML = "";

    propsList.forEach(tagInfo => {
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
    })


    // load amenities
    // load props
    const elementAmenities = document.querySelector('.amenities-input > ul');
    const amenitiesList = activitysubCatList(activity, "amenities");
    elementAmenities.innerHTML = "";

    amenitiesList.forEach(tagInfo => {
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
    })

}


// Update List of Spaces

function updateList() {
    // todo use the tags and properties
    // todo use the string search

    // await to get the list from the database

    // empty the container
    const listContainer = document.getElementsByClassName("suggested-spaces-list")[0];
    listContainer.innerHTML = "";


    populateList(listContainer);


}


function populateList(listContainer) {

    const listLength = 5;
    const propertyObj = {
        img: "https://picsum.photos/1200/500?random=1",
        title: "Space Title 1",
        rating: "5",
        location: "Metrotown, Burnaby",
        propertyId: "0djsGVd2vaDz4cs7KM1j"
    }

    for (let i = 0; i < listLength; i++) {

        const string = `<li>
        <section>
            <a href="/property.html?propertyId=${propertyObj.propertyId}">
                <img src="${propertyObj.img}" alt="">
            </a>
            <div class="space-details">
                <a href="/property.html?propertyId=${propertyObj.propertyId}">
                    <div class="space-name">${propertyObj.title}</div>
                </a>
                <p class="space-rating">${propertyObj.rating}</p>
            </div>
            <div class="space-location">
                ${propertyObj.location}
            </div>
        </section>
    </li>`

        listContainer.innerHTML += string;
    }

}