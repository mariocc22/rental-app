import {} from '../modules/firebase'

async function postOwnerPlace(description, ownerInfo) {
    // firebase module

    const placesRef = collection(db, "place");

    await setDoc(doc(placesRef, "002"), {
        description: description,
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

    
}

export { postOwnerPlace }