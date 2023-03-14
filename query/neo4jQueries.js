// File contains all neo4j queries used in Stage Application

import { driver } from "../modules/neo4j.js";

// import utility
import { validateTagNames } from "../utility/validateTagNames.js";

/**
 * Add User Function
 * adds a new user in Neo4j Database
 * @param {userId}
 * userId: firebase uid of the user
 * @returns userId
 */

async function addUser(userId) {
  const session = driver.session({ database: "neo4j" });
  try {
    const writeQuery = `MERGE (u:User { id: $userId }) RETURN u.id as userId`;

    const writeResponse = await session.executeWrite((tx) =>
      tx.run(writeQuery, { userId })
    );

    const rsp_userId = writeResponse.records.map((record) =>
      record.get("userId")
    );
    console.log(rsp_userId[0]);

    console.log(rsp_userId);

    return rsp_userId[0];
  } catch (error) {
    console.error(error);
    console.log("Error in add User Neo4j Query");
  } finally {
    await session.close();
  }
}

function filterPlacesPrepQuery(distance, coords) {
  let query = "";
  if (coords) {
    query = `
        MATCH (p:Property)<-[:TAGGED_WITH]-(t:Tag)
        WHERE point.distance(p.location, point({ longitude: $coords.lng, latitude: $coords.lat })) < $distance
        WITH p, t
        WHERE toLower(p.name) CONTAINS toLower($string) and p.price <= $price and t.name IN $tags
        WITH p, COUNT(DISTINCT t) AS tagCount
        WHERE tagCount = $tagsLength
        RETURN COLLECT(p.id) as propertyIds;`;
  } else {
    query = `
        MATCH (p:Property)<-[:TAGGED_WITH]-(t:Tag)
        WHERE toLower(p.name) CONTAINS toLower($string) and p.price <= $price and t.name IN $tags
        WITH p, COUNT(DISTINCT t) AS tagCount
        WHERE tagCount = $tagsLength
        RETURN COLLECT(p.id) as propertyIds;`;
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
async function filterPlaces(tags, price, string, distance, coords) {
  const session = driver.session({ database: "neo4j" });

  try {
    const readQuery = filterPlacesPrepQuery(distance, coords);

    const readResult = await session.executeRead((tx) =>
      tx.run(readQuery, {
        tags,
        tagsLength: tags.length,
        string,
        price: Number(price),
        distance: distance * 1000,
        coords,
      })
    );

    const propertyIds = readResult.records.map((record) => {
      const propertyIds = record.get("propertyIds");
      return propertyIds;
    });
    // console.log(propertyIds)

    return propertyIds[0];
  } catch (error) {
    console.log(error);
    console.error("Error in filterPlaces Neo4j Query");
  } finally {
    await session.close();
  }
}

/*
    add the owner places or Property in the list

    y -> latitude
    x -> longitude

    tagNames = [...array of tag names]

*/

// todo validate activityName with the top level key in tags.json

async function addPlace(
  placeId,
  price,
  placeName,
  userId,
  typeofspace,
  amenities,
  equipments,
  activityName,
  coordinates
) {
  const tagNames = [typeofspace, ...amenities, `activity-${activityName}`];
  equipments.forEach((tagobj) => {
    tagNames.push(tagobj.tagname);
  });

  // todo validation pending
  // const isTagsValid = validateTagNames(tagNames);

  // if(!isTagsValid) {
  //     throw new Error("Tags are not valid")
  //     return false;
  // }

  const givenTagNames = [...tagNames];
  // givenTagNames.push(`activity-${activityName}`);

  const session = driver.session({ database: "neo4j" });

  try {
    const writeQuery = `
        MATCH(u:User{id: $userId})
        WITH u
        CREATE (p:Property{id: $placeId, name: $placeName , price: $price })
        SET p.location = Point({latitude: $lat, longitude: $long})
        WITH u, p
        MERGE (p)-[:OWNED_BY]->(u)
        WITH p
        UNWIND $tagNames as tagName
        MERGE(t:Tag{name: tagName})
        WITH t, p
        MERGE (p)<-[:TAGGED_WITH]-(t)
        WITH COLLECT(t) as dump, p
        RETURN p.id as propertyId;`;

    const writeResponse = await session.executeWrite((tx) =>
      tx.run(writeQuery, {
        placeId,
        price: Number(price),
        placeName,
        userId,
        tagNames: givenTagNames,
        lat: +coordinates.lat,
        long: +coordinates.long,
      })
    );

    const propertyId = writeResponse.records.map((record) => {
      const propertyId = record.get("propertyId");
      return propertyId;
    });

    console.log(propertyId[0]);

    return propertyId[0];
  } catch (error) {
    console.log(error);
    console.error("Error in addPlace Neo4j Query");
  } finally {
    await session.close();
  }
}

/**
 * Connect Place with Booking and User
 * @param {userId, bookingId, placeId, bookingTo, bookingFrom}
 *  userId: firebase uid of the user
 * bookingId: random uuid4 generated from front-end
 * placeId: uuid4 of the place
 * bookingTo: timestamp of 10 digits
 * bookingFrom: timestamp of 10 digits
 * @returns placeId
 */

async function addBooking(userId, bookingId, placeId, bookingTo, bookingFrom) {
  const session = driver.session({ database: "neo4j" });
  try {
    const writeQuery = `
        MATCH(u:User{id: $userId})
        WITH u
        MATCH (p:Property{id: $placeId })
        WITH u, p
        CREATE (b:Booking{id: $bookingId, to:$bookingTo, from:$bookingFrom })
        WITH u, p, b
        MERGE (u)-[:MY_BOOKING]->(b)<-[:BOOKING_INFO]-(p)
        WITH p
        RETURN p.id as propertyId;`;

    const writeResponse = await session.executeWrite((tx) => {
      tx.run(writeQuery),
        {
          userId,
          bookingId,
          placeId,
          bookingTo,
          bookingFrom,
        };
    });

    const propertyId = writeResponse.records.map((record) => {
      const propertyId = record.get("propertyId");
      return propertyId;
    });

    console.log(propertyId[0]);
    return propertyId[0];
  } catch (error) {
    console.error(error);
    console.log("Error in addBooking Neo4j Query");
  } finally {
    await session.close();
  }
}

/**
 * Connect Showcase with Place and User
 * @param {userId, showcaseId, placeId}
 *  userId: firebase uid of the user
 * showcaseId: random uuid4 generated from front-end
 * placeId: uuid4 of the place
 * @returns showcaseId
 */

async function addShowcase(userId, showcaseId, placeId) {
  const session = driver.session({ database: "neo4j" });
  try {
    const writeQuery = `
        MATCH(u:User{id: $userId})
        WITH u
        MATCH (p:Property{id: $placeId })
        WITH u, p
        CREATE (s:Showcase{id: $showcaseId })
        WITH u, p, b
        MERGE (u)-[:MY_Showcase]->(s)<-[:Showcase_info]-(p)
        WITH s
        RETURN s.id as showcaseId;`;

    const writeResponse = await session.executeWrite((tx) => {
      tx.run(writeQuery, {
        placeId,
        userId,
        showcaseId,
      });
    });

    const showcaseId = writeResponse.records.map((record) =>
      record.get("showcaseId")
    );

    console.log(showcaseId[0]);

    return showcaseId[0];
  } catch (error) {
    console.error(error);
    console.log("Error in addShowcase Neo4j Query");
  } finally {
    await session.close();
  }
}

// todo improve query by showing latest 50
// => would need to index the timestamp prop

/**
 * Get Showcases List for Get Inspired Section
 * Returns a list of 50 showcases to the user
 * @param {}
 * @returns {[showcaseId]}
 */

async function getShowcasesList() {
  const session = driver.session({ database: "neo4j" });
  try {
    const readQuery = `
        MATCH(s:Showcase)
        WITH s
        LIMIT 50
        RETURN COLLECT(s.id) as showcaseIds;`;

    const readResponse = await session.executeRead((tx) => {
      tx.run(readQuery);
    });

    const showcaseIds = readResponse.records.map((record) =>
      record.get("showcaseIds")
    );

    console.log(showcaseIds[0]);

    return showcaseIds[0];
  } catch (error) {
    console.error(error);
    console.log("Error in getShowcasesList Neo4j Query");
  } finally {
    await session.close();
  }
}

export {
  addUser,
  filterPlaces,
  addPlace,
  addBooking,
  addShowcase,
  getShowcasesList,
};
