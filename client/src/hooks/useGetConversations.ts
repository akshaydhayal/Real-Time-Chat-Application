import axios from "axios";
import toast from "react-hot-toast";

export default async function useGetConversations(recieverId){
    try{
        console.log(`recieverId : ${recieverId}`);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/messages/${recieverId}`,
          {
            withCredentials: true,
          }
        );
        const data=response.data;
        console.log(data.messages);
        const conversations=data.messages;
        return conversations;
    }catch(error){        
        console.log("error in use getConversation hook : "+error.response.data.error);
        console.log("error in use getConversation hook : "+error.message);
        toast.error(error.response.data.error);
    }
}