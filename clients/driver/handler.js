function transit(socket, payload) {
  socket.emit("join", {
    clientId: "driver",
    store: payload.name + " Driver",
  });
  console.log("DRIVER", "picked up", payload);
  socket.emit("inTransit", payload);
}

function delivered(socket, payload) {
  console.log("DRIVER", "delivered", payload);
  socket.emit("delivered", payload);
}

module.exports = { transit, delivered };
