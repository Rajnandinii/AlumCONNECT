import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['admin', 'student', 'alumni'],
    },
    username: {
      type: String,
      required:true
    },
    profilePic:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    postImg: {
	    type: String,       //cloudinary url
    },

    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    }],

    comments: [{
      username:{
        type: String,
        required:true
      },
	    text: {
	    	type: String,
	    	required: true,
	    },
      profilePic : {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      },
	    user: {
	    	type: mongoose.Schema.Types.ObjectId,
	    	ref: "User",
	    	required: true,
	    },
      userType: {
          type: String,
          required: true,
          enum: ['admin', 'student', 'alumni'],
      },
      timestamp: {
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
	}],

    timestamp: {
        createdAt: {
          type: Date,
          default: Date.now,
        },
    },     
})

const Post = mongoose.model('Post',postSchema);
export default Post;