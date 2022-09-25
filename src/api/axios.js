import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/register", body);
};

export const login = (body) => {
  return axios.post("/api/auth/signin", body);
};

export const signout = () => {
  return axios.post("/api/auth/signout");
};

export const searchUser = (username) => {
  return axios.get(`/api/player/${username}`);
};

export const addFriend = (addFriendRequest) => {
  return axios.post(`/api/friendship/add-friend`, addFriendRequest);
};

export const replyFriendRequest = (replyFriendRequest) => {
  return axios.post(`/api/friendship/reply-friend-request`, replyFriendRequest);
};

export const checkFriendShipStatus = (friendName) => {
  return axios.get(`/api/friendship/checkStatus/${friendName}`);
};

export const gameInviteRequest = (opponentUser) => {
  return axios.get("/api/game/invite", { params: { opponentUser } });
};

export const replyGameInviteRequest = (replyGameInvite) => {
  return axios.post("/api/game/reply-game-invite", replyGameInvite);
};
