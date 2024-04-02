import axios from "axios";
import toast from "react-hot-toast";

export default async function useSignup(name, email, password, bio,avatar, setAuthUser) {
  // const setUser=useSetRecoilState(userData);
  try {
    // console.log("process: "+process.env.BACKEND_BASE_URL);
    // const response=await axios.post(`${process.env.BACKEND_BASE_URL}/auth/signup`,{
    const response = await axios.post(
      `http://localhost:3001/api/auth/signup`,
      {
        name,
        username: email,
        password,
        bio,
        avatar
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = response.data;
    console.log(data);
    if (data.user) {
      setAuthUser(data.user);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
}
