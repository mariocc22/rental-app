const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://652ae4aa.databases.neo4j.io';
const user = 'neo4j';
const password = 's3Y3vOOOy17qdzo0WdkXcPVSPAcHMoIJg50ClUHU6gY';

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export { driver }