// import { lazy } from "react";
import "../App.css";
import { LoginForm } from "./LoginForm";
import { Game } from "../Game/Game";
import { connect } from "react-redux";
import { loadGame, login, logout, relogin } from "../motux-api";
import { setUser } from "../actions";
import { Component } from "react";
import { string } from "prop-types";
import { bool } from "prop-types";

class App extends Component {
  static propTypes = {
    username: string,
    loaded: bool.isRequired,
  };

  static defaultProps = {
    username: null,
  };

  render() {
    const { username, loaded } = this.props;

    const loading = !loaded && username !== null;
    const authenticated = loaded && username !== null;

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

  componentDidMount() {
    this.handleLogin();
  }

  componentWillUnmount() {
    this.handleLogout();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.handleLogout();
      this.handleLogin();
    }
  }

  handleLogin() {
    const { username, dispatch } = this.props;
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
  }

  handleLogout() {
    // TODO
    logout();
  }
}

const mapStateToProps = (state) => ({
  username: state.user.name,
  loaded: state.game.loaded,
});

export default connect(mapStateToProps)(App);
