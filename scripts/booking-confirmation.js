import "/styles/common-styles.css";
import "/styles/booking-confirmation.css";


// import queries
import { propertyFuncion } from "../query/propertylist.js";

// Global Variables for the file
let BOOKING_OBJ = undefined;
const params = new URLSearchParams(document.location.search);
const bookingInfoBase64 = params.get("bookingInfo");
let toBook = undefined;
let BOOKING_INFO = undefined;
const taxPercent = 5;

init();



//  ======================= FUNCTIONS and parsers

async function init() {
    // parse url and store variable
    BOOKING_OBJ =  parseBase64(bookingInfoBase64)
    

    // will book or already booked
    // when it comes from my bookigns page the object should look like -> bookingInfo=base64String({bookingId: 'somebookingid'})
    if(Object.keys(BOOKING_OBJ).length > 1) {
        toBook = true;
        const propertyInfo = await getPropertyInfo(BOOKING_OBJ.propertyId)
        BOOKING_INFO =  {...propertyInfo, ...BOOKING_OBJ, taxPercent};
        console.log(BOOKING_INFO)
    } else {
        toBook = false;
        alert('pending')
    };

    // show the booking information
    displayBookingInfo(toBook, BOOKING_INFO);

    // register button actions


}

function parseBase64(base64String) {
    const obj = JSON.parse(atob(base64String))
    return obj;
}

async function getPropertyInfo(propertyId) {
    const propertyInfo = await propertyFuncion(propertyId);
    const addressString = [propertyInfo.address.street, propertyInfo.address.city, propertyInfo.address.state, propertyInfo.address.country].filter(element => element != "").join(', ');
    const primaryPhoto = propertyInfo.media[0] == "" ? "https://picsum.photos/1200/500?random=2" : propertyInfo.media[0];
    const propertyTitle = propertyInfo.propertytitle;
    const bookedAt = getTodayDate();

    return {addressString, primaryPhoto, propertyTitle, bookedAt};
}

function getBookingInfo() {

}

function getTodayDate() {
    const yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    const nDate = new Date(yourDate.getTime() - (offset*60*1000))
    return nDate.toISOString().split('T')[0]
}



// ======================== Register Event Listeners



// ======================== DOM Manipulation

function displayBookingInfo(toBook, bookingInfo) {
    if(toBook) {
        const confirmBtn = document.getElementById("confirm-btn");
        confirmBtn.classList.remove("hide");
    } else {
        const invoiceBtn = document.getElementById("invoice-btn");
        invoiceBtn.classList.remove("hide");
    }

    // change image and link
    const imgWrapper = document.querySelector("#property-image");
    const imgAnchor = imgWrapper.children[0];
    const imgElement = imgAnchor.children[0];
    imgAnchor.href = `/property.html?propertyId=${bookingInfo.propertyId}`;
    imgElement.src = bookingInfo.primaryPhoto;

    // change booking details
    // name
    const spaceNameElement = document.getElementById("booking-detail-space-name");
    spaceNameElement.href = `${window.location.origin}/property.html?propertyId=${bookingInfo.propertyId}`;
    spaceNameElement.innerText = bookingInfo.propertyTitle;
    // address and booked at
    const addressElement = document.getElementById("space-address")
    addressElement.innerText = bookingInfo.addressString;
    const bookedAt = document.getElementById("booked-at");
    bookedAt.innerText = bookingInfo.bookedAt;


    // change date details
    const bookedFrom = document.getElementById("booked-from");
    const bookedUpto = document.getElementById("booked-upto");
    const bookedFor = document.getElementById("booked-for");
    bookedFrom.innerText = bookingInfo.dateFrom;
    bookedUpto.innerText = bookingInfo.dateTo;
    bookedFor.innerText = bookingInfo.daysInfo + " days";


    // Price Details
    const basePrice = document.getElementById("base-price");
    basePrice.innerText = "CAD " + bookingInfo.basePrice;

    // conditionally show props
    if(bookingInfo?.equipments?.length) {
        // update the props list
        const propsList = document.querySelector(".detail-props ul");
        propsList.innerHTML = "";

        bookingInfo.equipments.forEach(obj => {
            const string = `<li>
                <span> ${obj.name} </span>
                <span> CAD ${obj.price} </span>
            </li>`
            propsList.innerHTML += string;
        })

        console.log(bookingInfo.equipments)
        // const propsList = 

        // show  the  props list
        const propsWrapper = document.getElementsByClassName("detail-props")[0];
        propsWrapper.classList.remove("hide");
    }



    const totalPropsPrice = bookingInfo.equipments.map(obj => Number(obj.price) ).reduce(function(a, b) { return a + b; }, 0);
    const priceWithProps = Number(bookingInfo.basePrice) + Number(totalPropsPrice);
    const priceForDays = priceWithProps * Number(bookingInfo.daysInfo);

    // dom insertion
    const priceForDaysElem = document.getElementById("price-for-days");
    const priceForDaysValueElem = document.getElementById("price-for-days-value");
    priceForDaysElem.innerHTML = ` Price for ${bookingInfo.daysInfo} days `;
    priceForDaysValueElem.innerHTML = ` ${priceWithProps} x ${bookingInfo.daysInfo} = CAD ${priceForDays} `;
    

    // calculate tax
    const taxPercent = BOOKING_INFO.taxPercent;
    const taxValue = (Number(priceForDays) * Number(taxPercent)) / 100;

    const taxPropertyElem = document.getElementById("tax-property");
    const taxValueElem = document.getElementById("tax-value");
    taxPropertyElem.innerText = ` GST ${taxPercent}% `;
    taxValueElem.innerText = ` ${priceForDays} x ${taxPercent}% = CAD ${taxValue} `;



    // price with tax
    const finalPrice = priceForDays + taxValue;
    const priceWithTaxElem = document.getElementById("price-with-tax");
    priceWithTaxElem.innerText = ` ${priceForDays} + ${taxValue} = CAD ${finalPrice} `;
}