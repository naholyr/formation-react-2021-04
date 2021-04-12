const config = require("config");
const routes = require("./lib/routes"); // ./lib/routes.js ou ./lib/routes/index.js
const http = require("http");
const Koa = require("koa");
const Router = require("@koa/router");
const serve = require("koa-static");
const koaBody = require("koa-body");
const socketIo = require("socket.io");
const socketIoRedisAdapter = require("socket.io-redis");
const websocket = require("./lib/websocket");
const chalk = require("chalk");
const cors = require("@koa/cors");

const app = new Koa();
const router = new Router();

router
  .get("/", routes.home)
  .post("/login", koaBody(), routes.auth.login)
  .get("/whoami", routes.auth.whoami);

app
  .use(cors())
  .use(async (ctx, next) => {
    const start = Date.now(); // ms
    await next();
    const duration = Date.now() - start;
    ctx.set("X-Response-Time", duration);
  })
  .use(serve("public"))
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.createServer(app.callback());

const io = socketIo(server);

// Cluster-friendly
io.adapter(socketIoRedisAdapter(config.redis));

io.on("connection", (socket) => {
  websocket(io, socket);
});

server.on("error", (err) => {
  console.error(err.message);
  process.exit(1);
});

if (module.parent) {
  // required: export server, don't start it immediately
  module.exports = server;
} else {
  // executed: start immediately
  server.listen(config.port, () => {
    console.log(
      chalk.bold.cyan("Server ready http://localhost:" + config.port)
    );
  });
}
