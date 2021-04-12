"use strict";

const jwt = require("jsonwebtoken");
const config = require("config");
const gameEngine = require("./game-engine");

module.exports = (io, socket) => {
  console.log("Socket connected", process.pid);

  // socket.emit            => server → socket
  // socket.on              => socket → server
  // io.emit                => server → everyone
  // socket.broadcast.emit  => server → everyone but socket
  // socket.join("room")
  // io.to("room").emit     => server → sockets in room

  let socketToken = null; // string
  let timeout = null; // TimeoutId (input disabled)

  socket.on("login", async (token, cb) => {
    try {
      const { username } = jwt.verify(token, config.jwtSecret);
      socketToken = token;
      await gameEngine.addScore(username, 0);
      const [scores, game] = await Promise.all([
        gameEngine.getScores(),
        gameEngine.getCurrentGame(),
      ]);
      socket.broadcast.emit("updateScores", scores);
      socket.emit("enableInput");
      cb(game);
    } catch (err) {
      cb(null);
    }
  });

  socket.on("tryWord", async (word) => {
    const disabled = await gameEngine.client.get("disabled"); // TODO no direct query
    if (timeout || disabled) {
      socket.emit("failure", "INPUT_DISABLED");
      return;
    }

    socket.emit("disableInput");
    // dans 5s emit enable input
    timeout = setTimeout(() => {
      socket.emit("enableInput");
      timeout = null;
    }, config.delayBetweenWords);

    try {
      // Input: username, word
      // Output: Trial :: { name, word }
      const { username } = jwt.verify(socketToken, config.jwtSecret);
      const trial = await gameEngine.tryWord(username, word, true);
      // emit trial (to everyone)
      io.emit("addTrial", trial);
      if (trial.win) {
        // +X points (wordLength)
        await gameEngine.addScore(username, word.length);
        // pickNewWord => emit
        io.emit("winner", username);
        io.emit("updateScores", await gameEngine.getScores());
        await gameEngine.client.set("disabled", 1); // TODO no direct query
        io.emit("disableInput"); // FIXME disabled for everyone (state)
        setTimeout(async () => {
          await gameEngine.client.del("disabled"); // TODO no direct query
          const wordLength = await gameEngine.pickNewWord();
          io.emit("wordLength", wordLength);
          io.emit("enableInput"); // FIXME disabled for everyone (state)
        }, config.delayBetweenGames);
      }
    } catch (err) {
      socket.emit("failure", err.message);
    }
  });

  socket.on("disconnect", () => {
    clearTimeout(timeout);
  });
};
