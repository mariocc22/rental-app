import { doc, setDoc, db, collection, addDoc, updateDoc, arrayUnion } from '../modules/firebase.js'

// get a booking information ===============================================================> Booking Collection
async function getBookingInfo(bookingId) {
    try {

        
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
        
    } catch (error) {
        console.log(error)
        throw new Error("Could not get bookings of this user");
    }
}


export { getBookingInfo, saveBookingInfo, getMyBookings, saveMyBooking }