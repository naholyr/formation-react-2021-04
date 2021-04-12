const cluster = require("cluster");
const chalk = require("chalk");
const config = require("config");

console.log(
  chalk.bold.dim("Process %s (%s)"),
  process.pid,
  cluster.isMaster ? "Master" : "Worker"
);

if (cluster.isMaster) {
  console.error(
    chalk.bold.red(
      "BROKEN: this server WILL NOT WORK and is provided as illustration of cluster issues with socket.io"
    )
  );
  console.error(
    chalk.bold.yellow("See server-cluster-sticky for a working example")
  );
  console.error(
    chalk.yellow(
      "Best solution: just use a real third-party sticky-session load-balancer like Nginx or HAProxy"
    )
  );

  for (let i = 0; i < config.cluster.count; i++) {
    cluster.fork();
  }
} else {
  require("./server").listen(config.port, () => {
    console.log(chalk.cyan("Worker ready http://localhost:" + config.port));
  });
}
