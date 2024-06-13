import User from '../models/userModel.js'

export const createPost = async (req,res) => {

    try{

    }
    catch(e){
        console.error(error.message, 'error in createPost controller');
        res.status(500).json({error: "internal server error"});
    }
}