const { transit, delivered } = require("./handler.js");

describe("Driver handler", () => {
  it("should return transit emit and console.log", () => {
    const socket = {
      emit: jest.fn(),
    };
    const payload = { orderID: 123 };
    console.log = jest.fn();

    transit(socket, payload);

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith("DRIVER", "picked up", payload);
    }, 2000);
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith("inTransit", payload);
    }, 3000);
  });

  it("should return delivered emit and console.log", () => {
    const socket = {
      emit: jest.fn(),
    };
    const payload = { orderID: 321 };
    console.log = jest.fn();

    delivered(socket, payload);

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith("DRIVER", "delivered", payload);
    }, 2000);
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith("delivered", payload);
    }, 3000);
  });
});
