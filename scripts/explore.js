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