'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require("fs");
const patch = require("path");
const MimeLookup = require('mime-lookup');
const mime = new MimeLookup(require('mime-db'));
const multer = require('multer')
const dfile = require("./app/libs/helpers");

const app = express();
const routes = require('./app/routes/approutes.js'); //importing route

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

app.use(morgan('combined'));
const config =require('./app/libs/app.config');
app.use('/favicon.ico', express.static('/favicon.ico'));

app.disable('x-powered-by')
app.use(multerMid.single('file'))


app.get('/', (req, res) => {
    res.status(200).send('Hello, world!').end();
});
app.post('/Version.txt', (req, res) => {
    console.log(`Запрошенный адрес: ${req.url}`);
    const filePath = req.url.substr(1);
    dfile.downloadfile("flos-app",filePath,req.body.patch);
    res.send({
        error: false,
        message: 'Success!'
    });
});

app.get("/newapk/:vername/:vercode/:filename",(req,res)=>{
    console.log(`Запрошенный адрес: ${req.url}`);
    const filePathVN = req.params["vername"].toString();
    const filePathVC = req.params["vercode"].toString();
    const fileName = req.params["filename"].toString();
    const filePatch = "apk/"+filePathVN+"/"+filePathVC+"/"+fileName;
    dfile.downloadfile("flos-app",filePatch,"/home/rykov_d/"+fileName,function(result){
            res.send(result);
    });
});

app.post('/setupdates', (req, res, next) => {
})

const PORT = process.env.PORT || config.get('http:port');

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

module.exports = app;
