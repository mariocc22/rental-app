// imports tags.json and returns tag object info based on tag names from database

import allTagsInfo from '../assets/jsons/tags.json';

function tagnameToInfo(tagname) {
    // console.log(tagNames)
    const split = tagname.split('-');
    const activity = split[0];
    const tagType = split[1];
    let name = undefined;
    // console.log(split.length)
    if(split.length == 4) {
        // name = capitalise(s)
        let firstWord = capitalise(split[2])
        let secondWord = capitalise(split[3]);
        name = `${firstWord} ${secondWord}`;

    } else if (split.length == 3) {
        name = capitalise(split[2])
    }
    const tagList = allTagsInfo[activity][tagType];

    const tagInfo = tagList.filter(tagObj => tagObj.name == name);
    return tagInfo[0] || {};
};


function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { tagnameToInfo }