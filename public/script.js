function getId(element) {
    return document.getElementById(element)
}

document.addEventListener("DOMContentLoaded",function()  {
    let socket = io();
    
    getId('message-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(getId('message').value);
        socket.emit('chat message', getId('message').value)
        getId('message').value = '';
        return false;
    });

    socket.on('chat message',function (msg) {
        console.log('chat message emitted!')
        var newMsg = document.createElement('li');
        newMsg.textContent=msg;
        console.log('message event');
        getId('messages-list').append(newMsg);
    });
});