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

//Get all comments of a post-----------------------------------------------------------------------------
export const getComments = async (req,res)=>{
    try{
        const postId = req.params.postId
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(500).json({ message: 'Post not found vc', success:false });
        }

        const comments = post.comments

        res.status(200).json({comments:comments, message:"Comments loaded", success:true})

    }
    catch(error){
        console.log('error in getComments', error)
        return res.status(500).json({message:"Failed to Load Comments", success:false})
    }
}

//Comment on a Post--------------------------------------------------------------------------------------
export const commentOnPost = async (req,res)=>{
    try{
        const postId = req.params.postId
        const {text} = req.body
        const user = req.user
        
        if(text===''){
            return res.status(500).json({message:"Empty comment", success:false})
        }

        const post = await Post.findById(postId)

        if(!post){
            return res.status(500).json({message:"Post doesn't exist", success:false})
        }

        const comment = {
            username:user.username,
            text: text,
            profilePic: user.profilePicture,
            user: user._id,
            userType: user.role,
        }

        post.comments.push(comment);
        const updatedPost = await post.save();

        if(!updatedPost){
            return res.status(500).json({message:"Couldn't update post", success:false})
        }

        //console.log('Updated Post:', updatedPost);
        res.status(201).json({comment:comment, 
                              message:"Comment is posted", 
                              success:true})

    }
    catch(error){
        console.log('error in commentOnPost', error)
        return res.status(500).json({message:"Failed to Comment", success:false})
    }
}

//Like Unlike --------------------------------------------------------------------------------------------------

export const likeUnlikePost = async (req,res)=>{
    try{
        const user = req.user
        const postId = req.params.postId

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"Couldn't find post", success:false})
        }

        const likedByUser = post.likes.some(like => like.user.toString() === user._id.toString()); 

        if(likedByUser){
            //console.log('unliking')
            const index = post.likes.findIndex(like => like.user.equals(user._id));
            if (index !== -1) {
              post.likes.splice(index, 1); // Remove the like object at the found index
            }
        }
        else{
            //console.log('liking')
            post.likes.push({user: user._id})
        }

        const updatedPost = await post.save();
        if(!updatedPost){
            return res.status(500).json({message:"Couldn't update(like) post", success:false})
        }

        res.status(201).json({ message:"Post liked", success:true})
    }
    catch(error){
        console.log('error in likeUnlike', error)
        return res.status(500).json({message:"Failed to Like/Unlike", success:false})
    }
}