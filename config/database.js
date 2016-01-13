import mongoose from 'mongoose';
import glob from 'glob';
import winston from 'winston';
import config from '../config';

export default function () {
  // Bootstrap db connection
  const db = mongoose.connect(config.mongoDB, (err) => {
    if (err) {
      winston.error('Could not connect to MongoDB!');
      winston.error(err);
      process.exit(1);
    }
  });

  // Loading model files
  glob(config.paths.models + '/**/*.js', (err, files) => {
    files.forEach((file) => {
      require(file);
    });
  });

  return db;
}
