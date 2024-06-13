import express from "express";
import http from "http";
import {Server} from "socket.io";

export const app=express();
export const server=http.createServer(app);
export const io = new Server(server, {
  cors: {
    // origin:"http://localhost:5173",
    // origin: "https://chat-application-odsw.onrender.com/",
    origin: "https://chatakshay.netlify.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let userMaptoSocketId={};
io.on("connection",(socket)=>{
    console.log("user connected!!"+socket.id);
    let userId=socket.handshake.query.userId;
    console.log("userId : "+userId);
    if(userId){
        userMaptoSocketId[userId]=socket.id;
    }
    io.emit("online-users",Object.keys(userMaptoSocketId));
    console.log("online users : "+JSON.stringify(userMaptoSocketId));

    socket.on("chat-msg",(msg)=>{
      console.log("msg : "+JSON.stringify(msg));
        //for emitting to all users
        // io.emit("rec-msg",msg);

        //for emiting to just the reciever
        const recSocketId=userMaptoSocketId[msg.reciever];
        const senderSocketId=userMaptoSocketId[msg.sender];
        // io.to(recSocketId).emit("rec-msg",msg);
        io.to([recSocketId,senderSocketId]).emit("rec-msg",msg);
    })
    socket.on("friend-req",(reqObj)=>{
      console.log("friendReq: "+reqObj);
      console.log("friendReq: "+JSON.stringify(reqObj));
      const frientSocketId=userMaptoSocketId[reqObj.reciever._id];
      io.to(frientSocketId).emit('friend-req',reqObj);
    })
    socket.on("disconnect",(socket)=>{
        console.log("user disconnected",socket.id);
        delete userMaptoSocketId[userId];
        io.emit("online-users",Object.keys(userMaptoSocketId));
    })
})
