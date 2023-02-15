// File contains all neo4j queries used in Stage Application

import { driver } from '../modules/neo4j.js'

function filterPlacesPrepQuery(params) {
    let query = ''
    if (params.coords) {
        query = `
        UNWIND $tags as tag
        WITH tag
        MATCH (p:Properties)<-[:TAGGED_WITH]-(t:Tag { name: tag })
        WHERE point.distance(p.location, point({ longitude: $coords.longitude, latitude: $coords.latitude })) < $coords.distance
        WITH p
        RETURN COLLECT(p.id) as propertyIds`

    } else {
        query = `
        UNWIND $tags as tag
        WITH tag
        MATCH (p:Properties)<-[:TAGGED_WITH]-(t:Tag { name: tag })
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
        console.error('Somethign went wrong')
    } finally {
        await session.close()
    }
}

export {
    filterPlaces
}
