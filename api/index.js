import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Errors:' + err);
  });

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// http://localhost:3000/api/user/
app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

// Errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
