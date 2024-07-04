import express from 'express';
import User from '../models/userModel.js';




import {uploadOnCloudinary} from '../utils/cloudinary.js' // Assuming you're using Cloudinary for image storage

export const setprofile = async (req, res) => {
  const userId = req.user.id;
  const updateData = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Handle file uploads
    if (req.files) {
      if (req.files.profileImg) {
        const result = await uploadOnCloudinary(req.files.profileImg[0].path);
        user.profilePicture = result.secure_url;
      }
      if (req.files.coverImg) {
        const result = await uploadOnCloudinary(req.files.coverImg[0].path);
        user.coverPicture = result.secure_url;
      }
    }

    // Update other fields
    const fieldsToUpdate = ['interests', 'skills', 'country', 'state', 'city'];
    fieldsToUpdate.forEach(field => {
      if (updateData[field]) {
        user[field] = updateData[field];
      }
    });

    // Handle arrays and objects
    if (updateData.educations) {
      user.education = JSON.parse(updateData.educations);
    }

    if (updateData.experiences) {
      user.experience = JSON.parse(updateData.experiences);
    }

    if (updateData.socialLinks) {
      user.social = JSON.parse(updateData.socialLinks);
    }

    const updatedUser = await user.save();

    res.status(200).json({ status: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



// Get user profile
export const getprofile =  async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch the user from the database
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Send user details including education and experience
    res.status(200).json({ status: true, user });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


