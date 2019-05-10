'use strict';

const async = require('async');
const redis = require('redis');
const client = redis.createClient();

// Confirm client connection
client.on('connect', () => {
    console.log('Redis client connected');
});

// Catch redis client error
client.on('error', (err) => {
    console.log(`Redis Error: ${err}`);
  });

// For Setting New Data Objects
function setData(feedKey, userData){
	
	client.set(`feedId:${feedKey}`, userData, (error, result) => {
				if (error) {
					console.log(error);
					return;
				}
				return console.log('Set result: ' + result);
			});
};

// For retrieving new data 
function getData(cb){
	
	var results = [];
	
	client.keys('feedId:*', (err, keys) => {
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
							cb(results);
            });
        }
    });
	
};

module.exports = {setData: setData, getData: getData};