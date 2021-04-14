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

export const setInputDisabled = (disabled) => ({
  type: "SET_INPUT_DISABLED",
  payload: { disabled },
});

export const addTrial = (trial) => ({
  type: "ADD_TRIAL",
  payload: { trial },
});

export const setScores = (scores) => ({
  type: "SET_SCORES",
  payload: { scores },
});

export const startNewGame = (wordLength) => ({
  type: "NEW_GAME",
  payload: { wordLength },
});
