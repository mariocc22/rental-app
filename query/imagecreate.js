import { db, addDoc, collection } from "../modules/firebase.js";

// ... Post to DB //
async function SaveURLtoFirestore(url, propertyId) {
  Promise.all([url.map((urlImg) => firestoreImg(urlImg, propertyId))])
    .then((url) => {
      console.log("uploaded to IMAGE");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

async function firestoreImg(urlImg, propertyId) {
  try {
    let imageId = await addDoc(collection(db, "IMAGES"), {
      propertyid: propertyId,
      imageurl: urlImg,
    });
  } catch (err) {
    console.log("Error uploading to Firestore: ", err.message);
  }
}

export { SaveURLtoFirestore };
