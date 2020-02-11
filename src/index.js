const app = require('./app');
const http = require('http').createServer(app)
const io = require('socket.io')(http);

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
    console.log(`${userName} has joind the game`);
    socket.on('disconnect', () => {
        console.log(`${userName} has left`)
    });
});