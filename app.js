const server = require('./server');
const cluster = require('cluster');
const cores = require('os').cpus().length;

// Initiating a cluster of processes for scaleability and load-balancing
if (cluster.isMaster) {
  console.log(`[${process.pid}] Main process started`);
  for (let i = 0; i<cores; i++) {
    cluster.fork();
  }
} else { // If it is a worker
  console.log(`[${process.pid}] Worker process started`);
  server.start();
}
