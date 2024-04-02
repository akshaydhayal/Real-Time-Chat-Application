import axios from "axios";
import toast from "react-hot-toast";

export default async function useLogin(username, password, setAuthUser) {
  // const setUser=useSetRecoilState(userData);
  try {
    console.log(username + " " + password);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("data : " + JSON.stringify(response.data));
    const data = response.data;
    if (data.user) {
      setAuthUser(data.user);
    }
  } catch (error) {
    console.log("error: " + JSON.stringify(error.response.data.error));
    toast.error(error.response.data.error);
  }
}

// export default function useLogin() {
//     async function login(username,password,setUser){
//         //   const setUser=useSetRecoilState(userData);
//           try{
//               console.log(username+" "+password);
//               const response=await axios.post("http://localhost:3001/api/auth/login",{
//                   username,password
//               },{
//                   headers:{'Content-Type':'application/json'}
//               });
//               console.log("data"+JSON.stringify(response));
//               console.log("data : "+JSON.stringify(response.data));
//               const data=response.data;
//               if(data.user){
//                   setUser(data.user);
//               }
//           }catch(error){
//               console.log("error: "+JSON.stringify(error.response.data.error));
//               toast.error(error.response.data.error);
//           }
//     }
//     return login;
// }
