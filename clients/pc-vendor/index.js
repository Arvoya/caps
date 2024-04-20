const newPackage = require("./handler.js");
const Store = require("../lib/client.js");

const io = require("socket.io-client");

let socket = io.connect("http://localhost:3000/caps");

let microsoft = new Store("Microsoft");

socket.emit("join", {
  clientId: "vendor",
  store: microsoft.name,
});

socket.on("join", console.log);

socket.emit("get-delivereies", "Microsoft");

function makePayload() {
  microsoft.payload = newPackage();

  socket.emit("pickup", microsoft);
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
