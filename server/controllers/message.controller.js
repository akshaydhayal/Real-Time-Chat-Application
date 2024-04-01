import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    const {reciever,message}=req.body;

    console.log(`in send msg controller : msg :${message} rec: ${reciever}`)
    // let conversation=await Conversation.findOne({participants:{$all:[req.user?._id,reciever]}})
    let conversation=await Conversation.findOne({participants:[req.user?._id,reciever]})

    if(!conversation){
        const newConversation=new Conversation({
            participants:[req.user?._id,reciever],
            messages:[]
        })
        await newConversation.save();
        conversation=newConversation;
    }
    // console.log('conversationnnnn : '+conversation);
    
    const newMessage=new Message({
        reciever,message,sender:req.user?._id
    })
    conversation.messages.push(newMessage);
    await newMessage.save();
    await conversation.save();
    res.status(201).json({msg:"message sent!!",newMessage,conversation});
}


export const getMessages=async(req,res)=>{
    try{
        const friendToChatId=req.params.id;
        const senderId=req.user._id;
        console.log(`senderId : ${senderId}  receiverId : ${friendToChatId}`);
    
        // let conversation = await Conversation.findOne({
        //   participants: {$all : [senderId,friendToChatId]}}).populate("messages");

        let conversation = await Conversation.findOne({participants: [senderId,friendToChatId]})
                            .populate("messages") || await Conversation.findOne({participants:[
                                friendToChatId,senderId]}).populate("messages");

        // console.log('conversationnnnn : '+conversation);
        if(!conversation){
            return res.status(401).json({error:"Conversation not found",messages:[]});
        }
        const messages = conversation.messages;
        return res.status(201).json({msg:"Conversation found",messages});
    }catch(error){
        console.log("error in get message controller : "+error.message);
        res.status(500).json({error:"Internal server error"});
    }
}