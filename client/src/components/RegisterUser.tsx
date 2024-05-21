import { Avatar, Button, TextField, Typography } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from 'react';
import useSignup from '../hooks/useSignup';

export default function RegisterUser({setAuthUser,setIsLogin}) {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [avatar, setAvatar] = useState("");
      const [bio, setBio] = useState("");
  return (
    <div className="bg-[#121212]">
      <p className="text-4xl text-slate-50 font-medium">Create your Account</p>
      {/* <p className="text-slate-500 text-lg">
        Please enter your information to signin
      </p> */}

      <div className="flex gap-4 items-center">
        <Avatar className="w-40 h-40 object-contain" />
        <TextField type="file">
          <CameraAltIcon className="" />
        </TextField>
      </div>

      <TextField
        className="bg-[#1e1e1e]"
        InputLabelProps={{
          style: { color: "#B0B0B0" },
        }}
        InputProps={{
          style: { color: "#EEEEEE" },
        }}
        fullWidth
        variant="outlined"
        label="Name"
        size="small"
        margin="normal"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
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
        label="Email"
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
        type="text"
        label="Avatar URL"
        size="small"
        margin="normal"
        value={avatar}
        onChange={(e) => {
          setAvatar(e.target.value);
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
        type="text"
        label="Bio"
        size="small"
        margin="normal"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          useSignup(name, email, password, bio, avatar, setAuthUser);
        }}
      >
        Register
      </Button>
      <p className="text-slate-400 mt-8 text-center">
        Already have an account ?
        <span
          className="text-slate-200 font-semibold hover:text-slate-300 cursor-pointer "
          onClick={() => {
            setIsLogin(true);
          }}
        >
          {" "}
          Login
        </span>
      </p>
    </div>
  );
}
