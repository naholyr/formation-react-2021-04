import { useSelector } from "react-redux";
import { ScoreItem } from "./ScoreItem";
import "./ScoreList.css";

export const ScoreList = () => {
  const scores = useSelector((state) => state.game.scores);
  const username = useSelector((state) => state.user.name);

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
