const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("if event is an object containing a 'partitionKey' property, the value of the property should be the same one the funtion returns ", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "foo" });
    expect(trivialKey).toBe("foo");
  });

  it("if the value of 'partitionKey' property is not a string, it should be converted to a Json string before being returned ", () => {
    const trivialKeyNumber = deterministicPartitionKey({ partitionKey: 1 });
    expect(trivialKeyNumber).toBe("1");
    const trivialKeyObject = deterministicPartitionKey({
      partitionKey: { foo: "bar" },
    });
    expect(trivialKeyObject).toBe('{"foo":"bar"}');
  });

  it("if the length of the string value generated from 'partitionKey', is greater than 256(MAX_PARTITION_KEY_LENGTH), then a new hash will be generated and returned ", () => {
    let event = "";
    //generate a string longer than 257 characters
    for (var i = 0; i < 257; i++) {
      event = event + "x";
    }

    const trivialKey = deterministicPartitionKey({ partitiionKey: event });
    expect(trivialKey).not.toBe(event);
  });

  it("if event is not an object containing a 'partitionKey' property, a new hash should be generated and returned ", () => {
    const trivialKey = deterministicPartitionKey("foo");
    expect(trivialKey).not.toBe("foo");
  });
});
