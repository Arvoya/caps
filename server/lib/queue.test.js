const { StandardQueue, FifoQueue } = require("./queue");

describe("queue", () => {
  it("StandardQueue should return a id OR value", () => {
    let standardQueueTest = new StandardQueue("test");

    standardQueueTest.set(1, "value1");

    expect(standardQueueTest.set(2, "value2")).toBe(2);
    expect(standardQueueTest.get(1)).toBe("value1");
    expect(standardQueueTest.remove(1)).toEqual("value1");
    expect(standardQueueTest.get(1)).toBeFalsy();
  });

  it("FifoQueue should return value in fifo order", () => {
    let fifoQueueTest = new FifoQueue("test2");

    fifoQueueTest.add("something1");
    fifoQueueTest.add("something2");
    fifoQueueTest.add("something3");

    expect(fifoQueueTest.peek()).toEqual("something1");
    expect(fifoQueueTest.getNext()).toEqual("something1");
    expect(fifoQueueTest.getNext()).toEqual("something2");
    expect(fifoQueueTest.getNext()).toEqual("something3");
    expect(fifoQueueTest.peek()).toBeFalsy();
  });
});
