import { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../actions";
import "../LoginForm/LoginForm.css";

class DumbLoginForm extends Component {
  // this.onSubmit set in constructor to properly bind "this"
  onSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(setUser(e.target.username.value));
  };

  render() {
    return (
      <form className="LoginForm" onSubmit={this.onSubmit}>
        <input
          name="username"
          placeholder="Your name"
          autoFocus
          required
          minLength={2}
        />
        <button>Log in</button>
      </form>
    );
  }
}

const mapStateToProps = null; // no data fetched from state, we just want to dispatch

export const LoginForm = connect(mapStateToProps)(DumbLoginForm);
