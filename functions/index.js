// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');
// const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');


// app.use(cors({ origin: true }));

port = process.env.PORT || 5500;

// const mysql = require('mysql');
// // connection configurations
// const mc = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'flos_db',
//     password: 'qY2q3g7XPERua$9',
//     database: 'flos_db'
// });
//
// // connect to database
// mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const routes = require('./app/routes/approutes'); //importing route
routes(app);
// exports.app = functions.https.onRequest(app);

//register the route