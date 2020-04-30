// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
const app = express();
const bodyParser = require('body-parser');
const config = require('./app/libs/app.config');

// app.use(cors({ origin: true }));

port = process.env.PORT || config.get('http:port');

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});

// const mysql = require('mysql');
// // connection configurations
// const mc = mysql.createConnection({
//     host: 'localhost',
//     user: 'flos_db',
//     password: 'qY2q3g7XPERua$9',
//     database: 'flos_db'
// });
//
// // connect to database
// mc.connect();
app.use(morgan('combined', { stream: accessLogStream }));
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const routes = require('./app/routes/approutes'); //importing route
routes(app);
// exports.app = functions.https.onRequest(app);

//register the route