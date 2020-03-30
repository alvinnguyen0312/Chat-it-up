//require("dotenv").config();
const matColours = require("./matdes100colours.json");
const moment = require("moment");
const express = require("express");
const socketIO = require("socket.io");
const app = express();
const http = require("http");
const port = process.env.PORT || 5000;
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static("public"));

//create an array to store name of clients joined
let clients = [];
//create an array to store name of rooms
let rooms = [];
//get random colour for admin
const adminColour =
  matColours.colours[Math.floor(Math.random() * matColours.colours.length) + 1];
// main socket routine
io.on("connection", socket => {
  console.log("new connection established");
  socket.emit("loadrooms", rooms);
  socket.emit("loadclients", clients);
  // client has joined
  socket.on("join", client => {
    //add a new room if it does not exist
    const existRoom = rooms.find(name => client.roomName === name);
    if (existRoom === undefined) {
      rooms.push(client.roomName);
    }
    //the server needs to determine if the name and the room has been used or not
    const existClient = clients.find(name => client.chatName === name);
    if (existClient === undefined) {
      socket.chatName = client.chatName;
      clients.push(client.chatName);
      // use the roomName property to create a room
      socket.join(client.roomName);
      // send message to joining client
      socket.emit("welcome", {
        time: moment().format("h:mm:ss a"),
        room: client.roomName,
        from: "Admin",
        text: `Welcome ${socket.chatName}`,
        colour: adminColour,
        chatBubbleCSS: "-1%",
        triangleCSS: "9%",
        usersinroom: getUsersInRoom(client.roomName)
      });
      // send message to rest of the room the client just joined
      socket.to(client.roomName).emit("someonejoined", {
        time: moment().format("h:mm:ss a"),
        room: client.roomName,
        from: "Admin",
        text: `${socket.chatName} has joined the ${client.roomName} room`,
        colour: adminColour,
        chatBubbleCSS: "-1%",
        triangleCSS: "9%",
        usersinroom: getUsersInRoom(client.roomName)
      });
      // scenario 2 - client disconnects from server
      socket.on("disconnect", async () => {
        socket.to(client.roomName).emit("someoneleft", {
          time: moment().format("h:mm:ss a"),
          room: client.roomName,
          from: "Admin",
          text: `${socket.chatName} has left the ${client.roomName} room`,
          colour: adminColour,
          chatBubbleCSS: "-1%",
          triangleCSS: "9%",
          usersinroom: getUsersInRoom(client.roomName)
        });
      });
      // scenario 3 - client starts typing
      socket.on("typing", async clientData => {
        socket.to(client.roomName).emit("someoneistyping", {
          text: `${clientData.from} is typing...`
          // usersinroom: getUsersInRoom(client.roomName)
        });
      });
      // scenario 3 - client start a new message
      //get random colour for client
      let clientColour =
        matColours.colours[
          Math.floor(Math.random() * matColours.colours.length) + 1
        ];
      socket.on("message", async clientData => {
        //add radom color property to client Data
        clientData.colour = clientColour;
        clientData.time = moment().format("h:mm:ss a");
        clientData.room = client.roomName;
        clientData.usersinroom = getUsersInRoom(client.roomName);
        clientData.chatBubbleCSS = "-1%";
        clientData.triangleCSS = "9%";
        socket.to(client.roomName).emit("newmessage", clientData);
        clientData.chatBubbleCSS = "27%";
        clientData.triangleCSS = "86%";
        socket.emit("newmessage", clientData);
        console.log(clientData);
      });
    } else {
      socket.emit(
        "nameexists",
        `${client.chatName} is already taken, try a different name`
      );
    }
  });
});
let getUsersInRoom = room => {
  try {
    var allSockets = io.nsps["/"].adapter.rooms[room].sockets;
    var users = [];
    for (var socketID in allSockets) {
      users.push(io.sockets.connected[socketID].chatName);
    }
    return users;
  } catch (err) {
    console.log("users log out of room");
  }
};
// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error"
    }
  });
});
server.listen(port, () => console.log(`starting on port ${port}`));
