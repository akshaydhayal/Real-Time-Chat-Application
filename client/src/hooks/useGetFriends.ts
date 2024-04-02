import axios from "axios";

export default async function useGetFriends(setFriends){
    try{
        console.log("use get frindfs hook called!!");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/users/friends`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        const data=response.data;
        console.log("friendsss data: "+JSON.stringify(data));
        console.log("friendsss : "+data.friends);
        if(data.friends){
            setFriends(data.friends);
        }
    }catch(error){
        console.log("error in useGetUsers hook : "+error.message);
        console.log("error in useGetUsers hook : "+error.response.data.error);
        console.log("error in useGetUsers hook : "+JSON.stringify(error.response.data));
    }
    
}



// export default async function useGetFriends(setFriends){
//     try{
//         const response=await axios.get("http://localhost:3001/api/users",{
//             withCredentials:true,
//         });
//         const data=response.data;
//         if(data.users){
//             setFriends(data.users);
//         }
//     }catch(error){
//         console.log("error in useGetUsers hook : "+error.message);
//         console.log("error in useGetUsers hook : "+error.response.data.error);
//         console.log("error in useGetUsers hook : "+JSON.stringify(error.response.data));
//     }
    
// }
