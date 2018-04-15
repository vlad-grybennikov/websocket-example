const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = 9999;
const io = require("socket.io")();

app.use(express.static('build'));
http.listen(PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});
