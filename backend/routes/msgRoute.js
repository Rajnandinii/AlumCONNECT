import express from 'express';
import {addMsg, getMsgs} from '../controllers/messagesController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/', addMsg);
router.get('/:conversationId',  getMsgs);


export default router;