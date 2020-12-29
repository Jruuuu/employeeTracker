const util = require("util");
const mysql = require("mysql");

//create new mysql connection to local host
const connection = mysql.createConnection({
    //host
    host: "localhost",
    //username
    user: "root",
    //password
    password: "grace",
    //local db name
    database: "employees"
});

//connect to local DB
connection.connect();

//make the query method in mysql lib to be a promise
connection.query = util.promisify(connection.query);

module.exports = connection;