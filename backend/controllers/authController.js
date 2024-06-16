import User from '../models/userModel.js'

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";






//REGISTER/SIGNUP USER -------------------------------------------------------------------------------------
export const signup  = async (req, res) => {
    try {
        const {otp, name, username, email, password, role, gradyear,degree, branch} = req.body;

        if(username.length<3 || username.length>25){
            return res.json({status: true, message: "Username should be of [3,25] letters!", success:false}); 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email) || email.length>50) {
			return res.status(400).json({ error: "Invalid email format" });
		}

        const user =await User.findOne({email});
        if(user){
            return res.json({status: true, message: "Email already exists!"}); 
        }

        const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({ message: "Username is already taken" });
		}

        if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters long" });
		}
        //check otp
        const token  = req.cookies.otpToken;
        if(!token){
            return res.status(400).json({message:'No token'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //console.log(decoded.otp, " ", otp)
        
        if(decoded.otp.toString() !== otp){
            return res.json({ message: 'Invalid OTP' , success: false});
        }else{
            res.clearCookie('otpToken')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser = new User({    
            name,   
            username,
            email,  
            password: hashedPassword,
            role: role.toLowerCase(),
            gradyear,
            degree,
            branch,      
        });

        if(newUser){
             await newUser.save()
             .then(()=>{
                 console.log(newUser);
             })

             res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                success:true
            });
        }else{
            res.status(400).json({ error: "Invalid user data"});
        }     

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occoured");
    }
}

//Check-username--------------------------------------------------------------------------------
export const checkUsername = async (req,res) =>{
    try{
        const {username} = req.query;
        if(!username){
            return res.status(400).json({ error: 'Username is required' });
        }
         
        const user = await User.findOne({username:username});
        //console.log("inside server", username)
        if(user){
            return res.json({ avail: false });
        }
        else{
            return res.json({ avail: true });
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Username error from server");
    }
}


//LOGIN ------------------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
    try {
        const {username, password}= req.body;
        const user= await User.findOne({username});
        if(!user){
          return  res.json({message: "Invalid Credentials!",success:false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.json({message: "Invalid Credentials!", success:false});
        }
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
            expiresIn: '15d',
        });
        res.cookie('token', token, {httpOnly: true,  maxAge: 15 * 24 * 60 * 60 * 1000});

        res.json({
            status: 'success',
            message: 'User Logged In successfully',
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                desc: user.desc,
                city: user.city,
                state: user.state,
                country: user.country,
                gradyear: user.gradyear,
                degree: user.degree,
                branch: user.branch,
                interests: user.interests,
                skills: user.skills,
                profilePicture: user.profilePicture,
                coverPicture: user.coverPicture,
                experience: user.experience,
                education: user.education,
                social: user.social,
            },
            success:true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occoured");
    }
}


//SEND OTP  ---------------------------------------------------------


export const send_otp =async(req, res)=>{
    
    const {email,name} = req.body
    
    if (!email) return res.status(400).json({ message: 'email field is required', success: false })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ error: "Invalid email format" , success:false});
	}

    const user = await User.findOne({email});
    if(user){
        return res.json({status: true, message: "Email already exists!", success:false}); 
    }
    
    const otp = Math.floor(1000 + Math.random() * 9000);
    
    const otpToken = jwt.sign({otp}, process.env.JWT_SECRET, {expiresIn: '5m'})
    
    res.cookie('otpToken', otpToken, {
        httpOnly: true,
        maxAge: 5*60*1000
    })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alumconnect1@gmail.com',
            pass: 'ycqrxuapagdmwcpd'
        }
        
    })

    const mailOptions = {
        from: 'alumconnect1@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Hello ${name} <br/>Your OTP is ${otp} <br/><br/>Thanks!<br/>The AlumConnect Team</p>`
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err) console.log(err)
        else return null
    } )

    res.status(200).json({ message: 'register_otp send successfully', success: true })
}

//SUBMIT OTP ------------------------------------------------------------------------------------------------------
// export const submit_otp = (req, res)=>{
//     console.log(req.body)


//     User.findOne({ otp: req.body.otp }).then(result => {

//         //  update the password 

//         User.updateOne({ email: result.email },{ password: req.body.password })
//             .then(result => {
//                 res.send({ code: 200, message: 'Password updated' })
//             })
//             .catch(err => {
//                 res.send({ code: 500, message: 'Server err' })

//             })


//     }).catch(err => {
//         res.send({ code: 500, message: 'otp is wrong' })

//     })

// }








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


export const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.followings.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { followings: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { followings: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};

export const logoutUser = (req, res) => {
	try {
		res.cookie("token", "", { maxAge: 0 });
		res.status(200).json({ message: "User logged out successfully" ,success:true});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in logoutUser: ", err.message);
	}
};