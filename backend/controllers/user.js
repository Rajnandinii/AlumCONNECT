const User = require('../models/userModel')
const nodemailer = require('nodemailer')



module.exports.sendotp = async (req, res) => {
    console.log("send otp:");
    console.log(req.body);
    const _otp=Math.floor(100000 + Math.random*900000);
    console.log(_otp);
    const user =await User.findOne({email: req.body.email });
    //send otp
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    let info =await transporter.sendMail({
       
        from: 'alumconnect1@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "OTP", // Subject line
        text:String( _otp) , // plain text body
        html: `<html>
        < body >
        Hello and welcome
     </ >
    </html > `, // html body
       
    })


    if(info.messageId){
        console.log(info, 84)
       User.updateOne({ email: req.body.email }, {otp: _otp})
       .then(result=>{
        res.send({code: 200, message: 'otp saved in db'})

       })
       .catch(err=>{
        res.status(500).send("Service error occured");
       })
       
       
    }
    else{
        res.status(500).send("some error occured");
    }


}
