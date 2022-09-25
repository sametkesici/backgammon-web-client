import React from "react";
import io from "socket.io-client";

const username = JSON.parse(localStorage.getItem("username"));

const URL = "http://localhost:9092";

export const friendShipSocket = io(URL + "/friendship", {
  query: `username=${username}`,
  transports: ["websocket"],
  upgrade: false,
});

export const onlineUserSocket = io(URL + "/onlineUsers", {
  query: `username=${username}`,
  transports: ["websocket"],
  upgrade: false,
});

export const gameInviteSocket = io(URL + "/gameInvite", {
  query: `username=${username}`,
  transports: ["websocket"],
  upgrade: false,
});

export const SocketContext = React.createContext();
