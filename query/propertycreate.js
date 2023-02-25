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
                                _tags, // object
                                _photography_type_indoor,
                                _photography_type_outdoor,
                                _photography_type_studio,
                                _photography_type_house,
                                _photography_type_beach_house,
                                _photography_equipments_lights,
                                _photography_equipments_light_stand,
                                _photography_equipments_camera_stand,
                                _photography_equipments_light_shaper_umbrella,
                                _photography_equipments_lens,
                                _photography_equipments_Backdrop,
                                _photography_amenities_wifi,
                                _photography_amenities_elevator,
                                _photography_amenities_washroom,
                                _photography_amenities_kitchen,
                                _photography_amenities_changing_room,
                                _performance_type_indoor,
                                _performance_type_outdoor,
                                _performance_type_studio,
                                _performance_type_house,
                                _performance_type_beach_house,
                                _performance_equipments_lights,
                                _performance_equipments_light_stand,
                                _performance_equipments_camera_stand,
                                _performance_equipments_light_shaper_umbrella,
                                _performance_equipments_lens,
                                _performance_equipments_Backdrop,
                                _performance_amenities_wifi,
                                _performance_amenities_elevator,
                                _performance_amenities_washroom,
                                _performance_amenities_kitchen,
                                _performance_amenities_changing_room,
                                _musician_type_indoor,
                                _musician_type_outdoor,
                                _musician_type_studio,
                                _musician_type_house,
                                _musician_type_beach_house,
                                _musician_equipments_lights,
                                _musician_equipments_light_stand,
                                _musician_equipments_camera_stand,
                                _musician_equipments_light_shaper_umbrella,
                                _musician_equipments_lens,
                                _musician_equipments_Backdrop,
                                _musician_amenities_wifi,
                                _musician_amenities_elevator,
                                _musician_amenities_washroom,
                                _musician_amenities_kitchen,
                                _musician_amenities_changing_room
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
            tags: _tags,
            photography_type_indoor: _photography_type_indoor,
            photography_type_outdoor: _photography_type_outdoor,
            photography_type_studio: _photography_type_studio,
            photography_type_house: _photography_type_house,
            photography_type_beach_house: _photography_type_beach_house,
            photography_equipments_lights: _photography_equipments_lights,
            photography_equipments_light_stand: _photography_equipments_light_stand,
            photography_equipments_camera_stand: _photography_equipments_camera_stand,
            photography_equipments_light_shaper_umbrella: _photography_equipments_light_shaper_umbrella,
            photography_equipments_lens: _photography_equipments_lens,
            photography_equipments_Backdrop: _photography_equipments_Backdrop,
            photography_amenities_wifi: _photography_amenities_wifi,
            photography_amenities_elevator: _photography_amenities_elevator,
            photography_amenities_washroom: _photography_amenities_washroom,
            photography_amenities_kitchen: _photography_amenities_kitchen,
            photography_amenities_changing_room: _photography_amenities_changing_room,
            performance_type_indoor: _performance_type_indoor,
            performance_type_outdoor: _performance_type_outdoor,
            performance_type_studio: _performance_type_studio,
            performance_type_house: _performance_type_house,
            performance_type_beach_house: _performance_type_beach_house,
            performance_equipments_lights: _performance_equipments_lights,
            performance_equipments_light_stand: _performance_equipments_light_stand,
            performance_equipments_camera_stand: _performance_equipments_camera_stand,
            performance_equipments_light_shaper_umbrella: _performance_equipments_light_shaper_umbrella,
            performance_equipments_lens: _performance_equipments_lens,
            performance_equipments_Backdrop: _performance_equipments_Backdrop,
            performance_amenities_wifi: _performance_amenities_wifi,
            performance_amenities_elevator: _performance_amenities_elevator,
            performance_amenities_washroom: _performance_amenities_washroom,
            performance_amenities_kitchen: _performance_amenities_kitchen,
            performance_amenities_changing_room: _performance_amenities_changing_room,
            musician_type_indoor: _musician_type_indoor,
            musician_type_outdoor: _musician_type_outdoor,
            musician_type_studio: _musician_type_studio,
            musician_type_house: _musician_type_house,
            musician_type_beach_house: _musician_type_beach_house,
            musician_equipments_lights: _musician_equipments_lights,
            musician_equipments_light_stand: _musician_equipments_light_stand,
            musician_equipments_camera_stand: _musician_equipments_camera_stand,
            musician_equipments_light_shaper_umbrella: _musician_equipments_light_shaper_umbrella,
            musician_equipments_lens: _musician_equipments_lens,
            musician_equipments_Backdrop: _musician_equipments_Backdrop,
            musician_amenities_wifi: _musician_amenities_wifi,
            musician_amenities_elevator: _musician_amenities_elevator,
            musician_amenities_washroom: _musician_amenities_washroom,
            musician_amenities_kitchen: _musician_amenities_kitchen,
            musician_amenities_changing_roo: _musician_amenities_changing_room
        });
    }
    else{
        console.log("UID is mandatory")
    }

    // return properties data
    return properties.data();
}

export { createProperty }