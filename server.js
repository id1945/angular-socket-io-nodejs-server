// Express
const express = require('express');
// SocketIO
const socket = require('socket.io');
// Body parser
const bodyParser = require('body-parser');
// Cors
const cors = require('cors');

// Using express
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser);

// Start server port 3000
const server = app.listen(3000, () => {
    console.log('Started in 3000');
});

// Setup socket
const io = socket(server);

// New conection socket
io.sockets.on('connection', (socket) => {
    console.log(`New connection id: ${socket.id}`);
    listen1(socket);
    send1(socket);
    send2(socket);
})

function listen1(socket) {
    socket.on('data1', (res) => {
        console.log(res);
        send1(socket);
    })
}

function send1(socket) {
    // Dummy data chatbot
    socket.emit('data1', { user: 'Admin', message: 'Hello client'});
}

function send2(socket) {
    // Dummy data chart
    const data = Array.from({
        length: 10
    }, () => Math.floor(Math.random() * 590) + 10);
    socket.emit('data2', data);
    setTimeout(function() {
        send2(socket);
    }, 1000);
}