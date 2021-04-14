import { memo } from "react";
import { GuessList } from "./GuessList";
import { ScoreList } from "./ScoreList";
import { WordForm } from "./WordForm";

// memo(() => {…}) shows "Memo(anonymous)" in profiler
// memo(function Toto () {…}) shows "Memo(Toto)" in profiler
export const Game = memo(function Game() {
  return (
    <div className="Game">
      <ScoreList />
      <GuessList />
      <WordForm />
    </div>
  );
});
