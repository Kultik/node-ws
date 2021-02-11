// const app = require('express')(); // create our express
var express = require('express');
var app = express();

// server creation

const http = require('http').createServer(app);

// socket creation

const io = require('socket.io')(http);

// To establish CSS link

app.use(express.static(__dirname + '/css'));

// ROUTES CREATION

app.get('/', function (req, res) {
    // route to html
    res.sendFile(__dirname + "/index.html");
})

app.get('/css', function (req, res) {
    res.sendFile(__dirname + "/css/style.css");
})

http.listen(3000, function () {
    console.log('Localhost:3000');
})


// Catch an event
io.on('connection', function (socket) {
    console.log('A user has connected');
    socket.on('chat', function (msg) {
        io.emit('chat', msg);
    });
    socket.on('disconnect', () => {
        console.log("un utilisateur s'est déconnecté");
    });
});
