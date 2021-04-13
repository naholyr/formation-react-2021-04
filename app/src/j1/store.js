import { combineReducers, createStore } from "redux";

export const initialState = {
  counters: {
    nbCounters: 0,
  },
};

export const countersReducer = (state = initialState.counters, action) => {
  switch (action.type) {
    case "CHANGE_NB_COUNTERS":
      return {
        ...state,
        nbCounters: action.payload.nb,
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  counters: countersReducer,
});

export const initStore = () => {
  return createStore(reducer);
};
