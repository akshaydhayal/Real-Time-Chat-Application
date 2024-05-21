import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useGetUser from "../hooks/useGetuser";
import useSendFriendRequest from "../hooks/useSendFriendRequest";

export default function AddFriend({ setAddFriendClicked,socket }) {
  const [friendUsername, setFriendUsername] = useState("");
  const [friendSearched, setFriendSearched] = useState([]);

  console.log("searched users : " + JSON.stringify(friendSearched));

  return (
    <div className="w-screen h-screen backdrop-blur-lg flex justify-center items-center" >
      <div className="px-8 p-2 flex flex-col gap-8 w-1/3 h-auto border  border-slate-400 rounded-xl">
        {/* <div className="px-8 p-2 flex flex-col gap-8 w-full h-auto border-2  border-blue-700 rounded-xl"> */}
        <div
          className="flex justify-end text-slate-50"
          onClick={() => {
            setAddFriendClicked(false);
          }}
        >
          <MdCancel className="w-8" />
        </div>
        <div className="flex justify-center">
          <p className="text-lg font-semibold text-slate-100">Find People</p>
        </div>
        <form
          className="flex relative w-full"
          onSubmit={(e) => {
            e.preventDefault();
            useGetUser(friendUsername, setFriendSearched);
          }}
        >
          <button type="submit">
            <FaSearch className="absolute left-2 top-2" />
          </button>
          <input
            className="p-1 px-7 rounded-lg w-full"
            type="text"
            placeholder="Search friend by username"
            onChange={(e) => setFriendUsername(e.target.value)}
          />
        </form>

        <div className="flex flex-col gap-3 items-center w-full">
          {friendSearched &&
            friendSearched.map((f) => {
              return (
                <SingleFriend
                  name={f.name}
                  avatar={f.avatar}
                  username={f.username}
                  socket={socket}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

// export function SingleFriend({ name, avatar,username }) {

export function SingleFriend({ name, avatar,username,socket }) {

  return (
    <div className="flex gap-16 w-full items-center px-10">
        <div className="flex gap-4 items-center">
          <img src={avatar} className="h-8 rounded-full" />
          {/* <p className="text-base w-3/5 text-slate-200">{name}</p> */}
          <p className="text-base text-slate-200">{name}</p>
        </div>
        {/* <button className="rounded-full bg-sky-400 w-8 h-8" onClick={()=>{ */}
        <button className="rounded-md bg-sky-300 p-1 px-6 text-black font-semibold" onClick={()=>{
            useSendFriendRequest(username,socket)
            // useAddFriend(username,friends,setFriends)
        }}>Send Request</button>
        {/* }}>+</button> */}
    </div>
  );
}
