const { transit, delivered } = require("./handler.js");
const io = require("socket.io-client");

let socket = io.connect("http://localhost:3000/caps");

socket.emit("get-packages");

function listen() {
  socket.on("pickup", (payload) => transit(socket, payload));
  socket.on("inTransit", (payload) => delivered(socket, payload));
}

listen();
