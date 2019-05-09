'use strict';

//--  Dependencies --
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const redisFunc = require('./servJS/redis')
const scheduler = require('node-schedule');
const servUtil = require('./servJS/servUtil');
const port = 8080;

function start() {
	
	// Initilize express and our feed id's
  const app = express();
  const server = http.createServer(app);
  let feedKey = 0;
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
	
	// Load our Index page
  app.get('/', (req, res) => {
		
    res.sendFile('main.html', {
      root: "./public"
    });

  });
	
	// Submit data
  app.post('/submit', (req, res) => {
		
		let autoCheck = req.body.autoEntry;
		let userData = JSON.stringify(req.body);
		
		if(autoCheck){
			
			feedKey++;
			redisFunc.setData(feedKey, userData);
			
			// Start a scheduled data entry at 12 each day, using original data entry. 
			scheduler.scheduleJob('* 1 * * *', function(date){
				feedKey++;
				console.log('Automatic Entry: FeedKey: ' + feedKey + ' || UserData: ' + userData);
				redisFunc.setData(feedKey, userData);
			});
			
			res.sendFile('success.html', {
				root: "./public"
			});
			
		}else{
			
			feedKey++;
			redisFunc.setData(feedKey, userData);
			
			res.sendFile('success.html', {
				root: "./public"
			});	
			
			}
  });
	
	// Retrieve data report
	app.get('/getdata', (req, res) => {
    
		const data = redisFunc.getData(send);
		
		function send(data){
			res.send(data);
		};	
});
		
	// Login route
	app.post('/login', (req, res) => {
		//TODO:  Add in login & Security 
		res.sendFile('report.html', {
      root: "./public"
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
