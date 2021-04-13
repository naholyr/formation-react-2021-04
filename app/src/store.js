import { combineReducers, createStore } from "redux";

export const initialState = {
  user: {
    name: null,
  },
  game: {
    trials: [
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
      {
        name: "Nicolas",
        word: [
          ["B", 0],
          ["I", 1],
          ["J", 0],
          ["O", 0],
          ["U", 1],
          ["T", 1],
          ["I", 1],
          ["E", 2],
          ["R", 1],
          ["S", 1],
        ],
        win: false,
      },
      {
        name: "Coco",
        word: [
          ["T", 1],
          ["E", 1],
          ["L", 0],
          ["E", 1],
          ["V", 0],
          ["I", 1],
          ["S", 1],
          ["I", 1],
          ["O", 0],
          ["N", 1],
        ],
        win: false,
      },
      {
        name: "Nicolas",
        word: [
          ["A", 0],
          ["B", 0],
          ["R", 1],
          ["I", 1],
          ["C", 0],
          ["O", 0],
          ["T", 1],
          ["I", 1],
          ["E", 1],
          ["R", 1],
        ],
        win: false,
      },
    ],
    scores: [
      {
        name: "Renaud",
        score: 9,
      },
      {
        name: "test",
        score: 7,
      },
      {
        name: "Coco",
        score: 0,
      },
      {
        name: "Romain F",
        score: 0,
      },
      {
        name: "ben",
        score: 0,
      },
      {
        name: "Nicolas",
        score: 0,
      },
    ],
    wordLength: 10,
    inputDisabled: false,
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
