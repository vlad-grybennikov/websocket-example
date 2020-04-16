const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http').Server(app);

// ONLY HTTP SERVER!!!!
// localhost:9999/chat
const io = require("socket.io")(http, {
    path: '/chat/',
});

app.use(cors());

const PORT = 9999;
let count = 0;
io.on('connection', (socket) => {
    console.log("User connected");
    console.log(++count);
    socket.broadcast.emit("user-connected", count);
    socket.emit("user-connected", count);
    socket.on("disconnect", () => {
        console.log(--count);
        console.log("disconnected");
        socket.broadcast.emit("user-disconnected", count);
    });
    socket.on("typing", (isTyping) => {
        console.log(`TYPING: ${isTyping}`);
        socket.broadcast.emit("typing", isTyping);
    });
    socket.on("message", ({message, name}) => {
        console.log(`message: ${message} from: ${name}`);
        socket.broadcast.emit("new-message", { message, name });
    })
})

app.use(express.static('../build'));
http.listen(PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});