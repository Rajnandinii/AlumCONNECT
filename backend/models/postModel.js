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
            refPath: 'likes.userTypeOfWhoLiked',
            required: true,
        },
        userTypeofWhoLiked: {
            type: String,
            required: true,
            enum: ['Student', 'Alumni'],
        },
    }],

    comments: [{
	    text: {
	    	type: String,
	    	required: true,
	    },
	    user: {
	    	type: mongoose.Schema.Types.ObjectId,
	    	refPath: "comments.userTypeOfWhoCommented",
	    	required: true,
	    },
        userTypeofWhoCommented: {
            type: String,
            required: true,
            enum: ['Student', 'Alumni'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
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