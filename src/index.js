const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const connectedUsers = [];
const port = process.env.PORT || 5000;
let gameStatus = "Game pending";
var currentGuest = 0;

/************************          Helper functions     */
function generateGuest() {
  return ++currentGuest;
}
function selectDrawer() {
  let rand = Math.floor(Math.random() * connectedUsers.length);
  console.log("rand is ", rand);
  return rand;
}

/****** *********************   End of Helper functions      */
http.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

io.on("connection", socket => {
  let userName = "";
  socket.on("user connected", newUser => {
    console.log("New user after event", newUser);
    console.log(typeof userName);
    if (newUser !== "Guest") {
      console.log("Im in if!");
      userName = newUser;
    } else {
      userName = newUser + generateGuest();
    }
    connectedUsers.push(userName);
    console.log(`${userName} has joind the game`);
    console.log(`Connected users :`);
    console.table(connectedUsers);
    io.emit("update connected users", connectedUsers);

    if (connectedUsers.length >= 2 && gameStatus !== "Game started") {
      console.log(
        "Game gonna start drawing user is : ",
        connectedUsers[selectDrawer()]
      );
      io.emit("start game", connectedUsers[selectDrawer()]);
      gameStatus = "Game started";
    }

    socket.on("chat message", function(msg) {
      console.log(msg);
      io.emit("chat message", userName + " :" + msg);
    });
  });

  socket.on("drawing", data => socket.broadcast.emit("drawing", data));

  socket.on("disconnect", () => {
    console.log(`${userName} has left`);
    const userIndex = connectedUsers.indexOf(userName);
    connectedUsers.splice(userIndex, 1);
    console.log(`Connected users :`);
    console.table(connectedUsers);
    io.emit("update connected users", connectedUsers);
  });
});
