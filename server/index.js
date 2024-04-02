import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnect.js";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
// const app=express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://render.com/docs/node-version",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  dbConnect();
  console.log("server ia running at port " + PORT);
});

// const app=express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));

// app.use("/api/auth",authRouter);
// app.use("/api/messages",messageRouter);
// app.use("/api/users",userRouter);

// const PORT=process.env.PORT || 3000;
// app.listen(PORT,()=>{
//     dbConnect();
//     console.log("server ia running at port "+PORT);
// })
