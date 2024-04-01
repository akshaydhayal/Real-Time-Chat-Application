import { useState,lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { userData } from "./store/authUserData";

const Login=lazy(()=>import('./pages/Login'));
const Chat=lazy(()=>import('./pages/Chat'));
const Groups=lazy(()=>import('./pages/Groups'));
const Home=lazy(()=>import('./pages/Home'));

function App() {
  let authUser=useRecoilValue(userData);
  console.log("auth user: "+JSON.stringify(authUser));
  return (
    <div>
        {/* {authUser} */}
        <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={authUser ? <Navigate to={"/"}/> : <Login/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/groups" element={<Groups/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
