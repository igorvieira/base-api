import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

module.exports = (uri) => {
  mongoose
   .connect(uri, {
     useMongoClient: true,
   });
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose! Connected in:${uri}`);
  });


  mongoose.connection.on('disconnect', () => {
    console.log(`Mongoose! Desconnected:${uri}`);
  });

  mongoose.connection.on('error', (erro) => {
    console.log(`Mongoose!Erro connection${erro}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Good bye =]');
      process.exit(0);
    });
  });
};
