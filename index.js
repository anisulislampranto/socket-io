const express = require('express');
const app = express();
const http = require('http');
const { timeout } = require('nodemon/lib/config');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv').config()

const port = process.env.PORT || 4040

// conncection for all 
// io.on('connection', (socket) => {
//     console.log('a user connected');

    // reserved event send data to client 
    // setTimeout(()=>{
    //     socket.send('A text Server to client')
    // }, 10000)

    // custom Event send data to client
    // setTimeout(()=>{
    //     socket.emit("myEvent",'A text Server to client')
    // }, 10000)

    // reserved event recieve data from client  
    // socket.on("message", (text)=>{
    //     console.log(text);
    // })

    // custom event recieve data from client 
    // socket.on("myEvent", (text)=>{
    //     console.log(text);
    // })

    // boradcast 
    // boradcast to everyone 
    // io.sockets.emit("myEvent", "helle peter")

    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
//   });


  // nameSpace
  let buyNsp = io.of("/buy")
  buyNsp.on("connection", (socket)=>{
    console.log("user connected buy");
    buyNsp.emit("myEvent", "hello Matrix buy")
  })

  let sellNsp = io.of("/sell")
  sellNsp.on("connection", (socket)=> {
    console.log("user connected sell");
    sellNsp.emit("myEvent", "hello matrix sell")
  })



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});