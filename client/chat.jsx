import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


export function Chat() {
  const [message, setMessage] = useState("");
  const [chatBox, setChatBox] = useState([]);

  const handleMessage = () => {
    setChatBox([...chatBox, message]);
    setMessage("");
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to the chat client</h1>
      <ul>
        <li><Link to="/login">Log out</Link></li>
      </ul>
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
          onChange={handleInputChange} />
        <button onClick={handleMessage}>Send</button>
      </footer>
    </div>
  );
}
