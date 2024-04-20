const { transit, delivered } = require("./handler.js");

describe("Driver handler", () => {
  it("should return transit emit and console.log", () => {
    const socket = {
      emit: jest.fn(),
    };
    const payload = { orderID: 123 };
    console.log = jest.fn();

    transit(socket, payload);

    expect(console.log).toHaveBeenCalledWith("DRIVER", "picked up", payload);
    expect(socket.emit).toHaveBeenCalledWith("inTransit", payload);
  });

  it("should return delivered emit and console.log", () => {
    const socket = {
      emit: jest.fn(),
    };
    const payload = { orderID: 321 };
    console.log = jest.fn();

    delivered(socket, payload);

    expect(console.log).toHaveBeenCalledWith("DRIVER", "delivered", payload);
    expect(socket.emit).toHaveBeenCalledWith("delivered", payload);
  });
});
