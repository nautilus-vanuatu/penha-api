require('dotenv').config();


import { app } from './app';

const start = async () => {
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }

  // try {
  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log('Connected to MongoDb');
  // } catch (err) {
  //   console.error(err);
  // }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

start();
