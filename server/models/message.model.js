import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    reciever: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    message:{type:String,required:true}
},{timestamps:true});

const Message=mongoose.models.Message || mongoose.model("Message",messageSchema);
export default Message;