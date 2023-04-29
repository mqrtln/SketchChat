import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { signOut } from "firebase/auth";
import { getRandomColor } from "./components/getRandomColor";
import './styles/Chat.css'

export function Chat() {
  const [message, setMessage] = useState("");
  const [chatBox, setChatBox] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState("");
  const [displayNameSet, setDisplayNameSet] = useState(false);


  const auth = getAuth();
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const database = getDatabase();
  const randomColor = getRandomColor();


  const handleMessage = () => {
    const messageRef = ref(database, "messages/");
    push(messageRef, {message, displayName, color});
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


  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      if (user.displayName) {
        setDisplayName(user.displayName);
        console.log("Display name is " + user.displayName);
      } else {
        setDisplayName('Anonymous');
        console.log("Display name is " + user.displayName);
      }
      setColor(randomColor);
      setDisplayNameSet(true);
    }
  }, []);


  


  useEffect(() => {
    const messageRef = ref(database, "messages/");
    onValue(messageRef, (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        setChatBox(Object.values(messages));
      }
    });
  }, [database]);

  
  return (
    <>
      {displayNameSet && (
        <div className="chat-container">
          <div className="navbar">
            <h1>Welcome to the chat client</h1>
            <h4>
              Logged in as:{" "}
              <span style={{ fontWeight: "bold", color: color, marginRight: "10px", textShadow: "0.5px 0.5px 0.5px #000" }}>{displayName}</span>
              <button className="logout-button" onClick={handleSignOut}>Log out</button>
            </h4>
          </div>
        
          <div className="chat-box" ref={chatBoxRef}>
            {chatBox.map((msg, index) => (
              <div key={index} className="message">
                <span style={{ fontWeight: "bold", color: msg.color, textShadow: "0.5px 0.5px 0.5px #000" }}>
                  {msg.displayName}:
                </span>
                <span style={{ color: "#000" }}>
                  {msg.message}
                </span>
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
      )}
    </>
  );
}
