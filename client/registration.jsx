import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseui";
import { useHistory } from "react-router-dom";


export function Registration(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleRegistration = async (event) => {
        event.preventDefault();
        
        try{
            const auth = getAuth(); 
            setMessage("");
             createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
            console.log("Registration successful");
            setMessage("Registration successful"); 
             // Signed in 
             const user = userCredential.user;
             // ...
           })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Registration failed" + error);
                setMessage("Registration failed" + error);

                // ..
                });

}   catch (error) {
    console.log("Registration failed" + error);
}   }   


    return (
    <form onSubmit={handleRegistration}>
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
            color: message.startsWith("Registration successful") ? "green" : "red",
            fontWeight: "bold",
          }}
        >{message}</p>
        
    </form>
    )
}