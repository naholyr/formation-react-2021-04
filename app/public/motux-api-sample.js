/* globals io:readonly */ // loaded from Motux server

const host = "localhost:3100"; // TODO configure in .env

const socket = io("ws://" + host);

// Authentication

(async () => {
  const response = await fetch(`http://${host}/login`, {
    method: "POST",
    body: JSON.stringify({ username: "test" }),
  });
  const { token } = await response.json();
  // TODO store in localStorage
  // then test with /whoami?token={token}
  socket.emit("login", token, (game) => {
    console.log("Game ready", game);
  });
})();

// Game API (TODO React UI)

let disabledInput = true;

window.tryWord = (string) => {
  if (disabledInput) {
    console.error("Input disabled");
    return;
  }
  socket.emit("tryWord", string);
};

socket.on("disableInput", () => {
  disabledInput = true;
});

socket.on("enableInput", () => {
  console.warn("Input enabled");
  disabledInput = false;
});

socket.on("failure", (code) => {
  console.error("Failure", code);
});

socket.on("addTrial", (trial) => {
  console.warn("New guess:", trial);
});

socket.on("winner", (username) => {
  console.warn("Winner!", username);
});

socket.on("updateScores", (scores) => {
  console.info("Scores", scores);
});

socket.on("wordLength", (length) => {
  console.warn("New game, word length =", length);
});
