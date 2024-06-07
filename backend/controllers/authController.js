import User from '../models/userModel.js'

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from 'bcryptjs'



//REGISTER/SIGNUP USER -------------------------------------------------------------------------------------
export const signup  = async (req, res) => {
    try {
        const {name, username, email, password, usermode, gradyear, degree, branch, curaddress, peraddress, phone, interests} = req.body;
        const user =await User.findOne({email});

        if(user){
            return res.json({status: true, message: "user already exists!"}); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            username,
            email,  
            password: hashedPassword,
            usermode, 
            gradyear,
            degree,
            branch,
            curaddress,
            peraddress,
            phone, 
            interests,
        });

        newUser.save()
        .then(()=>{
            console.log(newUser);
        })
        
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
        });
     

    } catch (error) {
        console.error(error.message);
      res.status(500).send("some error occoured");
    }
}

//LOGIN ------------------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
    try {
        const {email, password}= req.body;
        const user= await User.findOne({email});
        if(!user){
          return  res.json({message: "User is not registered"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.json({message: "password is invalid"});
        }
        
        const token = jwt.sign({_id: user._id}, 'secretkey123',{
            expiresIn: '90d',
        });
        res.cookie('token', token, {httpOnly: true,  maxAge: 36000});

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
            },

        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occoured");
        
    }
}

//SEND OTP (correct one ig) ---------------------------------------------------------
export const send_otp =async(req, res)=>{
    
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
}

//SUBMIT OTP ------------------------------------------------------------------------------------------------------
export const submit_otp = (req, res)=>{
    console.log(req.body)


    User.findOne({ otp: req.body.otp }).then(result => {

        //  update the password 

        User.updateOne({ email: result.email },{ password: req.body.password })
            .then(result => {
                res.send({ code: 200, message: 'Password updated' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })


    }).catch(err => {
        res.send({ code: 500, message: 'otp is wrong' })

    })

}








//SEND OTP ---------------------------------------------------------------------------------------------------------
// export const sendotp = async (req, res) => {
//     console.log("send otp:");
//     console.log(req.body);
//     const _otp=Math.floor(100000 + Math.random*900000);
//     console.log(_otp);
//     const user =await User.findOne({email: req.body.email });
//     //send otp
//     let testAccount = await nodemailer.createTestAccount();

//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false,
//         auth: {
//             user: testAccount.user,
//             pass: testAccount.pass
//         }
//     })

//     let info =await transporter.sendMail({
       
//         from: 'alumconnect1@gmail.com', // sender address
//         to: req.body.email, // list of receivers
//         subject: "OTP", // Subject line
//         text:String( _otp) , // plain text body
//         html: `<html>
//         < body >
//         Hello and welcome
//      </ >
//     </html > `, // html body
       
//     })


//     if(info.messageId){
//         console.log(info, 84)
//        User.updateOne({ email: req.body.email }, {otp: _otp})
//        .then(result=>{
//         res.send({code: 200, message: 'otp saved in db'})

//        })
//        .catch(err=>{
//         res.status(500).send("Service error occured");
//        })
       
       
//     }
//     else{
//         res.status(500).send("some error occured");
//     }


// }
