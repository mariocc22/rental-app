import { doc, setDoc, db, collection, addDoc, getDoc, updateDoc, arrayUnion } from '../modules/firebase.js'

// get booking information using multiple ids ==============================================> Booking Collection
async function getBookingInfo(originalBookingsIds) {
    try {
        const allBookingInfo = {};
        const bookingIds = originalBookingsIds.reverse();

        for(let i = 0; i < bookingIds.length; i++) {
            const bookingId = bookingIds[i];
            const bookinRef = doc(db, "BOOKING", bookingId);
            const bookingDoc = await getDoc(bookinRef);

            if(bookingDoc.exists()) {
                const bookingInfo = bookingDoc.data();
                // const {finalPrice, propertyTitle, bookedAt, primaryPhoto, propertyId } = bookingInfo
                allBookingInfo[bookingId] = bookingInfo;
            }
        }
        return allBookingInfo;
        
    } catch (error) {
        console.log(error);
        throw new Error("Could not read booking info of this id");
    }
};

// save a new booking of a user into the Booking Collection =================================> Booking Collection
async function saveBookingInfo(bookingInfo) {
    try {
        const bookingRsp = await addDoc(collection(db, "BOOKING"), bookingInfo);
        console.log(bookingRsp)
        return bookingRsp.id;
    } catch (error) {
        console.log(error);
        throw new Error("Could not save a new booking")
    }
};


// adds a the bookings id into the user profile =============================================> User Collection
async function saveMyBooking(userId, bookingId) {
    try {
        const userRef = doc(db, "USERS", userId);

        const response = await updateDoc(userRef, {
            myBookings: arrayUnion(bookingId)
        })
        return true
        
    } catch (error) {
        console.log(error)
        throw new Error("Could not add a booking into user profile");
    }
}


// fetches all the booking ids from my profile -> param userId ==============================> User Collection
async function getMyBookings(userId) {
    try {

        const userRef = doc(db, "USERS", userId);
        const userDoc = await getDoc(userRef);
        if(userDoc.exists()) {
            const myBookings = userDoc.data().myBookings;
            return myBookings;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error)
        throw new Error("Could not get bookings of this user");
    }
}


export { getBookingInfo, saveBookingInfo, getMyBookings, saveMyBooking }