import { useMemo,useEffect,useState } from 'react';
import ConversationContainer from '../components/ConversationContainer'
import FriendsSidebarList from '../components/FriendsSidebarList'
import { io } from 'socket.io-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData } from '../store/authUserData';
import { onlineUsers } from '../store/onlineUsers';

export default function Home() {
  const authUser=useRecoilValue(userData);
  const [conversations, setConversations] = useState([]);
  // const [onlineUsers,setOnlineUsers] = useRecoilState(onlineUsers);
  const setOnlineUsers = useSetRecoilState(onlineUsers);
  const [onlineUser,setOnlineUser]=useState([]);

  const socket = useMemo(() => io("http://localhost:3001",{
    query:{
      userId:authUser?._id
    }
  } ), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected!!" + socket.id);
    });
    socket.on("rec-msg", (msg) => {
      console.log("rec-msg : " + JSON.stringify(msg));
      setConversations((old) => {
        return old ? [...old, msg] : [msg];
      });
    });
    if (!authUser._id) {
      socket.close();
    }
    socket.on("online-users", (allOnlineUsers) => {
      console.log("online-users: " + allOnlineUsers);
      setOnlineUsers(allOnlineUsers);
      setOnlineUser(allOnlineUsers);
    });
    return () => {
      socket.off("connect", () => {});
      socket.off("rec-msg", () => {});
    };
  }, []);

  return (
    <div className='flex'>
        <FriendsSidebarList onlineUser={onlineUser}/>
        <ConversationContainer socket={socket} conversations={conversations} setConversations={setConversations}/>
    </div>
  )
}
