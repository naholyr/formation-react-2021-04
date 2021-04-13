const LETTER_STATUS = ["incorrect", "misplaced", "correct"];

export const GuessItem = ({ isMyself = false, name, word }) => {
  const clsName = isMyself ? "myself" : "";

  const letters = word.map(([letter, status], index) => {
    return (
      <span
        key={index} // no filter/sort/whatever
        className={LETTER_STATUS[status]}
      >
        {letter}
      </span>
    );
  });

  return (
    <li className={clsName}>
      <strong>{name}</strong>
      {letters}
    </li>
  );
};
