import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      setMessage("");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Login successful");
          navigate("/chat");
          setMessage("Login successful");
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Login failed" + error);
          setMessage("Login failed" + error);
        });
    } catch (error) {
      console.log("Login failed" + error);
      setMessage("Login failed" + error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p
        style={{
          color: message.startsWith("Login successful") ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {message}
      </p>
      <ul>
        <li>
          {" "}
          <Link to="/register">Don't have an account yet?</Link>
        </li>
      </ul>
    </>
  );
}
