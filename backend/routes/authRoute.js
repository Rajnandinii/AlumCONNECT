import express from 'express';


//import { jwt } from "react-jwt";
import {signup, login, send_otp, submit_otp, logoutUser, followUnFollowUser} from '../controllers/authController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

// REGISTER USER
router.post('/signup',signup);

router.post('/login',login);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post('/send-otp', send_otp);
router.post("/logout", logoutUser);
router.post('/submit-otp', submit_otp);


export default router;