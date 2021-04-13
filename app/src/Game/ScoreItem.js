export const ScoreItem = ({ name, score, isMyself = false }) => {
  return (
    <li className={isMyself ? "myself" : ""}>
      <strong className="player">{name}</strong>
      <em className="score">{score} pts</em>
    </li>
  );
};
