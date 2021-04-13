import { GuessList } from "./GuessList";
import { ScoreList } from "./ScoreList";
import { WordForm } from "./WordForm";

export const Game = () => {
  return (
    <div className="Game">
      <ScoreList />
      <GuessList />
      <WordForm />
    </div>
  );
};
