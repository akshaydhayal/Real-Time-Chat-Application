import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
import { BiConversation } from "react-icons/bi";
import useGetConversations from "../hooks/useGetConversations";
import { IoNotifications } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { useRecoilValue, useRecoilState } from "recoil";
import { friendToChat } from "../store/friendToChat";
import { userData } from "../store/authUserData";
import useSendMessage from "../hooks/useSendMessage";
import AddFriend from "./AddFriend";
import FriendRequests from "./FriendRequests";
import useLogout from "../hooks/useLogout";

export default function ConversationContainer({
  socket,
  conversations,
  setConversations,
}) {
  const authUser = useRecoilValue(userData);
  const friendToTalk = useRecoilValue(friendToChat);
  console.log("auth user: " + JSON.stringify(authUser));

  const [msgTyped, setMsgTyped] = useState("");
  const [fileToSend, setFileToSend] = useState(null);

  console.log("conversationss " + JSON.stringify(conversations));

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
      <div className="w-full">
        <NavOptions
          setAddFriendClicked={setAddFriendClicked}
          addFriendClicked={addFriendClicked}
          name=""
          avatar=""
          socket={socket}
        />
        <div className=" h-[90vh] flex flex-col items-center justify-center gap-2 bg-[#000000]">
          <p className="text-xl font-semibold text-slate-100">Welcome {authUser.name}</p>
          <div className="flex gap-4 items-center">

          <p className="text-lg font-medium text-slate-300">
            Select a chat to start messaging
          </p>
          <BiConversation className="w-12 rounded-full p-2 h-12 bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }
  // console.log('conversations : '+conversations);
  console.log("conversations : " + JSON.stringify(conversations));
  return (
    <div className="w-full relative">
      <NavOptions
        addFriendClicked={addFriendClicked}
        setAddFriendClicked={setAddFriendClicked}
        name={friendToTalk.name}
        avatar={friendToTalk.avatar}
        socket={socket}
      />

      <div className="flex flex-col gap-4 h-[80vh] overflow-auto bg-[#000000]">
        {conversations &&
          conversations.map((c) => {
            return c.sender === authUser?._id ? (
              <RightConversation
                msg={c.message}
                fileData={c.fileData}
                createdAt={c.createdAt}
              />
            ) : (
              <LeftConversation
                msg={c.message}
                fileData={c.fileData}
                friendAvatar={friendToTalk.avatar}
                createdAt={c.createdAt}
              />
            );
          })}
      </div>
      <div className="fixed bottom-0 w-[79vw] p-2 px-6 h-[10vh] bg-[#121212]">
        <form
          encType="multipart/form-data"
          className="flex relative h-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              `before calling values message:${msgTyped} reciever: ${friendToTalk._id}`
            );
            const formData = new FormData();
            formData.append("imageFile", fileToSend);
            formData.append("message", msgTyped);

            console.log("formData : " + formData.get("message"));
            console.log("formData has file key : " + formData.has("imageFile"));

            useSendMessage(msgTyped, friendToTalk._id, socket, formData);

            // useSendMessage(msgTyped, friendToTalk._id, socket);
          }}
        >
          <label
            htmlFor="image"
            className="text-lg font-normal bg-[#383838] text-slate-100
          border border-slate-400 p-1 px-2 rounded-lg hover:border-slate-700"
          >
            Upload
          </label>
          <input
            className="hidden"
            type="file"
            id="image"
            onChange={(e) => setFileToSend(e.target.files[0])}
          />

          <input
            className="p-2 px-4 rounded-lg w-full bg-[#383838] text-slate-100 placeholder:text-slate-200"
            type="text"
            placeholder="Type a message"
            value={msgTyped}
            onChange={(e) => {
              setMsgTyped(e.target.value);
            }}
          />
          <button type="submit">
            <LuSend className="absolute right-7 bottom-3 text-slate-100" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function RightConversation({ msg, fileData, createdAt }) {
  const msgDate = new Date(createdAt);
  const msgHours =
    msgDate.getHours() > 12 ? msgDate.getHours() - 12 : msgDate.getHours();
  const msgMinutes = msgDate.getMinutes();
  const msgDayNightStatus = msgDate.getHours() >= 12 ? "PM" : "AM";
  const msgTime = `${msgHours}:${msgMinutes} ${msgDayNightStatus}`;

  return (
    <div className="flex justify-end ">
      <div className="w-max max-w-2xl flex items-center gap-2 ">
        <div className="border rounded-l-xl w-auto rounded-b-xl p-1 px-3 flex flex-col gap-4 bg-[#343434]">
          {fileData.url != "" && (
            <img src={fileData.url} className="w-60 h-48" />
          )}
          <div className="flex gap-4">
            <p className="text-base text-slate-200">{msg}</p>
            <p className="text-xs font-extralight  pt-3 text-slate-400">
              {msgTime}
            </p>
          </div>
        </div>

        <img className="h-8 rounded-full " src="/avatar.jpg" />
      </div>
    </div>
  );
}

export function LeftConversation({ msg, fileData, friendAvatar, createdAt }) {
  const msgDate = new Date(createdAt);
  const msgHours =
    msgDate.getHours() > 12 ? msgDate.getHours() - 12 : msgDate.getHours();
  const msgMinutes = msgDate.getMinutes();
  const msgDayNightStatus = msgDate.getHours() >= 12 ? "PM" : "AM";
  const msgTime = `${msgHours}:${msgMinutes} ${msgDayNightStatus}`;
  return (
    <div className="flex justify-start">
      <div className="w-max max-w-2xl flex items-center px-1 gap-2 bg-[#343434] ">
        <img className="h-8 rounded-full " src={friendAvatar} />

        <div className="border rounded-r-xl w-auto rounded-b-xl p-1 px-3 flex flex-col gap-4">
          {fileData.url != "" && (
            <img src={fileData.url} className="w-60 h-48" />
          )}
          <div className="flex gap-4">
            <p className="text-base text-slate-200">{msg}</p>
            <p className="text-xs font-extralight  pt-3 text-slate-400">
              {msgTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavOptions({
  addFriendClicked,
  setAddFriendClicked,
  name,
  avatar,
  socket,
}) {
  const [authUser, setAuthUser] = useRecoilState(userData);
  const [friendRequests, setFriendRequests] = useState(
    authUser.friend_requests_recieved
  );
  console.log("friend Requests : " + friendRequests);
  console.log("friend Requests : " + JSON.stringify(friendRequests));
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  return (
    <div className="border border-gray-600 bg-[#343434] h-[10vh] p-2 px-4 flex gap-4 items-center ">
      {avatar && <img className="w-10 h-10 rounded-full" src={avatar} />}
      {name && <p className="text-slate-100">{name}</p>}

      <div className="flex justify-end w-full border border-gray-600 bg-[#343434] h-[8vh] p-2 px-4 gap-4 ">
        <button
          className="w-7 h-7 rounded-full bg-slate-200 font-semibold text-2xl"
          onClick={() => setAddFriendClicked(true)}
        >
          +
        </button>
        <IoNotifications
          className="w-7 h-7 p-1 rounded-full bg-slate-200 font"
          onClick={() => setShowFriendRequests(true)}
        />
        <button
          className="w-7 h-7 p-1 rounded-full bg-slate-200 flex justify-center items-center"
          // onClick={() => useLogout()}
          onClick={() => useLogout(setAuthUser)}
        >
          <CiLogout />
        </button>
      </div>

      {showFriendRequests && (
        <div className="w-screen h-screen fixed top-0 left-0">
        <FriendRequests
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          setShowFriendRequests={setShowFriendRequests}
          socket={socket}
        />
        </div>
      )}
      {addFriendClicked && (
        <div
          className="fixed w-screen h-screen left-0 top-0 right-0 bottom-0"
        >
          <div>
            <AddFriend
              setAddFriendClicked={setAddFriendClicked}
              socket={socket}
            />
          </div>
        </div>
      )}
    </div>
  );
}
