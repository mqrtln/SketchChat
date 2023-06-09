import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./application";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const container = document.getElementById("app");
const root = createRoot(container);
const config = {
  apiKey: "AIzaSyBnIhQuDZLqpRN3zc8dJmgX8YyOe8oiIkw",
  authDomain: "sketchlandchat.firebaseapp.com",
  projectId: "sketchlandchat",
  storageBucket: "sketchlandchat.appspot.com",
  messagingSenderId: "324674055714",
  appId: "1:324674055714:web:8847b826630fd8e868a47b",
  measurementId: "G-T9CELWMKYE",
  databaseURL: "https://sketchlandchat-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(config);



const database= getDatabase(app);
root.render(<Application />);
