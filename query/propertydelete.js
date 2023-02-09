// Delete properties from firestore
import { db, doc, updateDoc, deleteField, deleteDoc } from '../modules/firebase.js'

// Delete a property
async function deleteProperty(propertyId){

    let property;
    if(propertyId)
    {
        property = await deleteDoc(doc(db, "PROPERTIES", propertyId));
    }
    else
    {
        property = "Error, property could not be deleted";
    }

    return property.data();
}

// Delete a properties field
async function deleteFiledProperty(propertyId, fieldId){

    let property;

    if(propertyId && fieldId)
    {
        property = await deleteDoc(doc(db, "PROPERTIES", propertyId));        
        property = doc(db, "PROPERTIES", propertyId);
        await updateDoc(property, fieldId, {
            fieldId: deleteField()
        });
    }
    else
    {
        property = "Error, field property could not be deleted";
    }

    return property.data();
}

export { deleteProperty, deleteFiledProperty }