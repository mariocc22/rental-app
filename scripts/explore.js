import '/styles/common-styles.css';
import '/styles/explore.css';

import { filterPlaces } from '../query/neo4jQueries.js'

let params = new URLSearchParams(document.location.search);
let activity = params.get("activity");

// required to filter list
const selectedTags = [];
const selectedCoords = {};



// change view to find and list space
if (activity) {

    // push data to selectedTags
    selectedTags.push(`activity-${activity}`)


    const mainMenu = document.getElementById("main-menu-activity")
    mainMenu.classList.add('hide');

    const listSection = document.getElementById("explore-section");
    listSection.classList.remove('hide');


    // show headings of the list places page
    const listHeadings = document.getElementsByClassName("page-title-explore-spaces");
    listHeadings[0].classList.remove('hide');
    const listTagLine = document.getElementsByClassName("explore-spaces-tagline");
    listTagLine[0].classList.remove('hide');
    const menuHeadings = document.getElementsByClassName("page-title-activity-menu");
    menuHeadings[0].classList.add('hide');


    // Register Event listerners of next page
    // const filterOn = document.getElementById("additional-filters-on");
    // filterOn.addEventListener("click", toggleAdditionalFilter("on"));




    // filter list based on musician activity
    updatePlaces().then(list => {
        // update it now
        console.log(list)
    })




}


// Filters places based on tags and displays updated 
function updatePlaces() {

    const payload = { tags: selectedTags }
    // always append coords conditionally -> query doesn't have validaation
    if (Object.values(selectedCoords).length) {
        payload.coords = selectedCoords
    }

    return filterPlaces(payload);


}

const moreFilterElem = document.getElementById("more-filter");

moreFilterElem.addEventListener("click", () => {
    alert('clicked')
})

console.log(filterPlaces)



// Search and filter options

const typeOfPlaces = document.querySelectorAll('.types-of-spaces input')


typeOfPlaces.forEach(element => {

    element.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e)

    })

})

// toggle additional filters

function toggleAdditionalFilter(state) {
    if(state === "off") {
        const crossAdFilters = document.getElementsByClassName('additional-filter-cross')[0];
        crossAdFilters.classList.toggle("hide");
    }

    const mainNav = document.getElementsByClassName("index-nav")[0]
    mainNav.classList.toggle("hide");

    const additionalFilters = document.getElementsByClassName("additional-filters")[0];
    additionalFilters.classList.toggle("hide");

    const exploreMain = document.getElementsByClassName("explore-space-main")[0];
    exploreMain.classList.toggle("hide");

    if(state === "on") {
        const filterOff = document.getElementById("additional-filters-off");
        filterOff.addEventListener("click", toggleAdditionalFilter);
    }
}