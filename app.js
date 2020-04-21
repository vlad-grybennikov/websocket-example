const sendResponse = require("./send");

const express = require('express');
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
const RestError = require("./restError");
const {addUser, getAllUsers} = require("./users");
const {addTweet, getAllTweets} = require("./tweets");

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
        socket.broadcast.emit("new-message", {message, name});
    })
})


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/users", addUser, sendResponse);
app.get("/users", getAllUsers, sendResponse);

app.post("/tweets", addTweet, (req, res, next) => {
    io.emit("new-tweet", res.data);
    next();
}, sendResponse);
app.get("/tweets", getAllTweets, sendResponse);

app.use((req, res, next) => {
    const err = new RestError('Запрашиваемый метод API не найден', 404);
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: err.message,
        success: false
    });
});

app.use(express.static('../build'));
http.listen(PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});