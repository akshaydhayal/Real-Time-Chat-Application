import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String,default:""},
    bio:{type:String},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}],
    friend_requests_sent:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}],
    friend_requests_recieved:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}]
},{timestamps:true});

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;