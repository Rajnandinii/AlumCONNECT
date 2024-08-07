import express from 'express'
import cors from 'cors'
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from './db/connectDB.js'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoutes.js'
import profileRoute from './routes/profileRoute.js';
import convRoute from './routes/convRoute.js';
import msgRoute from './routes/msgRoute.js'

dotenv.config();

const app = express()

//middleware
const corsOptions ={
    origin: process.env.CLIENT_URI,  //go to .env make a variable CLIENT_URI (if not made) and paste client host url
    credentials:true,            //access-control-allow-credentials:true
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With', 'If-Modified-Since', 'X-CSRFToken', 'auth-token'],
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api', profileRoute);
app.use('/api/conversations', convRoute);
app.use('/api/messages', msgRoute);

//app.use('', otpRouter)
//app.use('', submitotp)


//server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    connectDB();
    console.log(`App running on ${PORT}`);
    
});