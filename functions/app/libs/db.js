const mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'flos_db',
    password : 'qY2q3g7XPERua$9',
    database : 'flos_db'
});

console.log("Connected to Mysql database server");
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;