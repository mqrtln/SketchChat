import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Chat } from "./chat";
import { Login } from "./login";
import { ProtectedRoute } from "./components/protectedRoute";
import { Registration } from "./registration";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
