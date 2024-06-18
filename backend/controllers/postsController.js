import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

export const createPost = async (req,res) => {

    try{
        const {title, desc} = req.body
        const user  = req.user
        //console.log(req.files)

        let postImgLocalPath=null;
        if (req.files && Array.isArray(req.files.postImg) && req.files.postImg.length > 0) {
            postImgLocalPath = req.files.postImg[0].path
        }
        //console.log(postImgLocalPath, 'path')
        if (title?.trim()==="" && desc?.trim()==="" && !postImgLocalPath){
              return res.status(400).json({message:'Post can\'t be empty you know', success:false})
        }

        const postImg = await uploadOnCloudinary(postImgLocalPath)
        

        const post = await Post.create({
            user: user._id,
            username: user.username,
            userType: user.role,
            title,
            description:desc,
            postImg: postImg?.url || "",
        })
        
        const createdPost = await Post.findById(post._id)
       
        if(!createdPost){
            return res.status(500).json({message:'Something went wrong while uploading', success:false})
        }

        const updatedUser = await User.findOneAndUpdate(
            user._id,
            { $push: { posts: createdPost._id } },
            { new: true } 
        );

        return res.status(201).json({message:'Post uploaded successfully', success:true})

    }
    catch(e){
        console.error(e.message, 'error in createPost controller');
        res.status(500).json({message: "Internal server error", success:false});
    }
}

export const getPosts = async (req,res) =>{
    try{
        const { type } = req.query;
        const user = req.user
        let posts
        if(type==='All'){
            posts = await Post.find().sort({ "timestamp.createdAt" : -1 }).exec();
        }
        else{
            posts = await Post.find({userType: type.toLowerCase()}).sort({ "timestamp.createdAt" : -1 }).exec();
        }
        //console.log(type)
        if(!posts){
            return res.status(500).json({message:"Couldn't load posts", success:false})
        }
        res.status(201).json({posts:posts, 
                              message:"Post are loaded", 
                              success:true})
    }
    catch(error){
        console.log('error in getAllPosts', error)
        return res.status(500).json({message:"Failed to Load Pots", success:false})
    }
}

