import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";

// async function handleCloudinaryUpload(file){
//     const uploadResponse=await cloudinary.v2.uploader.upload(file,{
//         resource_type:"auto"
//     })
// }

export const sendMessage=async(req,res)=>{
    const {reciever,message}=req.body;
    let uploadResponse=null; 
    if(req.file){
        const fileName=req.file.originalName;
        console.log("req.file : "+JSON.stringify(req.file));
        console.log(`in send msg controller : msg :${message} rec: ${reciever} file: ${fileName}`)
    
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
          resource_type: "auto",
        });
    
        console.log("uploadResponse : "+JSON.stringify(uploadResponse));
    }

    let conversation = await Conversation.findOne({participants: [req.user?._id, reciever],}) ||
      await Conversation.findOne({ participants: [reciever, req.user?._id] });

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
        reciever,message,sender:req.user?._id,
        fileData:{url:uploadResponse?.url}
    })
    conversation.messages.push(newMessage);
    await newMessage.save();
    await conversation.save();
    // res.status(201).json({msg:"message sent!!",newMessage,conversation});
    res.status(201).json({msg:"message sent!!",newMessage,conversation,uploadResponse});
}




// export const sendMessage=async(req,res)=>{
//     const {reciever,message}=req.body;

//     console.log(`in send msg controller : msg :${message} rec: ${reciever}`)
//     // let conversation=await Conversation.findOne({participants:{$all:[req.user?._id,reciever]}})
//     let conversation = await Conversation.findOne({participants: [req.user?._id, reciever],}) ||
//       await Conversation.findOne({ participants: [reciever, req.user?._id] });

//     if(!conversation){
//         const newConversation=new Conversation({
//             participants:[req.user?._id,reciever],
//             messages:[]
//         })
//         await newConversation.save();
//         conversation=newConversation;
//     }
//     // console.log('conversationnnnn : '+conversation);
    
//     const newMessage=new Message({
//         reciever,message,sender:req.user?._id
//     })
//     conversation.messages.push(newMessage);
//     await newMessage.save();
//     await conversation.save();
//     res.status(201).json({msg:"message sent!!",newMessage,conversation});
// }




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