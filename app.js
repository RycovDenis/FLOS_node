'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// noinspection JSCheckFunctionSignatures
app.use(morgan('combined'));

const config =require('./app/libs/app.config');

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!').end();
});
app.use('/favicon.ico', express.static('/favicon.ico'));
// Start the server
const PORT = process.env.PORT || config.get('http:port');
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]


const routes = require('./app/routes/approutes.js'); //importing route
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


module.exports = app;
