import axios from "axios";
import toast from "react-hot-toast";

export default async function useGetUser(username,setFriendSearched){
    try{
        const response = await axios.get(
          `${process.env.BACKEND_BASE_URL}/users/${username}`,
          {
            withCredentials: true,
          }
        );
        const data=response.data;
        if(data.user){
            console.log(data.user);
            // console.log('name : '+data.user.friend_requests_recieved[0].name);
            setFriendSearched([data.user]);
            // setFriendSearched((old)=>[...old,data.user]);
        }
    }catch(error){
        console.log("error in useGetUser : "+error.message);
        console.log("error in useGetUser : "+JSON.stringify(error.response));
        console.log("error in useGetUser : "+JSON.stringify(error.response.data));
        if(error.response.data.error){
            toast.error(error.response.data.error);
        }else{
            toast.error(error.message);
        }
    }
} 