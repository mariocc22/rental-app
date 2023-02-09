// Update properties from firestore
import { db, doc, updateDoc } from '../modules/firebase.js'

// Update a property
async function updateProperty(propertyId, fieldId, value){

    let property;
    property = doc(db, "PROPERTIES", propertyId);

    if(propertyId &&
        fieldId &&
        value)
    {
        await updateDoc(propertyId, fieldId, value, {
            fieldId: value
        });
    }
    else
    {
        property = "Error, property could not be updated";
    }

    return property.data();
}

export { updateProperty }