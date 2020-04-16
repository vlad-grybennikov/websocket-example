const express = require('express');
const app = express();
const http = require('http').Server(app);

// ONLY HTTP SERVER!!!!
// localhost:9999/chat
const io = require("socket.io")(http, {
    path: '/chat/',
});

const PORT = 9999;
let count = 0;
io.on('connection', (socket) => {
    console.log("User connected");
    console.log(++count);
    socket.on("disconnect", () => {
        --count;
        console.log("disconnected");
    });
    socket.on("typing", () => {
        socket.broadcast.emit("typing");
    });
    socket.on("message", (message) => {
        console.log(`message: ${message}`);
        socket.broadcast.emit("new-message", message);
    })
})

app.use(express.static('../build'));
http.listen(PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});