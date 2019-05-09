'use strict';
const cluster = require('cluster');
const cores = require('os').cpus().length;

// Setting up a cluster of processies for scaleability and load-balancing 

if(cluster.isMaster) 
{
    console.log(' [' + process.pid + '] Main process started');
    for(var i = 0; i< cores; i++)
        {
            cluster.fork();
        }
}
else // If it is a worker
{
    console.log(' [' + process.pid + '] Worker process started');
    const server = require('./server');
    server.start(); 
}

