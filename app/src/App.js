// import { lazy } from "react";
import "./App.css";
import { LoginForm } from "./LoginForm/LoginForm";
import { Game } from "./Game/Game";
import { useSelector } from "react-redux";
// const Game = lazy(() =>
//   import("./Game/Game").then((m) => ({ default: m.Game }))
// );

function App() {
  // useSelector(selector : state => any)
  // - store.subscribe => à chaque update du store, on refait la sélection
  // - "faire la sélection" = selector(state actuel du store) => valeur retournée par le hook
  const authenticated = useSelector((state) => state.user.name !== null);

  const content = authenticated ? <Game /> : <LoginForm />;

  return (
    <>
      <h1>Motux</h1>
      {content}
    </>
  );
}

export default App;
