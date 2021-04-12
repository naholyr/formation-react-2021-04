"use strict";

const config = require("config");

require("sticky-cluster")(
  (cb) => {
    cb(require("./server"));
  },
  {
    concurrency: config.cluster.count,
    port: config.port,
    debug: true,
    env: (index) => ({ stickycluster_worker_index: index }),
  }
);
