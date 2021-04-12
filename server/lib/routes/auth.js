const jwt = require("jsonwebtoken");
const config = require("config");

exports.login = async (ctx) => {
  // ctx.request, ctx.response => objets Koa
  // ctx.req, ctx.res => objets originaux module "http"
  const username = ctx.request.body.username;
  console.log({ username });

  // TODO check dans redis si le username existe

  // TODO générer un JWT
  // pour retourner le token dans les futures requêtes: "Authentication: Bearer + token"
  const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: "24h" });

  // TODO renvoi au client le JWT
  ctx.body = { token };
};

exports.whoami = async (ctx) => {
  const token = ctx.request.query.token;
  // TODO check redis
  try {
    ctx.body = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    ctx.throw(403, err.message);
  }
};
