const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


app.get('/', (req, res) => {
    console.log("hello world")
    res.send("<h1>hello world</h1>")
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log('message : ' + msg);
        io.emit('message', msg);
    })

    // Disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
})