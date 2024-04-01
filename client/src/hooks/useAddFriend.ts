import axios from "axios";
import toast from "react-hot-toast";

export default async function useAddFriend(
  friendUsername,
//   friends,
  setFriends,
  setFriendRequests
) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/users/friends/${friendUsername}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response);
    const data = await response.data;
    console.log(data);
    if (data.friend) {
      console.log("useer friend req: " + data.user.friend_requests_recieved);
      setFriendRequests(data.user.friend_requests_recieved);
      setFriends((old)=>[...old, data.friend]);

    //   setFriends([...friends, data.friend]);
      // setFriends(data.friend);
      // setFriendSearched(data.friend);
      // setFriendSearched((old)=>[...old,data.friend]);
      // setFriendSearched(data.friend);
    }
  } catch (error) {
    console.log("error in get friends hook : " + error.message);
    if (error.response.data.error) {
      toast.error(error.response.data.error);
    }
  }
}
