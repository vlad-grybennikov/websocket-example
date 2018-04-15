const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    path: '/chat/',
});

const PORT = 9999;

io.on('connection', (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("disconnected");
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
