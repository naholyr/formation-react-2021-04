import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import "./LoginForm.css";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(e.target.elements.username.value));
  };

  return (
    <form className="LoginForm" onSubmit={onSubmit}>
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
};
