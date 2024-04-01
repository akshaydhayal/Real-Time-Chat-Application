import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authUser=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        // console.log("all cookies: "+JSON.stringify(req.cookies));
        // console.log("all cookies: "+JSON.stringify(req.headers.cookies));
        if(!token){
            return res.status(404).json({msg:"No JWT Token present"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
            const user=await User.findOne({_id:decoded.id});
            if(!user){
                return res.status(404).json({msg:"User not found"});
            }
            req.user=user;
            console.log("auth user"+user);
            next();
            // res.status(201).json({msg:"User autheticated successfully!!"});
        }
    }catch(e){
        console.log('error in authUser middleware : '+e.message);
        return res.status(404).json({msg:"User not found"});
    }
}