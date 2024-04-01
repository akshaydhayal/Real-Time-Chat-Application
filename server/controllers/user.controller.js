import User from "../models/user.model.js"


export const getUser=async(req,res)=>{
    try{
        const user=await User.findOne({username:req.params.username});
        console.log("user searched : "+user);
        if(user){
            return res.status(201).json({user});
        }
        console.log("test2");

        return res.status(201).json({error:"User don't exist"});
    }catch(error){
        console.log("error in getUser controller: "+error.message);
        res.status(500).json({erro:'Internal server error'});
    }
}


export const getFriends=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).populate("friends");
        console.log("user id : "+req.user._id);
        console.log("all friends : "+user);
        if(user){
            console.log("all friends : "+user);
            return res.status(201).json({friends:user.friends});
        }else{
            console.log("test3");
            return res.status(401).json({error:"User don't exist!!"});
        }
    }catch(error){
        console.log("error in getUser controller: "+error.message);
        res.status(500).json({erro:'Internal server error'});
    }
}


export const addFriend=async(req,res)=>{
    try{
        const friendUsername=req.params.username;
        // const friend=await User.findById(friendId);
        const friendToAdd=await User.findOne({username:friendUsername});
        if(friendToAdd){
            // const user=await User.findById(req.user._id);
                const user=await User.findOneAndUpdate(
                  { _id: req.user._id },
                  {
                    $pull: { friend_requests_recieved: friendToAdd._id }, // Remove the item from arrayFieldName1
                    $addToSet: { friends: friendToAdd._id }, // Add the item to arrayFieldName2
                  },
                  { new: true } // To return the updated document
                );
                const friend=await User.findOneAndUpdate(
                  { _id: friendToAdd._id },
                  {
                    $pull: { friend_requests_sent: req.user._id }, // Remove the item from arrayFieldName1
                    $addToSet: { friends: req.user._id }, // Add the item to arrayFieldName2
                  },
                  { new: true } // To return the updated document
                );
                // user.friends.push(friend._id);
                // await user.save();
                return res.status(201).json({msg:'Friend Added',user,friend});
        }else{
            res.status(401).json({error:"Friend don't existss!!"});
        }
    }catch(error){
        console.log("error in add friends controller : "+error.message);
        res.status(501).json({error:"Internal server error"});
    }
}


export const sendFriendRequest=async(req,res)=>{
    try{
        const friendUsername=req.params.username;
        const friend=await User.findOne({username:friendUsername});
        if(friend){
            const user=await User.findById(req.user._id);
            if(user){
                for(let i=0; i<user.friend_requests_sent.length; i++){
                    if(user.friend_requests_sent[i].equals(friend._id)){
                        return res.status(401).json({error:"Already sent friend requests!!"});
                    }
                }
                user.friend_requests_sent.push(friend._id);
                await user.save();
                
                friend.friend_requests_recieved.push(req.user._id);
                await friend.save();
                return res.status(201).json({msg:'Friend req sent!!',user,friend});
            }
        }else{
            res.status(401).json({error:"Friend don't existss!!"});
        }
    }catch(error){
        console.log("error in add friends controller : "+error.message);
        res.status(501).json({error:"Internal server error"});
    }
}


export const rejectFriendRequest=async(req,res)=>{
    try{
        const friendUsername=req.params.username;
        const friendToReject=await User.findOne({username:friendUsername});
        const user=await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { friend_requests_recieved: friendToReject._id } },
            { new: true } // To return the updated document
        );
        const friend=await User.findOneAndUpdate(
            { _id: friendToReject._id },
            { $pull: { friend_requests_sent: req.user._id } },
            { new: true } // To return the updated document
        );
        return res.status(201).json({msg:'Friend req sent!!',user,friend});
            // }
    }catch(error){
        console.log("error in add friends controller : "+error.message);
        res.status(501).json({error:"Internal server error"});
    }
}