const async = require('async');
const redis = require('redis');

// **CLIENT CONNECTION FOR LOCAL TESTING**
const client = redis.createClient();

// **CLIENT CONNECTION FOR DEPLOYMENT**
//const client = redis.createClient(6379, 'redis.8taj77.0001.usw2.cache.amazonaws.com', {
//  no_ready_check: true
//});

// Confirm client connection
client.on('connect', () => {
  console.log('Redis client connected');
});

// Catch redis client error
client.on('error', (err) => {
  console.log(`Redis Error: ${err}`);
});

/**
 * Function that sets new data objects to Redis
 *
 * @param {Date} feedKey - a unique key value assigned to the set object
 * @param {Object} userData - an object of values from user input
 */
const setData = (feedKey, userData) => {
	client.set(`feedId:${feedKey}`, userData, (error, result) => {
	  if (error) return console.log(error);
	  return console.log(`Set result:${result}:${userData}`);
	});
};

/**
 * Function that gets data objects from Redis
 *
 * @param {Function} cb - callback that sends object to front-end once redis results are returned
 */
const getData = (cb) => {

	// Using the async module to map the return object before pushing back to the client.
	client.keys('feedId:*', (err, keys) => {
	  if (err) return console.log(err);

	  if (keys) {
	    async.map(keys, (key, callback) => {
	      client.get(key, (error, value) => {
	        if (error) return callback(error);
	        const result = {
            feedId: key,
            data: JSON.parse(value),
          };
	        callback(null, result);
	      });
	    }, (error, results) => {
	      if (error) return console.log(error);
	      cb(results);
	    });
	  }
	});
};

module.exports = { setData, getData };
