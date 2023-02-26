import {
    db,
    addDoc,
    collection
  } from "../modules/firebase.js";


// ... Post to DB //
async function SaveURLtoFirestore(url, propertyId) {
    // Here we can add the property ID, retrieving it from another module
    let name = namebox.value;
    let imageId;
  
    imageId = await addDoc(collection(db, "IMAGES"), {
      propertyid: propertyId,
      imageurl: url,
    });

    return imageId.id;
}

export { SaveURLtoFirestore }
  