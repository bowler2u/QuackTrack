const scheduler = require('node-schedule');

function autoEntry(feedId){
	
	console.log(feedId);
	var test = 'testVariable';
	
	let j = scheduler.scheduleJob('* * * * *', function(date, test){
		console.log(test);
  console.log(date + ': Automatic Form Entry');
});
	
}

module.exports = {autoEntry: autoEntry};