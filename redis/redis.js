'use strict';

const async = require('async');
const redis = require('redis');

//CLIENT CONNECTION FOR TESTING
//const client = redis.createClient();

// CLIENT CONNECTION FOR DEPLOYMENT
const client = redis.createClient(6379, 'redis.8taj77.0001.usw2.cache.amazonaws.com', {
  no_ready_check: true
});


// Confirm client connection
client.on('connect', () => {
  console.log('Redis client connected');
});

// Catch redis client error
client.on('error', (err) => {
  console.log(`Redis Error: ${err}`);
});

// For Setting New Data Objects
const setData = (feedKey, userData) => {

  // Setting client object into redis 
  client.set(`feedId:${feedKey}`, userData, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    return console.log(`Set result:${result}:${userData}`);
  });
};

// Retrieve data 
const getData = (cb) => {

  // Empty array to collect data before pushing back to client
  var results = [];

  // Using the async module to map the return object
  // before pushing back to the client.
  client.keys('feedId:*', (err, keys) => {
    if (err) return console.log(err);

    if (keys) {
      async.map(keys, (key, callback) => {

        client.get(key, function(error, value) {
          if (error) return callback(error);

          var result = {};
          result['feedId'] = key;
          result['data'] = JSON.parse(value);
          callback(null, result);

        });
      }, (error, results) => {
        if (error) return console.log(error);
        cb(results);
      });
    }
  });

};

module.exports = {
  setData: setData,
  getData: getData
};