// Create a new Property
import { doc, setDoc } from '../modules/firebase.js'

async function createProperty(  _uid, //string
                                _description, //string
                                _media, //aray
                                _ocupancy, //number
                                _price, //number
                                _rooms, //number
                                _sf, //number
                                _washrooms, //number
                                _tags // object
                                ) {
    let q;
    let properties;

    if(uid)
    {
        properties = await setDoc(doc(db, "PROPERTIES"), {
            uid: _uid,
            description: _description,
            media: _media,
            ocupancy: _ocupancy,
            price: _price,
            rooms: _rooms,
            sf: _sf,
            washrooms: _washrooms,
            tags: _tags
        });
    }
    else{
        console.log("UID is mandatory")
    }

    // return properties data
    return properties.data();
}

export { createProperty }