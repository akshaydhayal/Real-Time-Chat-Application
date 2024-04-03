import axios from "axios";
import toast from "react-hot-toast";

export default async function useSendFriendRequest(friendUsername,socket){
    try{
        const response = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/users/friends/add/${friendUsername}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const data=response.data;
        if(data.friend){
          await socket.emit("friend-req",{sender:data.user,reciever:data.friend});
        }
        console.log(data);
    }catch(error){
        console.log("error in use send friend request: "+error.message);
        toast.error(error.message);
    }
}