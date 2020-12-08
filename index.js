const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const mongo = require('./library/mongodb');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use(cors({ credentials: true, origin: true }));

mongo.on('error', (err) => {
    console.log('Error conecting to DB');

})
    
const routers = require('./routes/routes');

app.use("/", routers);

const port = process.env.port || 4000;

mongo.once('open', () => {
    app.listen((port), () => {
        console.log('Mongo DB connected successfully');
        console.log(`Listening on port ${port}...`)
    })
})
