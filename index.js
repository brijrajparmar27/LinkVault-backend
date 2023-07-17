require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const linkRouter = require("./routes/linkRoutes");
const http = require("http");
const userRouter = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  global.socket = socket;
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api", linkRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connecting to mongodb...");
    server.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
