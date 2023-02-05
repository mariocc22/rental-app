console.log('Stage Prototype Started')

const FLAG = false

import { app, db, getDocs, collection, doc, setDoc, getDoc, query, where, orderBy } from '../modules/firebase.js'




// query to create place 
async function createPlace() {
    const placesRef = collection(db, "place");

    await setDoc(doc(placesRef, "002"), {
        description: "A big description",
        ownerInfo: "Owner Info",
        bundles: {},
        customs: {},
        lastUpdated: 100001,
        hide: false,
        availableTime: {
            allDay: { start: 10001, end: 10002 },
            sunday: { start: 10001, end: 10002 },
            monday: { start: 10001, end: 10002 },
        },
        tags: {
            price: 400,
            isCustomizable: true,
            customs: ['mic', 'stage', 'speakers',],
            activityType: {
                Photoshoot: true,
                Music: true,
                Performance: false,
            },
            spaceType: {
                Mansion: false,
                Bar: true
            }
        }
    });


    await setDoc(doc(placesRef, "003"), {
        description: "A third big description",
        ownerInfo: "Owner Info",
        bundles: {},
        customs: {},
        lastUpdated: 100001,
        hide: false,

        // sort this in front end
        availableTime: {
            allDay: { start: 10001, end: 10002 },
            sunday: { start: 10001, end: 10002 },
            monday: { start: 10001, end: 10002 },
        },

        tags: {
            
            // use both for price
            
            price: "438",
            priceRange: "430-440",


            isCustomizable: true,
            customs: ['mic', 'stage', 'speakers'],
            activityType: {
                Photoshoot: true,
                Music: true,
                Performance: false,
            },
            spaceType: {
                Mansion: false,
                Bar: true
            }
        }
    });

}



async function getDocById(docId) {

    const docRef = doc(db, "place", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    return docSnap;
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}


async function queryDocTags() {
    const placesRef = collection(db, "place");
    

    // # 1 
    // first query should be geolocation   -> because items would be very less and could be queried in front end


    // # 2

    // if geolocation radius increased to 25km
    // then find the tag.address_components from Google Maps API
    // and search for the string in tag.address_components
    
    // all other things in front end
    // vancouver


    // best match
    const q = query(collection(db, "place"), 
        where("hide", "==", false),
        where("rating", "in", [4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0]),
        
        // USE
        // tags.customs  == true
        // instead of 
        // where("tags.customs", "array-contains", "mic"),
        // where("tags.customs", "array-contains", "phone"),
        

        // where("tags.address_components", "==", "sunset-vancouver")
        // where("isMinimumReview10", "==", true)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });





}

async function startTest() {
    try {

        await queryDocTags()


    } catch (error) {
        console.log(error)
    }
}



startTest()
