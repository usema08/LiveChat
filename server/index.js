const express = require("express");
const app = express();

const http = require('http');   // http is inbuild package
const cors = require('cors');
const { Server } = require('socket.io');  //Server is a liberary in socket.io package

app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',   //url of react app
        methods: ['GET', 'POST']
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", (data));
    }) 

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
})

server.listen(3001, () => {
    console.log('Surver Running!!!');
} )