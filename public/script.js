function getId(element) {
    return document.getElementById(element)
}

document.addEventListener('DOMContentLoaded', () => {
    let socket = io();
    getId('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = getId('m');
        socket.emit('chat message', msg.value)
        msg.value = '';
        return false;
    });
});