import React, { useEffect, useMemo, useState } from "react";
import { LuSend } from "react-icons/lu";
import { BiConversation } from "react-icons/bi";
import useGetConversations from "../hooks/useGetConversations";
import { IoNotifications } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { friendToChat } from "../store/friendToChat";
import { userData } from "../store/authUserData";
import useSendMessage from "../hooks/useSendMessage";
import AddFriend from "./AddFriend";
import FriendRequests from "./FriendRequests";
import useLogout from "../hooks/useLogout";


export default function ConversationContainer({socket,conversations,setConversations}) {
  const authUser = useRecoilValue(userData);

  const friendToTalk = useRecoilValue(friendToChat);
  console.log("auth user: " + JSON.stringify(authUser));

  const [msgTyped, setMsgTyped] = useState("");
  console.log('conversationss '+JSON.stringify(conversations));

  const [addFriendClicked, setAddFriendClicked] = useState(false);

  useEffect(() => {
    if (friendToTalk) {
      async function getConversations() {
        const conversationRecieved = await useGetConversations(
          friendToTalk._id
        );
        console.log(
          "conversationRecieved" + JSON.stringify(conversationRecieved)
        );
        setConversations(conversationRecieved);
      }
      getConversations();
    }
  }, [friendToTalk]);

  if (!friendToTalk) {
    return (
      <div className="w-full border-2 border-red-600">
        <NavOptions
          setAddFriendClicked={setAddFriendClicked}
          addFriendClicked={addFriendClicked}
        />
        <div className=" h-max mt-32 flex flex-col items-center gap-2">
          <p className="text-xl font-semibold">Welcome {authUser.name}</p>
          <p className="text-lg font-medium">
            Select a chat to start messaging
          </p>
          <BiConversation className="w-24 h-16" />
        </div>
      </div>
    );
  }
  // console.log('conversations : '+conversations);
  console.log("conversations : " + JSON.stringify(conversations));
  return (
    <div className="w-full relative">
      <NavOptions addFriendClicked={addFriendClicked}
        setAddFriendClicked={setAddFriendClicked}
        name={friendToTalk.name}
        avatar={friendToTalk.avatar}
      />

      <div className="flex flex-col gap-4 h-[82vh] overflow-auto">
        {conversations &&
          conversations.map((c) => {
            return c.sender === authUser?._id ? (
              <RightConversation msg={c.message} />
            ) : (
              <LeftConversation
                msg={c.message}
                friendAvatar={friendToTalk.avatar}
              />
            );
          })}
      </div>
      <div className="fixed bottom-0 w-[73vw] p-2 px-6 h-[10vh] ">
        <form
          className="flex relative h-full"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              `before calling values message:${msgTyped} reciever: ${friendToTalk._id}`
            );
            useSendMessage(
              msgTyped,
              friendToTalk._id,
              conversations,
              setConversations,
              socket
            );
          }}
        >
          <input
            className="p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Type a message"
            value={msgTyped}
            onChange={(e) => {
              setMsgTyped(e.target.value);
            }}
          />
          <button type="submit">
            <LuSend className="absolute right-7 bottom-3" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function RightConversation({ msg }) {
  return (
    <div className="flex justify-end">
      <div className="w-max max-w-2xl flex items-center gap-2">
        <p className="text-base border-2 rounded-l-2xl w-auto rounded-b-2xl p-2 px-3">
          {msg}
        </p>
        <img className="h-8 rounded-full " src="/avatar.jpg" />
      </div>
    </div>
  );
}
export function LeftConversation({ msg, friendAvatar }) {
  return (
    <div className="flex justify-start">
      <div className="w-max max-w-2xl flex items-center px-1 gap-2">
        {/* <img className="h-8 rounded-full " src="/avatar.jpg" /> */}
        <img className="h-8 rounded-full " src={friendAvatar} />
        <p className="text-base border-2 rounded-l-2xl w-auto rounded-b-2xl p-2 px-3">
          {msg}
        </p>
      </div>
    </div>
  );
}

export function NavOptions({addFriendClicked,setAddFriendClicked,name,avatar}){
  const authUser=useRecoilValue(userData);
  const [friendRequests, setFriendRequests] = useState(authUser.friend_requests_recieved);
  const [showFriendRequests,setShowFriendRequests]=useState(false);

  return (
    <div className="border border-gray-600 bg-gray-400 h-[8vh] p-2 px-4 flex gap-4 items-center">
      {avatar && <img className="w-10 h-10 rounded-full" src={avatar} />}
      {name && <p className=" ">{name}</p>}

      <div className="flex justify-end w-full border border-gray-600 bg-gray-400 h-[8vh] p-2 px-4 gap-4 ">
        <button
          className="w-8 h-8 rounded-full bg-sky-400 font-semibold text-2xl"
          onClick={() => setAddFriendClicked(true)}
        >
          +
        </button>
        <IoNotifications
          className="w-8 h-8 rounded-full bg-sky-400 font"
          onClick={() => setShowFriendRequests(true)}
        />
        <button
          className="w-8 h-8 rounded-full bg-sky-300 flex justify-center items-center"
          onClick={() => useLogout()}
        >
          <CiLogout/>
        </button>
      </div>

      {showFriendRequests && (
        <FriendRequests
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          setShowFriendRequests={setShowFriendRequests}
        />
      )}
      {addFriendClicked && (
        <div
          className="fixed w-screen h-screen left-0 top-0 right-0 bottom-0 border-2 border-red-700"
          // onClick={() => {setAddFriendClicked(false)}}
        >
          <div className="w-1/3 h-1/3 absolute left-1/3 top-1/4 z-1 bg-black">
            <AddFriend setAddFriendClicked={setAddFriendClicked} />
          </div>
        </div>
      )}
    </div>
  );
}