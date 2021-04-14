import { useSelector } from "react-redux";
import "./WordForm.css";

export const WordForm = () => {
  // const wordLength = initialState.game.wordLength;
  const wordLength = useSelector((state) => state.game.wordLength);

  const inputStyle = { width: `${Math.max(wordLength * 2, 11)}rem` };

  return (
    <form className="WordForm">
      <input
        type="text"
        name="word"
        pattern="[^-_ '&quot;]+"
        required
        autoFocus
        minLength={wordLength}
        maxLength={wordLength}
        placeholder={`${wordLength} lettres`}
        style={inputStyle}
      />
    </form>
  );
};
