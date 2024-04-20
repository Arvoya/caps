require("dotenv").config();

const io = require("socket.io");

const PORT = process.env.PORT || 3000;

const { StandardQueue, FifoQueue } = require("./lib/queue");

const server = new io.Server(PORT);
const caps = server.of("/caps");

let state = {
  event: "no events yet",
  time: "no time yet",
  payload: {
    store: "store name",
    orderID: "order number",
    customer: "customer name",
    address: "customer address",
  },
};

const pickUpQueue = new FifoQueue("pick-ups");
const transitQueue = new StandardQueue("in-transit");
const deliveryQueue = new StandardQueue("delivered");

caps.on("connection", (socket) => {
  console.log("Client has connected");

  socket.on("join", (payload) => {
    socket.join(payload.store);
    caps
      .to(payload.store)
      .emit("join", payload.store + " has joined the delivery app!");
  });

  socket.on("pickup", (payload) => {
    state = {
      event: "package stored in Queue",
      time: new Date(),
      store: payload,
    };
    console.log("EVENT:", state);
    pickUpQueue.add(payload);
    console.log("pickUpQueue", pickUpQueue);
  });

  socket.on("get-packages", () => {
    state = {
      event: "getting packeges for Driver",
      time: new Date(),
    };

    while (pickUpQueue.data.length > 0) {
      caps.emit("pickup", pickUpQueue.getNext());
    }
    console.log("EVENT", state);
  });

  socket.on("inTransit", (payload) => {
    state = {
      event: "inTransit",
      time: new Date(),
      store: payload,
    };

    transitQueue.set(payload.payload.orderID, payload.payload);
    caps.to(payload.name).emit("inTransit", "package is in transit");
    caps.to(payload.name + " Driver").emit("inTransit", payload);
    console.log("EVENT:", state);
  });

  socket.on("delivered", (payload) => {
    state = {
      event: "delivered",
      time: new Date(),
      store: payload,
    };
    transitQueue.remove(payload.payload.orderID);
    deliveryQueue.set(payload.payload.orderID, payload.payload);
    caps.to(payload.name).emit("delivered", payload);
    console.log("EVENT:", state);
  });

  socket.on("confirmation", (payload) => {
    state = {
      event: "confirmation",
      time: new Date(),
      store: payload,
    };
    deliveryQueue.remove(payload.payload.orderID);
    console.log("EVENT:", state);
  });
});
