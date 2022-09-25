import React from "react";
import io from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const URL = "http://localhost:9092";

export default function Game() {
  const location = useLocation();
  console.log(location);

  useEffect(() => {}, []);

  return <div>oyun odası</div>;
}
