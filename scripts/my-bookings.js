import "/styles/common-styles.css";
import "/styles/my-bookings.css";

// import queries
import { getMyBookings, getBookingInfo} from "../query/booking";


init();


// =========================================== Functions and parsers
async function init() {

    // get all booking ids of the user
    const bookingIds = await getAllBookingIds();

    // get all booking information of the user ids
    const allBookingInfo = await getAllBookingInfo(bookingIds)

    updateBookingDetails(allBookingInfo)

}


async function getAllBookingIds() {
    const userId = localStorage.getItem("uid");
    const allBookingIds = await getMyBookings(userId)
    return allBookingIds;
}

async function getAllBookingInfo(bookingIds) {
    const allBookingInfo = await getBookingInfo(bookingIds)
    return allBookingInfo
}

// ============================================ 


// =========================================== Dom Manipulation

function updateBookingDetails(allBookingInfo) {
    const bookingsWrapper = document.querySelector(".bookings-wrapper");
    bookingsWrapper.innerHTML = "";

    for(let bookingId in allBookingInfo) {
        const {finalPrice, propertyTitle, bookedAt, primaryPhoto, propertyId } = allBookingInfo[bookingId];

        const bookingBase84 = btoa(JSON.stringify({bookingId}));

        bookingsWrapper.innerHTML += `<div class="booking-space-card">
            <a href="/property.html?propertyId=${propertyId}">
                <img src="${primaryPhoto}" alt="">
            </a>
            <div class="space-title">
                <a class="booking-space-card-title" href="/property.html?propertyId=${propertyId}">
                    <h2>${propertyTitle}</h2>
                </a>
                <a class="booking-space-invoice-link" href="/booking-confirmation.html?bookingInfo=${bookingBase84}">
                    <p>get invoice</p>
                </a>
            </div>
            <div class="booking-details">
                <p class="booking-data">
                    <span> Booking price: </span>
                    <span> CAD ${finalPrice} </span>
                </p>
                <p class="booking-data">
                    <span> Booking Date: </span>
                    <span> ${bookedAt} </span>
                </p>
            </div>
        </div>`;
    }


}