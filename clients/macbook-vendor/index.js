const newPackage = require("./handler.js");
const Store = require("../lib/client.js");

const io = require("socket.io-client");

let socket = io.connect("http://localhost:3000/caps");

let apple = new Store("Apple");

socket.emit("join", {
  clientId: "vendor",
  store: apple.name,
});

socket.on("join", console.log);

function makePayload() {
  apple.payload = newPackage();

  socket.emit("pickup", apple);
  socket.on("inTransit", console.log);
}

function delivered() {
  socket.on("delivered", (payload) => {
    console.log(payload.name, "Thank you for the delivery!");
    socket.emit("confirmation", payload);
  });
}

makePayload();
delivered();
