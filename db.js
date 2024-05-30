"use strict";

const {Client} = require('pg');
const {getDatabaseUri} = require('./config');

let db;

if(process.env.NODE_ENV === "production"){
    db = new Client({
        host: "/var/run/postgresql", //comment out for launch
        database: getDatabaseUri(), //comment out for launch
        //connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
}else{
    db = new Client({
    host: "/var/run/postgresql", //comment out for launch
    database: getDatabaseUri(), //comment out for launch
    //connectionString: getDatabaseUri()
    });
}
    
db.connect();
    
module.exports = db;