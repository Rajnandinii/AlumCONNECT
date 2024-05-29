const express=require('express');
const mongoose=require('mongoose');
const UserRouter=require('./routes/authRoute');
const otpRouter=require('./routes/send-otp')
const submitotp = require('./routes/submit-otp')
const cors = require('cors');


const app = express()

//middleware
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


//MONGO DB CONNECTION
mongoose
    .connect('mongodb://localhost:27017/portal')
    .then(()=> console.log('Connected to MongoDB!'))
    .catch( (error) => console.error('Failed to connect to MongoDB',error));

app.use(express.json())

//routes
app.use('/auth', UserRouter)
app.use('', otpRouter)
app.use('', submitotp)


//server
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`App running on ${PORT}`);
    
});