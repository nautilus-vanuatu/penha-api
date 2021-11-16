require('dotenv').config();


import { app } from './app';

const start = async () => {
  if (!process.env.API_PORT) {
    throw new Error('API_PORT must be defined');
  }

  if (!process.env.API_HOST) {
    throw new Error('API_HOST must be defined');
  }

  // if (!process.env.MONGO_URI) {
  //   throw new Error('MONGO_URI must be defined');
  // }

  // try {
  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log('Connected to MongoDb');
  // } catch (err) {
  //   console.error(err);
  // }

  app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`);
  });
}

start();
