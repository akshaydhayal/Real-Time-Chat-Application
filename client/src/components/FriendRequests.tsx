import React from 'react'
import { MdCancel } from "react-icons/md";
import useRejectFriendRequest from '../hooks/useRejectFriendRequest';
import useAddFriend from '../hooks/useAddFriend';
import { useSetRecoilState } from 'recoil';
import { friendsData } from '../store/friendsData';

export default function FriendRequests({ friendRequests,setFriendRequests, setShowFriendRequests }) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <div
        className="w-1/3 h-1/4 fixed left-1/3 top-1/4 flex flex-col items-center
         border-2 border-slate-300 bg-black p-4"
      >
        <div
          className="w-full flex justify-end "
          onClick={() => {setShowFriendRequests(false)}}
        >
          <MdCancel />
        </div>
        <p className="text-lg font-semibold mb-4">Friend Requests</p>
        {friendRequests &&
          friendRequests.map((f) => {
            return (
              <Request
                name={f.name}
                avatar={f.avatar}
                username={f.username}
                setFriendRequests={setFriendRequests}
              />
            );
          })}
      </div>
    </div>
  );
}

export function Request({ name, avatar, username, setFriendRequests }) {
    const setFriends=useSetRecoilState(friendsData);
  return (
    <div className="flex gap-3 items-center">
      <img className="h-8 w-8 rounded-full" src={avatar} />
      <p className="">{name}</p>
      <p className="font-medium" onClick={()=>{
        useAddFriend(username, setFriends,setFriendRequests);
      }}>Accept</p>
      <p
        className="font-medium"
        onClick={() => {
          useRejectFriendRequest(username, setFriendRequests);
        }}
      >
        Reject
      </p>
    </div>
  );
}