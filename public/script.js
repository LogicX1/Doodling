

function getId(element) {
  return document.getElementById(element);
}

document.addEventListener("DOMContentLoaded", () => {
  let socket = io();
  getId("form").addEventListener("submit", e => {
    e.preventDefault();
    const msg = getId("m");
    socket.emit("chat message", msg.value);
    msg.value = "";
    return false;
  });
});




























































// Drawing functions and shit
var currentColor = "blue";
var currentWidth = 2;
const canvas = document.getElementById("can");
const mouse = createMouse().start(canvas, true);
const ctx = canvas.getContext("2d");
var ch, cw, w, h;
var currentLine;
const drawing = document.createElement("canvas");
drawing.width = 600;
drawing.height = 400;
drawing.ctx = drawing.getContext("2d");
drawing.ctx.fillStyle = "white";
drawing.ctx.fillRect(0, 0, drawing.width, drawing.height);

const point = (x, y = x.y + (x = x.x) * 0) => ({
  x,
  y
});
function addPoint(x) {
  this.points.push(point(x));
}

function drawLine(ctx, offset) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  var i = 0;
  while (i < this.points.length) {
    const p = this.points[i++];
    ctx.lineTo(p.x + offset.x, p.y + offset.y);
  }
  ctx.stroke();
}

function createLine(color, width) {
  return {
    points: [],
    color,
    width,
    add: addPoint,
    draw: drawLine
  };
}
// resize main display canvas and set global size vars
function resizeCanvas() {
  ch = ((h = canvas.height = innerHeight - 32) / 2) | 0;
  cw = ((w = canvas.width = innerWidth) / 2) | 0;
}

function createMouse() {
  function preventDefault(e) {
    e.preventDefault();
  }
  const mouse = {
    x: 0,
    y: 0,
    buttonRaw: 0,
    prevButton: 0
  };
  const bm = [1, 2, 4, 6, 5, 3]; // bit masks for mouse buttons
  const mouseEvents = "mousemove,mousedown,mouseup".split(",");
  const m = mouse;
  // one mouse handler
  function mouseMove(e) {
    m.bounds = m.element.getBoundingClientRect();
    m.x = e.pageX - m.bounds.left - scrollX;
    m.y = e.pageY - m.bounds.top - scrollY;

    if (e.type === "mousedown") {
      m.buttonRaw |= bm[e.which - 1];
    } else if (e.type === "mouseup") {
      m.buttonRaw &= bm[e.which + 2];
    }

    // if the mouse is down and the prev mouse is up then start a new line
    if (m.buttonRaw !== 0 && m.prevButton === 0) {
      // starting new line
      currentLine = createLine(currentColor, currentWidth);
      currentLine.add(m); // add current mouse position
    } else if (m.buttonRaw !== 0 && m.prevButton !== 0) {
      // while mouse is down
      currentLine.add(m); // add current mouse position
    }
    m.prevButton = m.buttonRaw; // remember the previous mouse state
    e.preventDefault();
  }
  // starts the mouse
  m.start = function(element, blockContextMenu) {
    m.element = element;

    mouseEvents.forEach(n => document.addEventListener(n, mouseMove));
    if (blockContextMenu === true) {
      document.addEventListener("contextmenu", preventDefault);
    }
    return m;
  };
  return m;
}
var cursor = "crosshair";
function update(timer) {
  // Main update loop
  cursor = "crosshair";
  globalTime = timer;
  // if the window size has changed resize the canvas
  if (w !== innerWidth || h !== innerHeight) {
    resizeCanvas();
  }
  display();
  ctx.canvas.style.cursor = cursor;
  setInterval(update, 100);
}
// create a drawing canvas.

// function to display drawing
function display() {
  const imgX = (cw - drawing.width / 2) | 0;
  const imgY = (ch - drawing.height / 2) | 0;
  // add outline
  ctx.strokeStyle = "black";
  ctx.lineWidth = "2";
  ctx.strokeRect(imgX, imgY, drawing.width, drawing.height);
  // draw the image
  ctx.drawImage(drawing, imgX, imgY);
  if (mouse.buttonRaw !== 0) {
    if (currentLine !== undefined) {
      currentLine.draw(ctx, { x: 0, y: 0 }); // draw line on display canvas
      cursor = "none";
    }
  } else if (mouse.buttonRaw === 0) {
    if (currentLine !== undefined) {
      currentLine.draw(drawing.ctx, { x: -imgX, y: -imgY }); // draw line on drawing
      currentLine = undefined;

      // next line is a quick fix to stop a slight flicker due to the current frame not showing the line
      ctx.drawImage(drawing, imgX, imgY);
    }
  }
}

update();

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

