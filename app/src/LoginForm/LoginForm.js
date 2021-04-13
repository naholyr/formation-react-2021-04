import "./LoginForm.css";

export const LoginForm = ({ onSubmit }) => {
  return (
    <form className="LoginForm" onSubmit={onSubmit}>
      <input name="username" placeholder="Your name" autoFocus />
      <button>Log in</button>
    </form>
  );
};
