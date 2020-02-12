/*
Currently unused 
 axios.get('/getWord')
    .then(function (response) {
      currWord.textContent = response.data[0].doodle;
    })
    .catch(function (error) {
      console.log(error);
    })
    */



let currentDrawingUser = false;

function getId(element) {
  return document.getElementById(element);
}

function getClass(element) {
  return document.getElementsByClassName(element);
}
function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function updateList(list, values) {
  removeChildren(list);
  values.forEach(value => {
    var newListing = document.createElement("li");
    newListing.textContent = value;
    list.append(newListing);
  });
}
function wordToDashes(word){
  var res = '';
  word.forEach(character=> res.push(_));
  return res;
}

const userMsg = getClass("user-msg")[0].textContent.split(" ");

document.addEventListener("DOMContentLoaded", function() {
  let socket = io();

  let currentUser = "Guest";
  console.log("A new user! and he is :", userMsg[1]);
  if (userMsg[1]) {
    currentUser = userMsg[1];
  }
  socket.emit("user connected", currentUser);
  var canvas = document.getElementsByClassName("whiteboard")[0];
  var colors = document.getElementsByClassName("color");
  var context = canvas.getContext("2d");
  context.lineWidth = 2;

  socket.on("start game", ({drawingUser,gameWord}) => {
    currWord = getClass('currWord')[0];
    gameWord='stam';
    console.log("Game has started!");
    console.log(`This user:${currentUser}... Drawing user ${drawingUser}`);
    if (currentUser === drawingUser) {
      currWord.textContent = gameWord;
      currentDrawingUser = true;
    } else {
      currWord.textContent = wordToDashes(gameWord);
      currentDrawingUser = false;
    }
  });
  var current = {
    color: "black"
  };
  var drawing = false;

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

  //Touch support for mobile devices
  canvas.addEventListener("touchstart", onMouseDown, false);
  canvas.addEventListener("touchend", onMouseUp, false);
  canvas.addEventListener("touchcancel", onMouseUp, false);
  canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", onColorUpdate, false);
  }

  socket.on("drawing", onDrawingEvent);

  window.addEventListener("resize", onResize, false);
  onResize();

  function drawLine(x0, y0, x1, y1, color, emit) {
    if (currentDrawingUser === false) {
      return;
    }
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;

    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  function onMouseDown(e) {
    drawing = true;
    console.log(e.clientX);
    var rect = e.target.getBoundingClientRect();
    current.x = (e.clientX || e.touches[0].clientX) - rect.left;
    current.y = (e.clientY || e.touches[0].clientY) - rect.top;
  }

  function onMouseUp(e) {
    if (!drawing) {
      return;
    }
    drawing = false;
    var rect = e.target.getBoundingClientRect();
    drawLine(
      current.x,
      current.y,
      (e.clientX || e.touches[0].clientX) - rect.left,
      (e.clientY || e.touches[0].clientY) - rect.top,
      current.color,
      true
    );
    current.x = (e.clientX || e.touches[0].clientX) - rect.left;
    current.y = (e.clientY || e.touches[0].clientY) - rect.top;
  }

  function onMouseMove(e) {
    if (!drawing) {
      return;
    }
    var rect = e.target.getBoundingClientRect();
    drawLine(
      current.x,
      current.y,
      (e.clientX || e.touches[0].clientX) - rect.left,
      (e.clientY || e.touches[0].clientY) - rect.top,
      current.color,
      true
    );
    current.x = (e.clientX || e.touches[0].clientX) - rect.left;
    current.y = (e.clientY || e.touches[0].clientY) - rect.top;
  }

  function onColorUpdate(e) {
    current.color = e.target.className.split(" ")[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    const temp = currentDrawingUser;
    currentDrawingUser = true;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    currentDrawingUser = temp;
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = '75vw';
    canvas.height = '90vh';
  }

  getId("message-form").addEventListener("submit", e => {
    e.preventDefault();
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
    updateList(getId("users-list"), connectedUsers);
  });
});
