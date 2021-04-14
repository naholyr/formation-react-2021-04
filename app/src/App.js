// import { lazy } from "react";
import "./App.css";
import { LoginForm } from "./LoginForm/LoginForm";
import { Game } from "./Game/Game";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadGame, login, logout, relogin } from "./motux-api";
import { setUser } from "./actions";
// const Game = lazy(() =>
//   import("./Game/Game").then((m) => ({ default: m.Game }))
// );

function App() {
  // useSelector(selector : state => any)
  // - store.subscribe => à chaque update du store, on refait la sélection
  // - "faire la sélection" = selector(state actuel du store) => valeur retournée par le hook
  const username = useSelector((state) => state.user.name);
  const loaded = useSelector((state) => state.game.loaded);
  const dispatch = useDispatch();

  const loading = !loaded && username !== null;
  const authenticated = loaded && username !== null;

  /**
   * 1. username = null, loaded = false
   *  cleanup: non
   *  effect: non
   *  <LoginForm />
   * 2. username = "toto", loaded = false
   *  cleanup: non
   *  effect: login()
   *  <Loading />
   * 3. username = "toto", loaded = true
   *  cleanup: non
   *  effect: non
   *  <Game />
   * 4. username = null, loaded = true
   *  cleanup: logout()
   *  effect: non
   *  <LoginForm />
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    // token && username => already fully identified
    // !token && !username => not yet filled login form
    if ((username && !token) || (token && !username)) {
      const controller = new AbortController();
      if (token) {
        // relogin (token => username)
        relogin(token, controller.signal).then((username) => {
          dispatch(setUser(username)); // state.user.name = null => username
        });
        loadGame(token, dispatch); // state.game.loaded = false => true
      } else {
        // login (username => token)
        login(username, controller.signal)
          .then((token) => {
            loadGame(token, dispatch);
          })
          .catch((err) => {
            console.error(err);
            logout();
          });
      }
      return () => {
        controller.abort();
        logout();
      };
    }
  }, [username, dispatch /* never changes */]);

  const content = loading ? (
    <div>Loading…</div>
  ) : authenticated ? (
    <Game />
  ) : (
    <LoginForm />
  );

  return (
    <>
      <h1>Motux</h1>
      {content}
    </>
  );
}

export default App;
