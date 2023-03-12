// adds a new user to the firestore database
import { doc, setDoc, db } from '../modules/firebase.js'

// =============================================> User Collection
async function addProfile(userId, userInfo) {
    try {
        const userRef = doc(db, "USERS", userId);
        const rsp = await setDoc(userRef, userInfo, { merge: true })
        console.log(rsp)
        
    } catch (error) {
        console.log(error)
        throw new Error("Could not add profile")
    }

}



export { addProfile }