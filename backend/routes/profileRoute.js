import express from 'express';
import { upload } from '../middlewares/multerMiddleware.js';

import {setprofile, getprofile} from '../controllers/profileController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();


router.post('/setprofile',  protectRoute, upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 }
  ]), setprofile);
router.get('/getprofile', protectRoute,  getprofile)



export default router;