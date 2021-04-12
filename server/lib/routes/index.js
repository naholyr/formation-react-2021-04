"use strict";

exports.auth = require("./auth");

exports.home = (ctx) => {
  ctx.body = "Home";
};
