

function getId(element) {
  return document.getElementById(element);
}
function getClass(element) {
  return document.getElementsByClassName(element);
}
function removeChildren(node){
    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}
function updateList(list,values){
    removeChildren(list);
    values.forEach(value => {
        var newListing = document.createElement("li");
        newListing.textContent = value;
        list.append(newListing);
      });
}
document.addEventListener("DOMContentLoaded", function() {
  let socket = io();

  getId("message-form").addEventListener("submit", e => {
    e.preventDefault();
    console.log(getId("message").value);
    socket.emit("chat message", getId("message").value);
    getId("message").value = "";
    return false;
  });

  socket.on("chat message", function(msg) {
    var newMsg = document.createElement("li");
    newMsg.textContent = msg;
    getId("messages-list").append(newMsg);
  });

  socket.on("update connected users", function(connectedUsers) {
    updateList(getId("users-list"),connectedUsers);
  });
});
