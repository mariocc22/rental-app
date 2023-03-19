function addOfflineSupport () {

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
        mainElement.classList.remove("hide");
        offlineElement.classList.add("hide")
    });
    
    window.addEventListener("offline", () => {
        mainElement.classList.add("hide");
        offlineElement.classList.remove("hide")
        console.log('offline');
    });
}


export { addOfflineSupport }