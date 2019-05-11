# QuackTrack

A web app for tracking duck feeding patterns around the globe.

This full stack application uses AngularJS, Node, Express and Redis.

It was deployed on AWS using their ElasticBeanstalk environment for 
the Node app alongside the Elasticache service for the Redis Database.

Check out the live app here.. 

<a href="http://quacktrackdev-env.rkrrhmmiem.us-west-2.elasticbeanstalk.com/">QuackTrack on AWS</a>

# Application features

Automated Form Entry:
	
For those of you who feed the ducks on a consistent schedule, 
use our automated form entry so you don't have to sign on each day. 
Once selected it will autocomplete and submit the same form daily.
	
Organized Feed Reports:
	
Ensures you duck feed data reports are organized in our dynamic feed table. 
Very useful for completing your PHD on ducks ;)

## Project setup
```
Clone this repo locally to a directory using CLI or manually

Navigate inside your chosen directory through CLI...

npm install
```
## Redis setup
```
mkdir redis && cd redis
curl -O http://download.redis.io/redis-stable.tar.gz
tar xzvf redis-stable.tar.gz
cd redis-stable
make
make test
sudo make install
```

## Start Redis in separate window 
```
redis-server
```
## Test Redis is running 
```
redis-cli ping
```

### To run the app
```
npm start
```

### Run your tests
```
npm test
```

### Explore App 

Explore your app on <a href="http://localhost:8081">http://localhost:8081</a>

