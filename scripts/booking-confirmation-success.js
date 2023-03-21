import "/styles/common-styles.css";
import '/styles/offline-page.css';
import "/styles/booking-confirmation-success.css";

import { addOfflineSupport } from "../modules/offline";

const exploreSpacesBtn = document.getElementById("explore-space")
exploreSpacesBtn.addEventListener("click", () => {
    window.location.href = `${window.location.origin}/explore.html`;
})

addOfflineSupport();