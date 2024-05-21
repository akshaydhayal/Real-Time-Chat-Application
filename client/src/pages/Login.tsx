import { useState } from "react";
import {
  Paper,
} from "@mui/material";

import { userData } from "../store/authUserData";
import { useSetRecoilState } from "recoil";
import LoginUser from "../components/LoginUser";
import RegisterUser from "../components/RegisterUser";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true);
  const setAuthUser = useSetRecoilState(userData);

  return (
    <div className="w-screen h-screen flex bg-[#121212]">
      <div className="flex flex-col w-3/5 px-12 p-8">
        <div className="h-2/5 flex flex-col gap-4">
          <p className="font-bold text-5xl text-slate-200 px-16">
            It's easy talking to your friends with ChatApp
          </p>
          <p className="font-medium text-lg text-slate-400 px-8">
            Instant, seamless conversations at your fingertips—connect, chat,
            and engage in real-time anytime, anywhere.
          </p>
        </div>
        <img
          className="w-full h-3/5 object-cover px-6"
          src="https://img.freepik.com/free-vector/chatbot-concept-background-with-mobile-device_23-2147832344.jpg?w=740&t=st=1716298194~exp=1716298794~hmac=63e3e402b7b78b8ae235c2be0b73c9c52df212eae795259ba68b285943829a0c"
          // src="https://img.freepik.com/premium-photo/3d-rendering-smartphone-with-chat-bubble-icon-screen-phone-is-black-chat-bubble-is-blue_1187703-49116.jpg?w=1060"
        />
      </div>

      {/* <div className="flex justify-center h-screen items-center"> */}
      <div className="flex items-center justify-center w-2/5 ">
        <Paper elevation={3} className="max-w-sm">
          {isLogin ? (
            <LoginUser setAuthUser={setAuthUser} setIsLogin={setIsLogin} />
          ) : (
            <RegisterUser setAuthUser={setAuthUser} setIsLogin={setIsLogin} />
          )}
        </Paper>
      </div>
    </div>
  );
}
