import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import useLogin from '../hooks/useLogin';

export default function LoginUser({setAuthUser,setIsLogin}) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[#121212] ">
      <p className="text-4xl text-slate-50 font-medium">Welcome back 👋</p>
      <p className="text-slate-500 text-lg">
        Please enter your information to signin
      </p>

      <TextField
        className="bg-[#1e1e1e] "
        fullWidth
        variant="outlined"
        label="Email"
        InputLabelProps={{
          style: { color: "#B0B0B0" }
        }}
        InputProps={{
          style: { color: "#EEEEEE" }
        }}
        size="small"
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        fullWidth
        className="bg-[#1e1e1e]"
        InputLabelProps={{
          style: { color: "#B0B0B0" },
        }}
        InputProps={{
          style: { color: "#EEEEEE" },
        }}
        variant="outlined"
        type="password"
        label="Password"
        size="small"
        margin="normal"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        variant="contained"
        className="text-black"
        fullWidth
        onClick={() => {
          console.log(import.meta.env.VITE_PORT); // "123"
          console.log(import.meta.env.VITE_BACKEND_BASE_URL); // "123"
          useLogin(email, password, setAuthUser);
        }}
      >
        Login
      </Button>

      <p className="text-slate-400 mt-12 text-center">
        Don't have an account ?
        <span
          className="text-slate-200 font-semibold hover:text-slate-300 cursor-pointer "
          onClick={() => {
            setIsLogin(false);
          }}
        >
          {" "}
          Sign up
        </span>{" "}
      </p>
    </div>
  );
}
