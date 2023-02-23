// File contains all neo4j queries used in Stage Application

import { session } from 'neo4j-driver';
import { driver } from '../modules/neo4j.js'

// import utility
import { validateTagNames } from '../utility/validateTagNames.js';

function filterPlacesPrepQuery(params) {
    let query = ''
    if (params.coords) {
        query = `
        UNWIND $tags as tag
        WITH tag
        MATCH (p:Property)<-[:TAGGED_WITH]-(t:Tag { name: tag })
        WHERE point.distance(p.location, point({ longitude: $coords.longitude, latitude: $coords.latitude })) < $coords.distance
        WITH p
        RETURN COLLECT(p.id) as propertyIds`

    } else {
        query = `
        UNWIND $tags as tag
        WITH tag
        MATCH (p:Property)<-[:TAGGED_WITH]-(t:Tag { name: tag })
        WITH p
        RETURN COLLECT(p.id) as propertyIds`
    }

    return query;

}

/*
params template:

distance in metres
tags are in key-value pair

params example: 

params = { tags: ['amenities-washroom'], coords: { latitude: 37.563534, longitude: -122.322269, distance: 2000 } }

todo
probably add the activity like addPlace

*/
async function filterPlaces(params) {

    const session = driver.session({ database: 'neo4j' });

    try {

        console.log(params)

        // todo validation for params        

        const readQuery = filterPlacesPrepQuery(params);
        console.log(readQuery)

        const readResult = await session.executeRead(tx =>
            tx.run(readQuery, { ...params })
        );

        const propertyIds = readResult.records.map(record => {
            const propertyIds = record.get('propertyIds');
            return propertyIds
        });

        console.log(propertyIds)

    } catch (error) {
        console.log(error)
        console.error('Error in filterPlaces Neo4j Query');
    } finally {
        await session.close()
    }
}

/*
    add the owner places or Property in the list

    y -> latitude
    x -> longitude

    tagNames = [...array of tag names]

*/

// todo validate actiivitname with the top level key in tags.json

async function addPlace(placeId, placeName, userId, tagNames, activityName) {

    const isTagsValid = validateTagNames(tagNames);
    if(!isTagsValid) {
        throw new Error("Tags are not valid")
        return false;
    }

    const givenTagNames = [...tagNames]
    givenTagNames.push(`activity-${activityName}`);


    const session = driver.session({database: neo4j})

    try {

        const writeQuery = `
        MATCH(u:User{id: $userId})
        WITH u
        CREATE (p:Property{id: $placeId, $name: $placeName })
        WITH u, p
        MERGE (p)-[:OWNED_BY]->(u)
        WITH p
        UNWIND $tagNames as tagName
        MERGE(t:Tag{name: tagName})
        WITH t
        MERGE (p)<-[:TAGGED_WITH]-(t)
        RETURN p.id as propertyId;`

        const writeResponse = await session.executeWrite(tx => {
            tx.run(
                writeQuery,
                {
                    placeId,
                    placeName,
                    userId,
                    tagNames: givenTagNames
                }
            )
        })

        const propertyId = writeResponse.records.map(record => {
            const propertyId = record.get('propertyId');
            return propertyId
        });

        console.log(propertyId[0])
        
    } catch (error) {
        console.log(error)
        console.error('Error in addPlace Neo4j Query');
        
    } finally {
        await session.close()
    }
}



export {
    filterPlaces,
    addPlace
}
