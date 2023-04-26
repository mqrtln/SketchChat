import React from "react";
import { useState } from "react";

export function Frontpage() {
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
      <h1>Hello world!</h1>
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
