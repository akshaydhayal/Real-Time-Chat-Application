import axios from "axios";
import toast from "react-hot-toast";

export default async function useRejectFriendRequest(friendUsername, setFriendRequests) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/users/friends/reject/${friendUsername}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log(data);
    setFriendRequests(data.user.friend_requests_recieved);
  } catch (error) {
    console.log("error in use send friend request: " + error.message);
    toast.error(error.message);
  }
}
