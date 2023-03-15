// Create a new Property
import { doc, setDoc, db, collection, addDoc } from "../modules/firebase.js";

async function createProperty(
  _uid, //string
  _activity,
  _propertytitle,
  _propertydescription,
  _price, // property pricereview
  _media, // Object 5 images
  _dates, // Obj {from, to}
  _bundleinfo, // Obj {price, equipments[] }
  _address, // Obj {street,flatroom,city,state,postalcode,country,_lat,_long}
  _typeofspace,
  _amenities, // Amenities[]
  _equipments // Equip[{tagname, desc, price},{},{} ]
) {
  let q;
  let properties;

  if (_uid) {
    properties = await addDoc(collection(db, "PROPERTIES"), {
      // properties = await setDoc(doc(db, "PROPERTIES"), {
      uid: _uid, //string
      activity: _activity,
      propertytitle: _propertytitle,
      price: _price, // property pricereview
      propertydescription: _propertydescription,
      media: _media, // Object 5 images
      dates: _dates, // Obj {from, to}
      bundleinfo: _bundleinfo, // Obj {price, equipments[] }
      address: _address, // Obj {street,flatroom,city,state,postalcode,country,_lat,_long}
      typeofspace: _typeofspace,
      amenities: _amenities, // Amenities[]
      equipments: _equipments, // Equip[{tagname, desc, price},{},{} ]
    });
  } else {
    console.log("UID is mandatory");
  }

  // return properties data
  // return properties.data();
  console.log("Property created ID: ", properties.id);
  return properties.id;
}

export { createProperty };
