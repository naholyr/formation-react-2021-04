import { initialState } from "../store";
import "./WordForm.css";

export const WordForm = () => {
  const wordLength = initialState.game.wordLength;

  const style = { width: `${wordLength * 2}rem` };

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
        style={style}
      />
    </form>
  );
};
