const mysql = require('mysql2');
const env = require('dotenv').config();

const connection = mysql.createConnection({
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DBPORT
});

module.exports = connection;
