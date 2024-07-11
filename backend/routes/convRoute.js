import express from 'express';
import {createConv, getConv, getConvOf2Ids} from '../controllers/conversationController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/', createConv);
router.get('/:userId',  getConv);
router.get('/find/:firstUserId/:secondUserId', getConvOf2Ids);

export default router;