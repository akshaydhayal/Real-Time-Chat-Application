import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useGetUser from "../hooks/useGetuser";
import useSendFriendRequest from "../hooks/useSendFriendRequest";

export default function AddFriend({ setAddFriendClicked }) {
  const [friendUsername, setFriendUsername] = useState("");
  const [friendSearched, setFriendSearched] = useState([]);

  console.log("searched users : " + JSON.stringify(friendSearched));

  return (
    <div className="px-8 p-2 flex flex-col gap-8 w-full h-auto border-2 border-blue-700 rounded-xl">
      <div className="flex justify-end" onClick={() => {
        setAddFriendClicked(false);
      }}>
        <MdCancel/>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-semibold">Find People</p>
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
              />
            );
          })}
      </div>
    </div>
  );
}

export function SingleFriend({ name, avatar,username }) {
  return (
    <div className="flex gap-3 w-full">
        <img src={avatar} className="w-1/5 h-8 rounded-full" />
        <p className="text-base w-3/5">{name}</p>
        <button className="rounded-full bg-sky-400 w-1/5" onClick={()=>{
            useSendFriendRequest(username)
            // useAddFriend(username,friends,setFriends)
        }}>+</button>
    </div>
  );
}
