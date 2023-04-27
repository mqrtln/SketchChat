import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import '../styles/Chat.css'

export function Chat() {
  const [message, setMessage] = useState("");
  const [chatBox, setChatBox] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser; 
    if (user !== null) {
      setDisplayName(user.displayName);
      setColor(getRandomColor());
    }
  }, []);

  const handleMessage = () => {
    setChatBox([...chatBox, { message, displayName, color }]);
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

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "orange", "purple", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  };


  useEffect(() =>{
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatBox]);
  
  return (
    <div className="chat-container">
      <div className="navbar">
        <h1>Welcome to the chat client</h1>
        <h4>
          Logged in as:{" "}
          <span style={{ fontWeight: "bold", color: color, marginRight: "10px" }}>{displayName}</span>
          <button className="logout-button" onClick={handleSignOut}>Log out</button>
        </h4>
      </div>
    
      <div className="chat-box" ref={chatBoxRef}>
        {chatBox.map((msg, index) => (
          <div key={index} className="message" style={{ color: msg.color }}>
            <span style={{ fontWeight: "bold" }}>{msg.displayName}: </span>
            {msg.message}
          </div>
        ))}
      </div>
    
      <footer className="input-container">
        <input
          className="chat-input"
          type="text"
          placeholder="Type something.."
          value={message}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleMessage();
            }
          }}
        />
        <button className="send-button" onClick={handleMessage}>Send</button>
      </footer>
    </div>
  );
  
  
  
  
}
