const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('./redis/redis');
const scheduler = require('node-schedule');
const data = require('./redis/data');
const port = 8081;

const start = () => {

	// Initialize express
  const app = express();
  const server = http.createServer(app);

	// Give express access to the public folder
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

	// GET routes
  app.get('/', (req, res) => {
    res.sendFile('main.html', {
      root: './public'
    });
  });
	app.get('/report', (req, res) => {
		res.sendFile('report.html', {
			root: './public'
		});
	});
	app.get('/getdata', (req, res) => {
		redis.getData((data) => res.send(data));
	});

	// POST routes
  app.post('/submit', (req, res) => {
		const formData = req.body;
		let feedKey = +new Date();

		// Clean data
		for (let val in formData){
			if (data.dataCheck(formData[val])) {
				formData[val] = data.cleanData(formData[val]);
			} else {
				console.log(`Invalid Data type: ${formData[val]}`);
				return;
			}
		}
		
		// Stringify & Submit Data
		const userData = JSON.stringify(formData);
		redis.setData(feedKey, userData);

		// Check for User enabling auto-submission. If so, start a scheduled data entry at 12 each day,
		// using original data entry.
		const autoCheck = req.body.autoEntry;
		if (autoCheck) {
			scheduler.scheduleJob('* * * * *', (date) => {//** FOR TESTING CRON HAS BEEN SET FOR EVERY MINUTE **
				feedKey++
				console.log(`Automatic Entry: FeedKey:${feedKey} UserData:${userData}`);
				redis.setData(feedKey, userData);
			});
		}

		// Redirect to Report page
		res.sendFile('report.html', {
			root: './public'
		});
  });

  // Call this middleware if there is a bad route
  app.use((req, res, next) => {
    res.status(404).send('404 Error');
  });

  server.listen(port);
  console.log(`Server is running on port: ${port}`);
};

module.exports = { start };
