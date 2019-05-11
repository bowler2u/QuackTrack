'use strict';

// Dependencies 
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const redisF = require('./redis/redis');
const scheduler = require('node-schedule');
const dataF = require('./redis/data');
const port = 8081;

function start() {
	
	// Initilize express and our feed id's
  const app = express();
  const server = http.createServer(app);
	
	// Creating a unique key based on the milisecond the key is called
  let feedKey = +new Date();
	
	// Give express access to the public folder
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

  // Handle form data
  let data = req.body;

  // Clean data
  for (let val in data) {
    if (dataF.dataCheck(data[val])) {
      data[val] = dataF.cleanData(data[val]);
    } else {
      alert(`Invalid Data type: ${data[val]}`);
      return;
    }
  };

  // Stringify data to JSON for transfer and saving
  let userData = JSON.stringify(data);

  // Check for User enabling auto-submission
  let autoCheck = req.body.autoEntry;

  if (autoCheck) {

    // Submit Data
    redisF.setData(feedKey, userData);
    // Start a scheduled data entry at 12 each day, using original data entry.
    scheduler.scheduleJob('* * * * *', function(date) { //** FOR TESTING CRON HAS BEEN SET FOR EVERY MINUTE **

      console.log(`Automatic Entry: FeedKey:${feedKey} UserData:${userData}`);
      redisF.setData(feedKey, userData);

    });

    res.sendFile('report.html', {
      root: "./public"
    });

  } else {

    redisF.setData(feedKey, userData);
    res.sendFile('report.html', {
      root: "./public"
    });

  }
});

// Retrieve data report
app.get('/getdata', (req, res) => {

  const data = redisF.getData(send);

  function send(data) {
    res.send(data);
  };

});

// Login route
app.post('/report', (req, res) => {
  //TODO HERE: Add secure login.
  res.sendFile('report.html', {
    root: "./public"
  });

});

// Call this middleware if there is a bad route
app.use((req, res, next) => {
  res.status(404).send("404 Error");
});

server.listen(port);
console.log(`Server is running on port: ${port}`);
};

module.exports = {
  start: start
};
