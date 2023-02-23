// convert unix timstamp to human readable canadian date format 

import tagNames from '../assets/jsons/tags.json'

function validateTagNames(givenTagNames) {
    // console.log(tagNames)

    let allTagUniqueNames = [];

    // flatten the tags first
    for (let activity in tagNames) {
        const activityTags = tagNames[activity];
        for(let tagType in activityTags) {
            const tagList = activityTags[tagType];
            const tagNames = tagList.map(obj => obj.tagname);
            // console.log(tagNames)
            allTagUniqueNames = [...allTagUniqueNames, ...tagNames];
        }
    }

    // compare given list with whole list
    const difference = givenTagNames.filter(x => !allTagUniqueNames.includes(x));

    // if difference exists
    if(difference.length) {
        console.log(difference)
        return false
    } else {
        return true
    }
}


// const x = ["type-beach-house", "photography-equipments-lights"]

export { validateTagNames }

