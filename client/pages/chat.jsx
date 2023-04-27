import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Chat() {
  const [message, setMessage] = useState("");
  const [chatBox, setChatBox] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in");
      const username = user.identifier;
      console.log(username);
    }
  });

  const handleMessage = () => {
    setChatBox([...chatBox, message]);
    setMessage("");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out successful");
      navigate("/");
    } catch (error) {
      console.log("Sign out failed" + error);
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to the chat client</h1>
      <button onClick={handleSignOut}>Log out</button>
      <div>
        {chatBox.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <footer>
        <input
          type="text"
          placeholder="Type something.."
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={handleMessage}>Send</button>
      </footer>
    </div>
  );
}
