import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { createPost, getPosts , commentOnPost, getComments, likeUnlikePost} from '../controllers/postsController.js';


const router = express.Router();

router.post("/createPost", protectRoute, upload.fields([{name:'postImg', maxCount:1}]) , createPost);  
router.get("/getComments/:postId", protectRoute, getComments);
router.post("/commentOnPost/:postId", protectRoute, commentOnPost); 
router.post("/likeUnlikePost/:postId", protectRoute, likeUnlikePost);

router.get("/getPosts",protectRoute, getPosts);
// router.get("/followingPosts", followingPosts);   //posts of people we follow
// router.get("/deletePost/:id", deletePost);

//get user posts only

//router.delete("/deletePost/:id", deletePost);   //post id it is



export default router;