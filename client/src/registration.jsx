import { getAuth, createUserWithEmailAndPassword, getAdditionalUserInfo, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "firebaseui";
import { useNavigate, Link } from "react-router-dom";

export function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      setMessage("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Registration successful");
          setMessage("Registration successful");
          // Signed in
          updateProfile(auth.currentUser, {
            displayName: username,
          }).then(() => {
            // Profile updated!
            console.log("Profile updated");
            // ...
          })
          .catch((error) => {
            // An error occurred
            console.log("Profile update failed" + error);
            // ...  
          });

          navigate("/chat");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Registration failed" + error);
          setMessage("Registration failed" + error);

          // ..
        });
    } catch (error) {
      console.log("Registration failed" + error);
    }
  };

  return (
    <>
      <Link to="/">Go back to login</Link>
      <form onSubmit={handleRegistration}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
      
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
        <button type="submit">Register</button>
        <p
          style={{
            color: message.startsWith("Registration successful")
              ? "green"
              : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      </form>
    </>
  );
}
