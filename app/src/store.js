import { combineReducers, createStore } from "redux";

export const initialState = {
  user: {
    name: null,
  },
  game: {
    loaded: false,
    trials: [
      /*
      {
        name: "Coco",
        word: [
          ["B", 0],
          ["O", 0],
          ["U", 1],
          ["L", 0],
          ["I", 1],
          ["M", 1],
          ["I", 1],
          ["Q", 0],
          ["U", 1],
          ["E", 1],
        ],
        win: false,
      },
      */
    ],
    scores: [
      /*
      {
        name: "Renaud",
        score: 9,
      },
      */
    ],
    wordLength: 0,
    inputDisabled: true,
  },
};

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

export const gameReducer = (state = initialState.game, action) => {
  switch (action.type) {
    case "SET_GAME":
      if (action.payload.game) {
        return {
          ...state,
          ...action.payload.game,
          loaded: true,
          // trials: action.payload.game.trials,
          // scores: action.payload.game.scores,
          // wordLength: action.payload.game.wordLength,
        };
      } else {
        // payload.game === null => reset state
        return initialState.game;
      }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export const initStore = () => {
  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
