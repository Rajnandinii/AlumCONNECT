

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Fixed typo
      minlength: 3, // Updated to minlength
      maxlength: 25, // Updated to maxlength
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50, // Updated to maxlength
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Updated to minlength
    },
    posts:[{
      type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default: [], 
    }],
    savedPosts:[{
      type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default: [], 
    }],
    otp: {
      type: Number
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId], // Updated to array of ObjectIds
      ref: 'User',
      default: [],
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId], // Updated to array of ObjectIds
      ref: 'User',
      default: [],
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'alumni'],
    },
    desc: {
      type: String,
      maxlength: 50, // Updated to maxlength
    },
    country: {
      type: String,
      maxlength: 30, // Updated to maxlength
      default: "India"
    },
    state: {
      type: String,
      maxlength: 50, // Updated to maxlength
      default: "",
    },
    city: {
      type: String,
      maxlength: 50, // Updated to maxlength
      default: "",
    },
    gradyear: {
      type: Number,
      // removed default value
    },
    degree: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    interests: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    experience: [{
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    }],
    education: [{
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    }],
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
  
);

const User = mongoose.model("User", UserSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			// required: true,
// 		},
// 		username: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		password: {
// 			type: String,
// 			minLength: 6,
// 			required: true,
// 		},
// 		profilePic: {
// 			type: String,
// 			default: "",
// 		},
// 		followers: {
// 			type: [String],
// 			default: [],
// 		},
// 		followings: {
// 			type: [String],
// 			default: [],
// 		},
// 		bio: {
// 			type: String,
// 			default: "",
// 		},
// 		isFrozen: {
// 			type: Boolean,
// 			default: false,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// const User = mongoose.model("User", userSchema);

// export default User;
