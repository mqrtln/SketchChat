import express from "express";
import path from "path";


const app = express();
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});



const sockets = []; 




const server = app.listen(5001, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connect", socket, request);
    });
  });
});
