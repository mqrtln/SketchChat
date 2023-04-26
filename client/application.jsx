import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { Chat } from "./chat";
import { Login } from "./login";
import { Registration } from "./registration";

export function Application(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/register" element={<Registration />} /> 
    </Routes>
  </BrowserRouter>
}