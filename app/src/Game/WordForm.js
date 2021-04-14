import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { tryWord } from "../motux-api";
import "./WordForm.css";

export const WordForm = () => {
  // const wordLength = initialState.game.wordLength;
  const wordLength = useSelector((state) => state.game.wordLength);
  const isDisabled = useSelector((state) => state.game.inputDisabled);

  const toto = useRef(1); // { current: 1 }
  useEffect(() => {
    console.log("WordForm#render", toto.current++);
  });

  // Focus on re-enable
  const inputRef = useRef(); // { current: undefined }
  useEffect(() => {
    if (!isDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const inputStyle = { width: `${Math.max(wordLength * 2, 11)}rem` };

  const handleSubmit = (e) => {
    e.preventDefault();
    tryWord(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <form className="WordForm" onSubmit={handleSubmit}>
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
        disabled={isDisabled}
        ref={inputRef}
      />
    </form>
  );
};
