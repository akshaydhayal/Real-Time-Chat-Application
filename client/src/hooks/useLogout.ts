import axios from "axios";

export default async function useLogout(){
    try{
        const response = await axios.post(
          `${process.env.BACKEND_BASE_URL}/auth/logout`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const data=response.data;
        console.log(data);
    }catch(error){
        console.log("error in useLogout hook : "+error.message);
    }
}