const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// https://socket.io/

const app = express();
const server = http.createServer(app);
const io = new Server(server);
//middleware
app.use(express.static("public"));

// Global variables to hold all usernames and rooms created
const usernames = {};
const rooms = [
    { name: "globalChat", creator: "Anonymous" },
    { name: "DevOps", creator: "Anonymous" },
    { name: "BackEnd", creator: "Anonymous" }
];
//when ever we setup the connection we need to update the above variables
//whatever you need to do when connected you have to write inside the underlying function
io.on("connection", function (socket) {
    console.log(`User connected to server.`);
    //when ever connection establish frontend is sending user name(using emit) here receiving using (on)
    socket.on("createUser", function (username) {
        socket.username = username;
        usernames[username] = username;
        socket.currentRoom = "globalChat";

        socket.join("globalChat"); //to join a specific room

        console.log(`User ${username} created on server successfully.`);

        socket.emit("updateChat", "INFO", "You have joined global room");
        //socket.emit("updateChat", "INFO", "You have joined global room",[{**}]); if we want user to see tthe previous message we will store it in database and call in ** position to fetch from database
        socket.broadcast
            .to("globalChat")
            .emit("updateChat", "INFO", username + " has joined global room");
        io.sockets.emit("updateUsers", usernames);
        socket.emit("updateRooms", rooms, "globalChat");
    });

    socket.on("sendMessage", function (data) {
        io.sockets.to(socket.currentRoom).emit("updateChat", socket.username, data); //to send everyone present in the room
    });

    socket.on("createRoom", function (room) {
        if (room != null) {
            rooms.push({ name: room, creator: socket.username });
            io.sockets.emit("updateRooms", rooms, null);
        }
    });

    socket.on("updateRooms", function (room) {
        socket.broadcast
            .to(socket.currentRoom)
            .emit("updateChat", "INFO", socket.username + " left room");//sending everbody that he left the room
        socket.leave(socket.currentRoom);//to leave a current room
        socket.currentRoom = room;
        socket.join(room);
        socket.emit("updateChat", "INFO", "You have joined " + room + " room");
        socket.broadcast
            .to(room)
            .emit(
                "updateChat",
                "INFO",
                socket.username + " has joined " + room + " room"//sending everbody that he has joined the current room
            );
    });
    socket.on("disconnect", function () {
        console.log(`User ${socket.username} disconnected from server.`);
        delete usernames[socket.username];
        io.sockets.emit("updateUsers", usernames);
        socket.broadcast.emit(
            "updateChat",
            "INFO",
            socket.username + " has disconnected"
        );
    });
});


server.listen(4000, function () {
    console.log("Listening to port 4000.");
});