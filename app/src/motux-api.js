/* globals io:readonly */ // loaded from Motux server

import { setGame } from "./actions";

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
