//cloudinary setup
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if (!localFilePath){
            console.log('no filepath sent to cloudinary')
            return null
        } 

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //since uploaded now remove the file from server storage
        fs.unlinkSync(localFilePath)
        return response
    }
    catch(error){
        console.log(error)
        fs.unlinkSync(localFilePath) //since upload failed, remove from local
        return null
    }
}

export {uploadOnCloudinary}