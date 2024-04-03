import axios from "axios";

export default async function useSendMessage(msg,rec,socket,formData){
  try{
        console.log(`msg rec: ${msg} reciever : ${rec}`);
        formData.append("reciever",rec);
        console.log("formData msg: " + formData.get("message"));
        console.log("formData has file key : " + formData.has("imageFile"));
        console.log("formData rec : " + formData.get("reciever"));

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/messages/send`,
          // {
          //   message: msg,
          //   reciever: rec,
          // }
          formData,
          {
            // headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
          );
          const data=response.data;
        console.log('new Message : '+JSON.stringify(data.newMessage));
        console.log('fileResponse  : '+JSON.stringify(data.uploadResponse));
        // if(data.newMessage){
          //     await setConversations([...conversations, data.newMessage]);
        // }
        
        // socket.emit("chat-msg",data.newMessage);
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





        /*
        export default async function useSendMessage(msg,rec,socket){
            try{
                console.log(`msg rec: ${msg} reciever : ${rec}`);
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_BASE_URL}/messages/send`,
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
                
                // socket.emit("chat-msg",data.newMessage);
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
        */