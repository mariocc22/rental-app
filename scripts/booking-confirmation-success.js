import "/styles/common-styles.css";
import "/styles/booking-confirmation-success.css";

const exploreSpacesBtn = document.getElementById("explore-space")
exploreSpacesBtn.addEventListener("click", () => {
    window.location.href = `${window.location.origin}/explore.html`;
})