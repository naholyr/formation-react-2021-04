"use strict";

/* eslint-env mocha */

const { expect } = require("chai");
const rewire = require("rewire");
const sinon = require("sinon");
const g = rewire("../lib/game-engine");

describe("Game Engine", () => {
  before(async () => {
    // TODO init database
    // - drop data
    // - insert new data
  });

  describe("Get game status", () => {
    const fakeClient = {
      strlen: sinon.spy(async () => 4),
      lrange: sinon.spy(async () => []),
      hgetall: sinon.spy(async () => ({})),
    };

    let reset;

    before(() => {
      reset = g.__set__("client", fakeClient);
    });

    after(() => {
      reset();
    });

    it("returns full game status", async () => {
      const game = await g.getCurrentGame();
      expect(game).to.be.an("object");
      expect(game).to.have.property("trials").that.is.an("array");
      expect(game).to.have.property("scores").that.is.an("array");
      expect(game).to.have.property("wordLength").that.is.a("number");
      expect(fakeClient.lrange.calledOnce).to.equal(true);
      // WARNING Bad Test
      expect(fakeClient.lrange.getCall(0))
        .to.be.an("object")
        .with.property("args")
        .which.eql(["trials", 0, -1]);
    });
  });
});
