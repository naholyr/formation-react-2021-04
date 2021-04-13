import { changeNbCounters } from "../actions";
import { reducer, initialState } from "./store";

// reducer(undefined, { type: undefined }) === initialState;

// newState = reducer(initialState, changeNbCounters(4))
// newState.counters.nbCounters === 4

describe("store", () => {
  it("should return initialState", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state).toStrictEqual(initialState);
  });

  it("should change nb counters", () => {
    const state = reducer(initialState, changeNbCounters(4));
    expect(state).toHaveProperty("counters");
    expect(state.counters).toHaveProperty("nbCounters", 4);
  });
});
