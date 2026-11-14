import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req , res , next) =>{
    try {
        const token = req.header("Authorization").replace("Hello ", "");
        if(!token) return res.status(401).json({message: "You are not authorizate"});
    
        //verify token
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //find user 
        const user =await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(401).json({message : "Your token is not valid"});
        res.user = user
        next(); 
    } catch (error) {
        console.error("The errro in token");
        return res.status(401).json({message : "Your token is not valid"});
    }
}

export default protectRoute; 