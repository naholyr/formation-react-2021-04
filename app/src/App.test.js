import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { reducer, initialState } from "./store";
import { loadGame, login, relogin } from "./motux-api";
import userEvent from "@testing-library/user-event";

jest.mock("./motux-api", () => {
  return {
    loadGame: jest.fn(),
    login: jest.fn(),
    relogin: jest.fn(),
    logout: jest.fn(),
  };
});

const renderWithStore = async (element, state = initialState) => {
  const store = createStore(reducer, state);
  const result = await render(<Provider store={store}>{element}</Provider>);
  return { ...result, store };
};

describe("App", () => {
  test("shows login form", () => {
    renderWithStore(<App />);
    const input = screen.getByPlaceholderText("Your name");
    expect(input).toBeInTheDocument();
  });

  // Snapshot DOM result
  test("snapshot", async () => {
    const { container } = await renderWithStore(<App />);
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    login.mockResolvedValue("FAKE_TOKEN");
    relogin.mockResolvedValue("TOTO");
  });

  // Check auth process
  test("renders with username", async () => {
    // Render with specific initial state
    const { store } = await renderWithStore(<App />, {
      user: { name: "Toto" },
    });
    // Check called functions
    expect(login).toHaveBeenCalledTimes(1);
    expect(login.mock.calls[0][0]).toEqual("Toto"); // First argument of first call
    expect(loadGame).toHaveBeenCalledWith("FAKE_TOKEN", store.dispatch);
    expect(relogin).not.toHaveBeenCalled();
  });

  // Check auth process
  test("renders with stored token", async () => {
    // Render with data in localStorage
    localStorage.setItem("token", "FAKE_TOKEN");
    const { store } = await renderWithStore(<App />);
    // Check called functions
    expect(relogin).toHaveBeenCalledTimes(1);
    expect(relogin.mock.calls[0][0]).toEqual("FAKE_TOKEN"); // First argument of first call
    expect(loadGame).toHaveBeenCalledWith("FAKE_TOKEN", store.dispatch);
    expect(login).not.toHaveBeenCalled();
  });

  // Check auth process
  test("fill login form", async () => {
    // Render with specific initial state
    const { container } = await renderWithStore(<App />);
    // Fill form
    const input = screen.getByPlaceholderText("Your name");
    userEvent.type(input, "Toto");
    // Submit form
    const submit = screen.getByText("Log in");
    userEvent.click(submit);
    // Game should now be loading
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
