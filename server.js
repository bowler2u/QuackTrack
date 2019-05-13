const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('./redis/redis');
const scheduler = require('node-schedule');
const validate = require('./redis/validate');
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
			if (validate.dataCheck(formData[val])) {
				formData[val] = validate.cleanData(formData[val]);
			} else {
				console.log(`Invalid Data type: ${formData[val]}`);
				return;
			}
		}
		
		// Stringify & Submit Data
		const userData = JSON.stringify(formData);
		redis.setData(feedKey, userData);

		// Check for User enabling auto-submission. If so, start a scheduled data entry at 12:01pm each day,
		// using original entry data.
		const autoCheck = req.body.autoEntry;
		if (autoCheck) {
			scheduler.scheduleJob('1 12 * * *', (date) => {// SCHEDULER TEST: Set CRON to '* * * * *' to submit every min. 
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
