import { MdCancel } from "react-icons/md";
import useRejectFriendRequest from '../hooks/useRejectFriendRequest';
import useAddFriend from '../hooks/useAddFriend';
import { useSetRecoilState } from 'recoil';
import { friendsData } from '../store/friendsData';
import { useEffect } from "react";

export default function FriendRequests({ friendRequests,setFriendRequests, setShowFriendRequests,socket }) {
  useEffect(() => {
    socket.on("friend-req", (reqObj) => {
      console.log(reqObj);
      console.log(JSON.stringify(reqObj));
      setFriendRequests((old) => [...old, reqObj.sender]);
    });
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center backdrop-blur-lg" 
    // onClick={()=>{
    //   setShowFriendRequests(false);
    // }}
    >
      <div
        className="w-1/3 h-auto flex flex-col items-center
         border-2 border-slate-300 bg-black p-4"
      >
        <div
          className="w-full flex justify-end text-slate-50"
          onClick={() => {
            setShowFriendRequests(false);
          }}
        >
          <MdCancel />
        </div>
        <p className="text-lg font-semibold mb-4 text-slate-100">
          Friend Requests
        </p>

        {friendRequests.length > 0 ? (
          friendRequests.map((f) => {
            return (
              <Request
                name={f.name}
                avatar={f.avatar}
                username={f.username}
                setFriendRequests={setFriendRequests}
              />
            );
          })
        ) : (
          <p className="text-sm text-slate-400">You have no friend requests</p>
        )}
      </div>
    </div>
  );
}

export function Request({ name, avatar, username, setFriendRequests }) {
    const setFriends=useSetRecoilState(friendsData);
  return (
    <div className="flex gap-12 items-center mb-2">
      <div className="flex gap-3 items-center">
        <img className="h-8 w-8 rounded-full" src={avatar} />
        <p className="text-slate-200">{name}</p>
      </div>

      <div className="flex gap-5">
        <p className="font-medium cursor-pointer hover:underline text-slate-400" onClick={()=>{
          useAddFriend(username, setFriends,setFriendRequests);
        }}>Accept</p>
        <p
          className="font-medium cursor-pointer hover:underline text-slate-400"
          onClick={() => {
            useRejectFriendRequest(username, setFriendRequests);
          }}
          >
          Reject
        </p>
        </div>
    </div>
  );
}