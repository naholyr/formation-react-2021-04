// Third-party module
let log = (string) => {
  console.log(string);
};

// Tested module
const externalModule = {
  foo: (name) => {
    log("Hello, " + name + "!");
    return name;
  },
};

// Mock third-party module
log = jest.fn();

// Check that "tested module" makes correct usage of "third party module"
test("spy", () => {
  const value = externalModule.foo("toto");
  expect(value).toEqual("toto");
  expect(log).toHaveBeenCalledTimes(1);
  expect(log).toHaveBeenCalledWith("Hello, toto!");
});
