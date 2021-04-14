import { setInputDisabled, setUser, startNewGame } from "./actions";
import { reducer, initialState } from "./store";

describe("Store", () => {
  describe("Reducer", () => {
    it("should init state", () => {
      const prevState = undefined;
      const action = { type: "@@INIT" };
      const newState = reducer(prevState, action);
      expect(newState).toEqual(initialState);
    });

    it("should set username", () => {
      const prevState = undefined;
      const action = setUser("toto");
      const newState = reducer(prevState, action);
      expect(newState).toMatchSnapshot();
    });

    it("should disable input", () => {
      const prevState = {
        ...initialState,
        game: { ...initialState.game, inputDisabled: true },
      };
      const action = setInputDisabled(false);
      const newState = reducer(prevState, action);
      expect(newState).toMatchObject({ game: { inputDisabled: false } });
    });

    it("should start new game", () => {
      const prevState = {
        ...initialState,
        game: {
          ...initialState.game,
          trials: ["FAKE_TRIAL1", "FAKE_TRIAL2"],
        },
      };
      const action = startNewGame(7);
      const newState = reducer(prevState, action);
      expect(newState).toMatchObject({ game: { wordLength: 7, trials: [] } });
    });
  });

  describe("Selectors", () => {
    it.todo("should select username");
  });
});
