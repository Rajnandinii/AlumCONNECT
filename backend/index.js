import express from 'express'
import cors from 'cors'
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/authRoute.js'
import connectDB from './db/connectDB.js'

dotenv.config();

const app = express()

//middleware
const corsOptions ={
    origin: process.env.CLIENT_URI,  //go to .env make a variable CLIENT_URI (if not made) and paste client host url
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

//routes
app.use('/api/auth', authRoutes)
//app.use('', otpRouter)
//app.use('', submitotp)


//server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    connectDB();
    console.log(`App running on ${PORT}`);
    
});