import { initialState } from "../store";
import { GuessItem } from "./GuessItem";
import "./GuessList.css";

export const GuessList = () => {
  const trials = initialState.game.trials;
  const username = initialState.user.name;

  const guessItems = trials.map(({ name, word }, index) => {
    return (
      <GuessItem
        key={index} // no filter/sort/whatever
        isMyself={name === username}
        name={name}
        word={word}
      />
    );
  });

  return <ul className="GuessList">{guessItems}</ul>;
};
