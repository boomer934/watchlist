const http = require('http');
const {Server} = require('socket.io');
const express = require('express');
const app = express();

const server  = http.createServer(app);
const io = new Server(server,{cors:{origin:"http://localhost:5173"}})
io.on("connection", (socket) =>{
  socket.join("global")
  socket.emit("message","connesso alla global room")
  socket.on("message",(msg)=>{
    io.to("global").emit("chatMessages",msg)
  })
  console.log("Connected")
  socket.on("disconnect",()=>{
    console.log("Disconnected")
  })
})

module.exports = {server,app,express}