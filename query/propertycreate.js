// Create a new Property
import { doc, setDoc, db, collection, addDoc } from '../modules/firebase.js'

async function createProperty(  _uid, //string
                                _indoor,
                                _outdoor,
                                _studio,
                                _house,
                                _beachhouse,
                                _other,
                                _street,
                                _flatroom,
                                _city,
                                _state,
                                _postalcode,
                                _country,                                
                                _propertytitle,
                                _propertydescription,
                                _foodphotography, //tag
                                _commercial, //tag
                                _fashion, //tag
                                _portrait, //tag
                                _lifestyle, //tag
                                _newborn, //tag
                                _wedding, //tag
                                _media, // Object 5 images
                                _light, // Light Object: ceilingflash, floorflash
                                _lightshapers, // Light Shaper Object: umbrella, beautydish, softbox, lightbox
                                _camerastand, // Camera Stand Object: tripod
                                _camera, // Camera Object: fullframe, cropdslr
                                _lens, // Lens Object: wideangle, normal
                                _others, // Other Object
                                _wifi, // Amenities
                                _elevator, // Amenities
                                _washroom, // Amenities
                                _kitchen, // Amenities
                                _airconditioner, // Amenities
                                _parking, // Amenities
                                _naturallight, // Amenities
                                _price, // property price
                                _from, // availability from 
                                _to, // availability to
                                _dealdays, // Deals
                                _dealprice, // Deals
                                _enabledeal // Deals
                                ) {
    let q;
    let properties;

    if(_uid)
    {
        properties = await addDoc(collection(db, "PROPERTIES"), {
        // properties = await setDoc(doc(db, "PROPERTIES"), {
                                uid: _uid, //string
                                indoor: _indoor,
                                outdoor: _outdoor,
                                studio: _studio,
                                house: _house,
                                beachhouse: _beachhouse,
                                other: _other,
                                street: _street,
                                flatroom: _flatroom,
                                city: _city,
                                state: _state,
                                postalcode: _postalcode,
                                country: _country,
                                propertytitle: _propertytitle,
                                propertydescription: _propertydescription,
                                foodphotography: _foodphotography, //tag
                                commercial: _commercial, //tag
                                fashion: _fashion, //tag
                                portrait: _portrait, //tag
                                lifestyle: _lifestyle, //tag
                                newborn: _newborn, //tag
                                wedding: _wedding, //tag
                                media: _media, // Object 5 images
                                light: _light, // Light Object: ceilingflash, floorflash
                                lightshapers: _lightshapers,
                                camerastand: _camerastand, // Camera Stand Object: tripod
                                camera: _camera, // Camera Object: fullframe, cropdslr
                                lens: _lens, // Lens Object: wideangle, normal
                                other: _others, // Other Object: 
                                wifi: _wifi, // Amenities
                                elevator: _elevator, // Amenities
                                washroom: _washroom, // Amenities
                                kitchen: _kitchen, // Amenities
                                airconditioner: _airconditioner, // Amenities
                                parking: _parking, // Amenities
                                naturallight: _naturallight, // Amenities
                                price: _price, // property price
                                from: _from, // availability from 
                                to: _to, // availability to
                                dealdays: _dealdays, // Deals
                                dealprice: _dealprice, // Deals
                                enabledeal: _enabledeal // Deals
        });
    }
    else{
        console.log("UID is mandatory")
    }

    // return properties data
    // return properties.data();
    return properties.id;
}

export { createProperty }