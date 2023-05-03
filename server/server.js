import express from "express";
import path from "path";
import { WebSocketServer } from 'ws';

const app = express();
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});


const wsServer = new WebSocketServer({ noServer: true });

const sockets = []; 


wsServer.on("connect", (socket) => {
  sockets.push(socket);
  console.log("ws connected");
  socket.send(
    JSON.stringify({ 
      displayName: 'SERVER',
      message: 'Type anything you want!',
      color: '#000000',
    })
  );

  socket.on("message", (data) => {
    const {message, displayName, color } = JSON.parse(data);
    const messageData = { message, displayName, color };
    for (const recipient of sockets) {
      recipient.send(JSON.stringify(messageData));
    }
  })


  socket.on("close", () => {
    sockets.splice(sockets.indexOf(socket), 1);
    console.log("ws disconnected");
  });
  

});


const server = app.listen(5000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connect", socket, request);
    });
  });
});
