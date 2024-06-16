import express from 'express';


//import { jwt } from "react-jwt";
import {signup, login, send_otp, logoutUser, followUnFollowUser, checkUsername} from '../controllers/authController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

// REGISTER USER
router.post('/signup',signup);
router.get('/check-username', checkUsername)
router.post('/send-otp', send_otp);
router.post('/login',login);
router.post("/logout", logoutUser);

router.post("/follow/:id", protectRoute, followUnFollowUser);


export default router;