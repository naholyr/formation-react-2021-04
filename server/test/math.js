/* eslint-env mocha */

const { expect } = require("chai");

// TODO mock with sinon.js / rewire

const asyncAdd = async (a, b) => {
  return a + b;
};

describe("Math", () => {
  describe("Adding numbers", () => {
    it("1 + 1 = 2", () => {
      expect(1 + 1).to.equal(2);
    });
    it("1 + 3 = 4", () => {
      expect(1 + 3).to.equal(4);
    });
  });

  describe("Multiplying numbers", () => {
    it("2 × 3 = 6", () => {
      expect(2 * 3).to.equal(6);
    });
  });

  describe("Async operations", () => {
    it("async add", async () => {
      expect(await asyncAdd(1, 2)).to.equal(3);
    });
  });
});
