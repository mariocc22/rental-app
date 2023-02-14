import '/styles/explore.css';

let params = new URLSearchParams(document.location.search);
let activity = params.get("activity");

// change view to find and list space
if(activity) {
    const mainMenu = document.getElementById("main-menu-activity")
    mainMenu.classList.add('hide');

    const listSection = document.getElementById("explore-section");
    listSection.classList.remove('hide');
}

const moreFilterElem = document.getElementById("more-filter");

moreFilterElem.addEventListener("click", () => {
    alert('clicked')
})