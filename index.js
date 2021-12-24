const express = require('express');
const app = express();
const http = require('http');
const { timeout } = require('nodemon/lib/config');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv').config()

const port = process.env.PORT || 4040

io.on('connection', (socket) => {
    console.log('a user connected');

    // setTimeout(()=>{
    //     socket.send('A text Server to client')
    // }, 10000)

    // custom Event 
    setTimeout(()=>{
        socket.emit("myEvent",'A text Server to client')
    }, 10000)


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});