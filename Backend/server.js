import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
connectDB();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/users',userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));