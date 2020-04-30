'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({ origin: true }));
app.options('*', cors());
const accessLogStream = rfs.createStream('access.log', {
   interval: '1d', // rotate daily
   path: path.join(__dirname, 'log')
});
app.use(morgan('combined', { stream: accessLogStream }));

const config =require('./app/libs/app.config');

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!').end();
});
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
