import axios from "axios";
import toast from "react-hot-toast";

export default async function useRejectFriendRequest(friendUsername, setFriendRequests) {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/users/friends/reject/${friendUsername}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log(data);
    // setFriendRequests(data.user.friend_requests_recieved);
    if(data.friend){
      setFriendRequests((old) => {
        console.log("old friend req inside useAdd Friend" + JSON.stringify(old));
        return old.filter((r) => r._id != data.friend._id);
      });
    }
  } catch (error) {
    console.log("error in use send friend request: " + error.message);
    toast.error(error.message);
  }
}
