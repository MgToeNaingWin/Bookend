import express from "express"
import User from "../models/user.js";
import "dotenv/config"
import jwt from 'jsonwebtoken'
const router = express.Router();
const generateToken = (userID) =>{
    return jwt.sign({userID}, process.env.JWT_SECRET,
        {
            expiresIn :"15d"
        }
    )
}
router.post("/register", async (req, res) =>{
    try {
        const {username , email, password} = req.body;
        if (!username || !email || !password){
            return res.status(400).json({message : "All Field are Required!"});
        }
        if (password.length<6){
            return res.status(400).json({message : "The Password should be at least 6!"});
        }
        if(username.length<2){
            return res.status(400).json({message : "The Username should be at least 3!"});
        }
        //User Already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return   res.status(400).json({message : "The User already Exists"});
        }
        const profileImage =  `https://api.dicebear.com/10.x/initials/svg?seed=${username}`;
        const user = new User(
            {
                username,
                email,
                password,
                profileImage
            }
        );
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id :user.id,
                username : user.username,
                email : user.email,
                profileImage : user.profileImage
            }
        })
    } catch (error) {
        console.log("Error in Register", error);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
});

router.post("/login",async (req, res) =>{
   try {
    const {email , password} = req.body;
    if(!email || !password ) return res.status(400).json({message :"All Fileds are required!"});

    //Check for User
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message :"User does not exists!"});
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"});
    const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id :user.id,
                username : user.username,
                email : user.email,
                profileImage : user.profileImage
            }
        })
   } catch (error) {
    console.log("Error in Login", error);
        res.status(500).json({
            message : "Internal Server Error"
        })
   }
});

export default router; 