import axios from "axios";

export default async function useSendMessage(msg,rec,socket){
    try{
        console.log(`msg rec: ${msg} reciever : ${rec}`);
        const response = await axios.post(
          `${process.env.BACKEND_BASE_URL}/messages/send`,
          {
            message: msg,
            reciever: rec,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const data=response.data;
        console.log('new Message : '+JSON.stringify(data.newMessage));
        // if(data.newMessage){
        //     await setConversations([...conversations, data.newMessage]);
        // }
        socket.emit("chat-msg",data.newMessage);
        // socket.on("rec-msg",async(msgg)=>{
        //     console.log("msg recievedd: "+JSON.stringify(msgg));
        //     // await setConversations([...conversations,msgg]);
        //     await setConversations((old)=>{
        //         return[...old, msgg];
        // });
        // })
    }catch(error){
        console.log(error.message);
    }
} 