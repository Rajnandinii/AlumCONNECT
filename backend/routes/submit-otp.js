const express= require('express');
const User= require('../models/userModel');
const router=express.Router();

router.post('/submit-otp', (req, res)=>{
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

})
module.exports=router;