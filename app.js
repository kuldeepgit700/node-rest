const express = require('express');
const feedRoute = require('./routes/feed');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Method',"OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Autherization');
    next();
});

app.use('/feed',feedRoute);

app.listen(9090);