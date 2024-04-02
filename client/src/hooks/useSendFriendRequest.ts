import axios from "axios";
import toast from "react-hot-toast";

export default async function useSendFriendRequest(friendUsername){
    try{
        const response = await axios.post(
          `${process.env.BACKEND_BASE_URL}/users/friends/add/${friendUsername}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const data=response.data;
        console.log(data);
    }catch(error){
        console.log("error in use send friend request: "+error.message);
        toast.error(error.message);
    }
}