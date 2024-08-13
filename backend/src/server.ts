// server.ts
require('dotenv').config();
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRouter from './routes/user';
import scheduleRoutes from './routes/schedule';
import appointmentRoutes from './routes/appointment';
import assessmentRoutes from './routes/assessment';

const app: Application = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  credentials:true,
  origin:["http://localhost:4200","http://localhost:4300"]
}));

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/assessment', assessmentRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
// MongoDB connection
mongoose.connect('mongodb+srv://palavdesai5142:palavdesai5142@medicure.r4gzq8b.mongodb.net/Medicure');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
