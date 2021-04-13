import { /* lazy, */ useState } from "react";
import "./App.css";
import { LoginForm } from "./LoginForm/LoginForm";
import { Game } from "./Game/Game";
// const Game = lazy(() =>
//   import("./Game/Game").then((m) => ({ default: m.Game }))
// );

function App() {
  const [authenticated, setAuthenticated] = useState(true);

  const onSubmitLoginForm = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    setAuthenticated(true);
  };

  const content = authenticated ? (
    <Game />
  ) : (
    <LoginForm onSubmit={onSubmitLoginForm} />
  );

  return (
    <>
      <h1>Motux</h1>
      {content}
    </>
  );
}

export default App;
