import express from 'express';


//import { jwt } from "react-jwt";
import {signup, login, send_otp, submit_otp} from '../controllers/authController.js'

const router = express.Router();

// REGISTER USER
router.post('/signup', signup);

//login user
router.post('/login', login);


router.post('/send-otp', send_otp);

router.post('/submit-otp', submit_otp);


export default router;