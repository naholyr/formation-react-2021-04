export const setUser = (name) => {
  return {
    type: "SET_USER",
    payload: { name },
  };
};

export const unsetUser = () => ({
  type: "SET_USER",
  payload: { name: null },
});

/**
 * @param {trials, scores, wordLength} gameInfo
 */
export const setGame = (gameInfo) => ({
  type: "SET_GAME",
  payload: { game: gameInfo },
});

export const unsetGame = () => ({
  type: "SET_GAME",
  payload: { game: null },
});
