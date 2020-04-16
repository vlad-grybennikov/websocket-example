const express = require('express');
const http = require('http');
const socket = require("socket.io"); // socket.io
const app = express(); // express

const PORT = process.env.PORT || 9999;

app.use(express.static('build'));

const server = http.Server(app); // http server
const io = socket(server, {});

const history = [{
    message: 'Test message',
    image: "/img/bg-login.jpg"
}];

let online = 0;
io.on('connection', (client) => {
    console.log(`New connection, online: ${++online}, ${client.id}`);

    client.emit("send-history", history);

    client.on("send-message", (message) => {
        console.log(message);
        history.push({
            message,
            image: "/img/bg-login.jpg"
        })
        client.broadcast.emit("receive-message", message);
    })
    client.on("disconnect", () => {
        console.log(`User disconnected, online: ${--online}`);
    })
});

server.listen(PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});



