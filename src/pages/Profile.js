import { Typography } from "@mui/material";
import { Navigate, useParams } from "react-router";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  addFriend,
  checkFriendShipStatus,
  gameInviteRequest,
} from "../api/axios";
import io from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../context/Socket";
import { gameInviteSocket } from "./../context/Socket";
import { useNavigate, useLocation } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  const ownerUser = JSON.parse(localStorage.getItem("username"));

  const [friendshipStatus, setFriendshipStatus] = useState();

  const { friendShipSocket, gameInviteSocket } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await checkFriendShipStatus(username);
      setFriendshipStatus(response.data.status);
    }
    fetchData();
  }, [username]);

  const onClickAddFriend = () => {
    addFriend({ friendName: username });
    console.log("socket test : " + username);
    friendShipSocket.emit("/notification", { username });
  };

  const joinRoom = io(URL + "/game", {
    query: `username=${username}`,
    transports: ["websocket"],
    upgrade: false,
  });

  const gameInvite = async () => {
    try {
      const response = await gameInviteRequest(username);

      const url = response?.data;
      navigate(`/${url}`);
    } catch {
      console.log("istek atamadik");
    }
    joinRoom.emit("/createRoom", { ownerUser });
    gameInviteSocket.emit("/inviteToGame", { username });
  };

  return (
    <Container>
      <Typography>{username}</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          disabled={friendshipStatus === "PENDING" ? true : false}
          onClick={onClickAddFriend}
          variant="contained"
          startIcon={<GroupAddIcon />}
        >
          {friendshipStatus === "APPROVED" ? "Unfriend" : "Add a friend"}
        </Button>
        <Button onClick={gameInvite} variant="contained" endIcon={<SendIcon />}>
          işlevsiz
        </Button>
      </Stack>
    </Container>
  );
}
