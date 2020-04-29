const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    path = require('path'),
    rfs = require('rotating-file-stream'),
    bodyParser = require('body-parser');

port = process.env.PORT || 8080;

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
}, { flags: 'a' });
app.use(morgan('combined', {
    stream: accessLogStream
}));
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'db4free.net',
    user: 'flos_db',
    password: 'qY2q3g7XPERua$9',
    database: 'flos_db'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route