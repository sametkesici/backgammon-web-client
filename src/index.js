import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProviderCustom } from "./components/ThemeProviderCustom";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import {
  SocketContext,
  friendShipSocket,
  onlineUserSocket,
  gameInviteSocket,
} from "./context/Socket";
import Game from "./pages/Game";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderCustom>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketContext.Provider
            value={{ friendShipSocket, onlineUserSocket, gameInviteSocket }}
          >
            <Navbar></Navbar>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Register />} />
              <Route path="/@/:username" element={<Profile></Profile>}></Route>
              <Route path="/" element={<HomePage></HomePage>} />
              <Route path="/:gameUrl" element={<Game />} />
            </Routes>
          </SocketContext.Provider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProviderCustom>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
