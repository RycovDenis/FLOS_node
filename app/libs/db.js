const mysql = require('mysql');
const config = require('./app.config');

    const connection = mysql.createConnection({
        host     : config.get('mysql:host'),
        port : config.get('mysql:port'),
        user     : config.get('mysql:user'),
        password : config.get('mysql:password'),
        database : config.get('mysql:database'),
        charset: config.get('mysql:charset'),
        connectTimeout:config.get('mysql:timeout')
    });
    console.log("Connected to Mysql "+config.get('mysql:database')+" Remote server");
    connection.connect(function(err) {
        if (err) throw err;
    });
    module.exports = connection;





