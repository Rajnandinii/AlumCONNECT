const express= require('express');
const nodemailer=require('nodemailer')
const User= require('../models/userModel');
const router=express.Router();

router.post('/send-otp', async(req, res)=>{
    
        console.log(req.body);
        const _otp = Math.floor(100000 + Math.random() * 900000);
        console.log(_otp);
        const user =await User.findOne({email: req.body.email });
        //send otp
        // let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({

            service: 'gmail',
            //host: 'smtp.gmail.com',
            // port: 587,
            // secure: false,
            auth: {
                user: 'alumconnect1@gmail.com',
                pass: 'ycqrxuapagdmwcpd'
            }
        })

        let info =await transporter.sendMail({
           
            from: 'alumconnect1@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "OTP", // Subject line
            text: String(_otp) , // plain text body
            html:  `<p>Your OTP code is ${_otp}</p>`, // html body
           
        })


        if(info.messageId){
            // console.log(info, 84)
           User.updateOne({ email: req.body.email }, {otp: _otp})
           .then(result=>{
            res.send({code: 200, message: 'otp saved in db'})

           })
           .catch(err=>{
            res.send({code: 500, message: 'error occurred'})
            
           })
           
           
        }
        else{
            res.status(500).send("some error occured");
        }



        

});
module.exports=router;