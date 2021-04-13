import { initialState } from "../store";
import { ScoreItem } from "./ScoreItem";
import "./ScoreList.css";

export const ScoreList = () => {
  const scores = initialState.game.scores;
  const username = initialState.user.name;

  const scoreItems = scores.map(({ name, score }) => {
    return (
      <ScoreItem
        key={name}
        name={name}
        score={score}
        isMyself={name === username}
      />
    );
  });

  return <ul className="ScoreList">{scoreItems}</ul>;
};
