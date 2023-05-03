import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, push, onChildAdded, get } from "firebase/database";
import { signOut } from "firebase/auth";
import { getRandomColor } from "./components/getRandomColor";
import './styles/Chat.css'

export function Chat() {
  const [message, setMessage] = useState("");
  const [chatBox, setChatBox] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState("");
  const [displayNameSet, setDisplayNameSet] = useState(false);
  const [userUid, setUserUid] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const database = getDatabase();
  const randomColor = getRandomColor();
  let time = new Date().toLocaleTimeString();


  const handleMessage = () => {
    const messageData = { message, displayName, color };
    const socketMessage = JSON.stringify(messageData);
    const socket = new WebSocket("ws://localhost:5000");
    socket.addEventListener("open", () => {
      socket.send(socketMessage);
      socket.close();
    });
    const messageRef = ref(database, "messages/");
    push(messageRef, {message, displayName, color, userUid, time});
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


  // Sets the display name and color
  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      if (user.displayName) {
        setDisplayName(user.displayName);
        setUserUid(user.uid);
        console.log("Display name is " + user.displayName);
      } else {
        setDisplayName('Anonymous');
        console.log("Display name is " + user.displayName);
      }
      setColor(randomColor);
      setDisplayNameSet(true);
    }
  }, []);

  // Setting up websocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    socket.addEventListener("open", () => {
      console.log("Connected to websocket");
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setChatBox((prevChatBox) => [...prevChatBox, data]);
    });
    return () => {
      socket.close();
    };
  }, []);

    // Fetch messages from database when component mounts
    useEffect(() => {
      const messageRef = ref(database, "messages/");
      get(messageRef).then((snapshot) => {
        const messages = snapshot.val();
        const uniqueMessages = [];
        for (let id in messages) {
          const message = messages[id];
          if(!uniqueMessages.some((m) => m.userUid === message.userUid && m.message === message.message)) {
            uniqueMessages.push({...message, id});
            }
            }
            setChatBox(uniqueMessages);
            });
    }, []);


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
