import { useSelector } from "react-redux";
import { GuessItem } from "./GuessItem";
import "./GuessList.css";

export const GuessList = () => {
  const trials = useSelector((state) => state.game.trials);
  const username = useSelector((state) => state.user.name);

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
