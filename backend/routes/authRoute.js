const express= require('express');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
//import { jwt } from "react-jwt";
const User= require('../models/userModel');

const router=express.Router();

// REGISTER USER
router.post('/register', async (req, res) => {
    try {
        const {name, username, email, password, usermode, gradyear, degree, branch, curaddress, peraddress, phone, interests} = req.body;
        const user =await User.findOne({email});

        if(user){
            return res.json({status: true, message: "user already exists!"}); 

        }

        const hashedPassword= await bcrypt.hash(password, 12);

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

     

    } catch (error) {
        console.error(error.message);
      res.status(500).send("some error occoured");
    }
});

router.post('/login', async (req, res) => {
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
    


})
module.exports=router;