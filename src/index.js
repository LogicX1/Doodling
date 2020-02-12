const app = require('./app');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const connectedUsers = [];
const port = process.env.PORT || 5000;
var currentGuest=0;
function generateGuest(){
    return ++currentGuest;
}
http.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})


io.on('connection', (socket) => {
    const userName = 'Guest'+generateGuest();
    connectedUsers.push(userName);
    console.log(`${userName} has joind the game`);
    console.log(`Connected users :`);
    console.table(connectedUsers);
    io.emit('update connected users',connectedUsers);
    socket.on("chat message", function(msg) {
        console.log(msg);
        io.emit("chat message", userName + " :" + msg);
      });

    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    socket.on('disconnect', () => {
        console.log(`${userName} has left`)
        const userIndex = connectedUsers.indexOf(userName);
        connectedUsers.splice(userIndex,1);
        console.log(`Connected users :`);
    console.table(connectedUsers);
        io.emit('update connected users',connectedUsers);
    });
});