require("dotenv").config();
const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const linkRouter = require("./routes/linkRoutes");

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api",linkRouter);

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("connecting to mongodb...")
  app.listen("3000", () => {
    console.log("listening at port 3000");
  });
  // const collection = mongoose.connection.collection('links')
  // const watcher = collection.watch();
  // watcher.on('change',(change)=>{
  //   console.log(change);
  // })
}).catch(err=>{
  console.log(err.message);
})

