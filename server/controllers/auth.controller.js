import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateJwtToken from "../utils/generateJwtToken.js";

export const signup=async (req, res) => {
  try {
    const { name, username, password, avatar,bio } = req.body;
    const userFound = await User.findOne({ username });
    if (userFound) {
        console.log("user already exists");
        return res.status(404).json({error:"User already present",msg:"Hi" });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const user = new User({ name, username, password:hashedPassword, avatar,bio });
    await user.save();
    res.status(201).json({msg:"User created!!",user});
  } catch (error) {
    console.log("error in authRouter : " + error.message);
    res.status(501).json({ error: "Internal server error" });
  }
};

export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        console.log(username+" "+password);
        const user=await User.findOne({username}).populate("friend_requests_recieved");
        const user2=await User.findOne({username}).populate("friend_requests_recieved");
        console.log("user"+user);
        console.log("user2"+user2);
        
        if(!user){
            console.log("test1");
            return res.status(401).json({error:"User don't exist!!"});
        }
        console.log(username+" "+password);
        const passwordMatched=await bcrypt.compare(password,user?.password);
        if(!passwordMatched){
            return res.status(404).json({error:"Password incorrect!!"});
        }
        console.log(username+" "+password);
        if(user && passwordMatched){
          const expiryTime = new Date();
          expiryTime.setTime(expiryTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour in milliseconds

          res.cookie("jwt", generateJwtToken({ id: user._id }), {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            // expires: expiryTime,
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
            domaain: "http://localhost:5173",
          });
          res.status(200).json({ msg: "Login success!!", user });
        }
    }catch(error){
        console.log("Error in userContoller login: "+error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const logout=async(req,res)=>{
    try{
        res.cookie('jwt',"");
        res.status(200).json({msg:'Logout successfully'});
    }catch(error){
        console.log("error in user controller logout : "+error.message);
        res.status(500).json({error:"Internal server error"});
    }
}