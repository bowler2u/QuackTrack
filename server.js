'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const redis = require("redis");
const client = redis.createClient();
const port = 8080; 
      
function start()
{
    var app = express();
    var server = http.createServer(app);
    app.use(express.static('public'));
    
    
    
    app.use((req, res, next) =>
    {
        console.log('[' + process.pid + '] ' + req.method + ' ' + req.url);
        next();
    });
       
    app.get('/', (req, res) => 
    {
        res.sendFile('main.html', {root:"./public"});
        
    })
    
    
    // Call this middleware if there is a bad route
    app.use((req, res, next) => {
        
        //res.status(404).sendFile("error.html", {root:"./htdocs"});    SEND AN NICE 404 FORM
        res.status(404).send("404 Error");
    });

    
    server.listen(port);
    console.log("Server is running on port: " + port);
}

module.exports = {"start":start};
