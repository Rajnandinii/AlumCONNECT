import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
// const JWT_SECRET = 'secretkey123';

const fetchuser = async (req,res,next)=>{
   
    try {
        
        const token = req.header('auth-token');
        

		if (!token) return res.status(401).json({ message: "Unauthorized", succcess:false });
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('testing2');

		const user = await User.findById(decoded._id).select("-password");
		
		if (!user) {        
            return res.status(401).json({message: "Invalid Access Token", succcess:false})
        }
        //console.log(user)
		req.user = user;

		next();
	} catch (err) {
		res.status(500).json({ message: err.message , succcess:false});
		console.log("Error in protectRoute: ", err.message);
	}
   
//     if(!token){
//         console.log('next executes');
//         return res.status(401).send({error:"please authenticate using a validd token 1 "});
        
//     }
//     else{
//     try{
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch(error){
//         res.status(401).send({error:"please authenticate using a validd token 2 "});
//     }
// }     
}

export default fetchuser;