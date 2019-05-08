//'use strict';
//--  Dependencies --
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const redis = require('redis');
const async = require('async');
const client = redis.createClient();
const port = 8080;

function start() {
	
  const app = express();
  const server = http.createServer(app);
  let feedKey = 0;
	
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //****** Console Tracking for Development ****
  app.use((req, res, next) => {
    console.log('[' + process.pid + '] ' + req.method + ' ' + req.url);
    next();

  });

  client.on('error', (err) => {
    console.log("Redis Error " + err);

  });

  app.get('/', (req, res) => {
    res.sendFile('main.html', {
      root: "./public"
    });

  });
		
  app.post('/submit', (req, res) => {
    let userData = JSON.stringify(req.body);
    feedKey++;

    client.set("feedId:" + feedKey, userData, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Set result: ' + result);
    });
    res.sendFile('report.html', {
      root: "./public"
    });
  });
	
	app.get('/getdata', (req, res) => {
    var results = [];
		
    client.keys('*', (err, keys) => {
        if (err) return console.log(err);
			
        if(keys){
            async.map(keys, (key, callback) => {
							
               client.get(key, function (error, value) {
                    if (error) return callback(error);
								 
                    var result = {};
                    result['feedId'] = key;
                    result['data'] = JSON.parse(value);
                    callback(null, result);
                }); 
            }, (error, results) => {
               if (error) return console.log(error);
							
               console.log(results);
               //res.json({data:results});
							res.send(results);
            });
        }
    });
});

	

  // Call this middleware if there is a bad route
  app.use((req, res, next) => {
    //res.status(404).sendFile("error.html", {root:"./public"});    SEND AN NICE 404 FORM
    res.status(404).send("404 Error");
  });

  server.listen(port);
  console.log("Server is running on port: " + port);
};

module.exports = {
  start: start
};
