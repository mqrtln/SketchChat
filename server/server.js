import express from 'express';





const app = express();
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});


const server = app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
