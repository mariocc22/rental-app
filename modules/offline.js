function addOfflineSupport () {

    // for explore space page
    const additionalFiltersWrapper = document.querySelector("body .additional-filters.hide");

    // common for all pages
    const mainElement = document.getElementsByTagName("main")[0];
    const offlineElement = document.createElement("div");
    offlineElement.innerHTML =
    `<div class="offline-wrapper">
        <img src="../assets/svg-icons/Asset 3.svg" alt="">
        <h1>Looks like you're Offline!</h1>
        <p>Please check your network settings!</p>
    </div>`
    offlineElement.classList.add("offline-page");
    offlineElement.classList.add("hide");
    const parentElement = mainElement.parentNode;
    parentElement.insertBefore(offlineElement, mainElement);

    window.addEventListener("online", () => {

        // for explore space page
        if(!!additionalFiltersWrapper) {
            additionalFiltersWrapper.classList.add("filter-wrapper-desktop")
        }

        mainElement.classList.remove("hide");
        offlineElement.classList.add("hide")
    });
    
    window.addEventListener("offline", () => {
        
        // for explore space page
        if(!!additionalFiltersWrapper) {
            additionalFiltersWrapper.classList.remove("filter-wrapper-desktop")
        }

        mainElement.classList.add("hide");
        offlineElement.classList.remove("hide")
        console.log('offline');
    });
}


export { addOfflineSupport }