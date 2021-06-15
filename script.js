const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.scrollWidth * 2;
canvas.height = canvas.scrollHeight * 2;
canvas.addEventListener("touchstart", update);
canvas.addEventListener("touchmove", update);
canvas.addEventListener("touchend", update);
var touchCache = [];
var timeout = null;
var winner = null;
var waitStart = null;
function update(e) {
  touchCache = e.touches;
  if (e.type == "touchstart" || e.type == "touchend" || e.type == "touchcancel") {
    winner = null;
    timeout !== null && clearTimeout(timeout);
    waitStart = new Date();
    timeout = setTimeout(function() {
      if (winner !== null || !touchCache.length) return;
      t = touchCache[Math.floor(Math.random() * touchCache.length)];
      winner = t.identifier;
    }, 2000);
  }
   e.preventDefault();
}
function draw() {
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (t of touchCache) {
    ctx.fillStyle=t.identifier == winner ? "#e3291b": "#1b50e3";
    ctx.beginPath();
    ctx.arc(t.clientX*2, t.clientY*2, 65*2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = t.identifier == winner ? "#e3dc1b": "white";
    ctx.lineWidth = 2*2;
    ctx.beginPath();
    ctx.arc(t.clientX*2, t.clientY*2, 75*2, Math.PI * -0.5, Math.PI * -0.5 + Math.PI * ((new Date()) - waitStart) / 1000);
    ctx.stroke();
  }
}
window.setInterval(draw, 10);
