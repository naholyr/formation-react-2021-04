// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import { CounterList } from "./CounterList/CounterList";

function App() {
  const [counterListKey, setCounterListKey] = useState(1);
  const onClickReset = (e) => {
    e.preventDefault();
    setCounterListKey(counterListKey + 1);
  };

  return (
    <div className="App">
      {/* process.env.REACT_APP_WHATEVER */}
      <CounterList key={counterListKey} />
      <button onClick={onClickReset}>reset</button>
    </div>
  );
}

export default App;
