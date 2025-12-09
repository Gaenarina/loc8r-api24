const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const dbPassword = process.env.MONGODB_PASSWORD;
const dBUri = `mongodb+srv://atlasuser:${dbPassword}@cluster0.oa3gv5y.mongodb.net/Loc8r`

mongoose.connect(dBUri);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dBUri}`);
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg) => {
  await mongoose.connection.close();
  console.log('Mongoose disconnected through ' + msg);
};

// For nodemon restarts
process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// For app termination
process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

// For Heroku app termination
process.on('SIGTERM', async () => {
  await gracefulShutdown('Heroku app shutdown');
  process.exit(0);
});

require('./locations');
require('./users');