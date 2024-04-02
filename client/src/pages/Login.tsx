import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import {CameraAltIcon} from "@mui/icons-material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useSignup from "../hooks/useSignup";
import useLogin from "../hooks/useLogin";
import { userData } from "../store/authUserData";
import { useSetRecoilState } from "recoil";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  // const [authUser, setAuthUser] = useRecoilState(userData);
  const setAuthUser = useSetRecoilState(userData);

  return (
    <div className="flex justify-center h-screen items-center">
      <Paper elevation={3} className="max-w-sm p-2 px-6">
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>

            <TextField
              fullWidth
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
              fullWidth
              onClick={() => {
                console.log("process env backend base url : " +process.env.BACKEND_BASE_URL);
                useLogin(email, password, setAuthUser);
              }}
            >
              Login
            </Button>

            <Typography variant="h6" className="text-center mt-2">
              Or
            </Typography>
            <Button variant="text" fullWidth onClick={() => setIsLogin(false)}>
              SIGNUP INSTEAD
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5">Register</Typography>
            <Avatar className="w-40 h-40 object-contain" />
            <TextField type="file">
              <CameraAltIcon />
            </TextField>
            <TextField
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
                useSignup(name, email, password, bio,avatar, setAuthUser);
              }}
            >
              Register
            </Button>
            <Typography variant="h6" className="text-center mt-2">
              Or
            </Typography>
            <Button variant="text" fullWidth onClick={() => setIsLogin(true)}>
              LOGIN INSTEAD
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}
