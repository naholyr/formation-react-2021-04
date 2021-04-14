import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { reducer, initialState } from "./store";

jest.mock("./motux-api", () => {
  return {
    loadGame: () => {},
    login: () => Promise.resolve("FAKE_TOKEN"),
    logout: () => {},
    relogin: () => {},
  };
});

const renderWithStore = (element, state = initialState) => {
  const store = createStore(reducer, state);
  return render(<Provider store={store}>{element}</Provider>);
};

describe("App", () => {
  test("shows login form", () => {
    renderWithStore(<App />);
    const input = screen.getByPlaceholderText("Your name");
    expect(input).toBeInTheDocument();
  });

  test("renders with username", () => {
    localStorage.removeItem("token");
    renderWithStore(<App />, { user: { name: "Toto" } });
  });
});
