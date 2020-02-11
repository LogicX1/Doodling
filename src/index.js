const app = require('./app');
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

http.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});