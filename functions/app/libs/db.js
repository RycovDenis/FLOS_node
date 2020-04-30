const mysql = require('mysql');
const config = require('./app.config');
;
var msqls_cnf = config.get('local');
if(!msqls_cnf){
    var connection = mysql.createConnection({
        host     : config.get('mysql_remote:host'),
        user     : config.get('mysql:user'),
        password : config.get('mysql:password'),
        database : config.get('mysql:database')
    });
    console.log("Connected to Mysql "+config.get('mysql:database')+" Remote server");

}else {
    var connection = mysql.createConnection({
        host     : config.get('mysql_local:host'),
        user     : config.get('mysql:user'),
        password : config.get('mysql:password'),
        database : config.get('mysql:database')
    });
    console.log("Connected to Mysql "+config.get('mysql:database') +"Local server");
}
//local mysql db connection

connection.connect(function(err) {
    if (err) throw err;
});


module.exports = connection;