import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

export async function connectDB() {
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
  mongoose.connection.on('reconnected', () => console.info('MongoDB reconnected'));

  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10_000,
    autoIndex: !env.isProd,
  });
  console.info(`MongoDB connected: ${mongoose.connection.host}`);
}

export async function disconnectDB() {
  await mongoose.connection.close();
}
