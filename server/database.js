import mongoose from 'mongoose';
import winston from 'winston';


mongoose.Promise = require('bluebird');

module.exports = (uri) => {
  mongoose
   .connect(uri, {
     useMongoClient: true,
   });

  mongoose.connection.on('connected', () => {
    winston.log('info', `Mongoose! Connected in:${uri}`);
  });

  mongoose.connection.on('disconnect', () => {
    winston.log(`Mongoose! Desconnected:${uri}`);
  });

  mongoose.connection.on('disconnect', () => {
    winston.log(`Mongoose! Desconnected:${uri}`);
  });

  mongoose.connection.on('error', (erro) => {
    winston.log(`Mongoose!Erro connection${erro}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      winston.log('Good bye =]');
      process.exit(0);
    });
  });
};
