import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userType', // reference path..referencing to next field 'userType' ... if userType is student, mongodb will refrence to Student collection
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['Student', 'Alumni'], 
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    img: {
	  type: String,
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