// Return all images from firestore
import { db, doc, getDoc, getDocs} from '../modules/firebase.js'

// All Images and Single image
let q;
let images;
async function imagesFuncion(documentId, fieldId, fieldIdOperator, fieldIdValue){
    
    // Single image
    if(documentId)
    {
        const docRef = doc(db, "IMAGES", documentId);
        images = await getDoc(docRef);
        // console.log(images.data())
    }
    // By field Id and boolean true
    else if(fieldId && fieldIdOperator && fieldIdValue)
    {
        // q = query(collection(db,"images"), where(fieldIdBoolean, "==", true));
        q = query(collection(db,"IMAGES"), where(fieldId, fieldIdOperator, fieldIdValue));
        images = await getDocs(q);
    }
    // All images
    else{
        q = query(collection(db,"IMAGES"));
        images = await getDocs(q);
        // console.log(images.data())
    }

    // return images data
    return images.data();
}

export { imagesFuncion }