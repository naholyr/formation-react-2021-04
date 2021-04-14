/* globals io:readonly */ // loaded from Motux server

import {
  addTrial,
  setGame,
  setInputDisabled,
  setScores,
  startNewGame,
} from "./actions";

const HOST = process.env.REACT_APP_MOTUX_HOST;

const socket = io("ws://" + HOST);

// username => token
export const login = async (username, signal = undefined) => {
  const response = await fetch(`http://${HOST}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
    signal,
  });
  const { token } = await response.json();
  console.log(`Logged in as ${username}`);
  localStorage.setItem("token", token);
  return token;
};

// token => username
export const relogin = async (token, signal = undefined) => {
  const response = await fetch(
    `http://${HOST}/whoami?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
      signal,
    }
  );
  const { username } = await response.json();
  console.log(`Re-logged in as ${username}`);
  return username;
};

export const loadGame = (token, dispatch) => {
  socket.emit("login", token, (game) => {
    console.log("Game ready", game);
    dispatch(setGame(game));
  });
};

export const logout = () => {
  socket.emit("logout");
};

export const tryWord = (string) => {
  socket.emit("tryWord", string);
};

export const listenToGameEvents = (dispatch) => {
  socket.on("disableInput", () => {
    dispatch(setInputDisabled(true));
  });

  socket.on("enableInput", () => {
    dispatch(setInputDisabled(false));
  });

  socket.on("failure", (code) => {
    // TODO display error
    console.error("Failure", code);
  });

  socket.on("winner", (username) => {
    // TODO display winner
    console.warn("Winner!", username);
  });

  socket.on("addTrial", (trial) => {
    dispatch(addTrial(trial));
  });

  socket.on("updateScores", (scores) => {
    dispatch(setScores(scores));
  });

  socket.on("wordLength", (length) => {
    dispatch(startNewGame(length));
  });
};
