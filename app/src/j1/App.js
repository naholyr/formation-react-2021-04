// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { resetNbCounters } from "./actions";
import "./App.css";
import { CounterList } from "./CounterList/CounterList";

const INITIAL_COUNT = 2;

function App() {
  const [counterListKey, setCounterListKey] = useState(1);
  // const [nbCount, setNbCount] = useState(INITIAL_COUNT);
  const [nbCount, setNb] = useState(
    window.store.getState().counters.nbCounters
  );
  useEffect(() => {
    const unsubscribe = window.store.subscribe(() => {
      setNb(window.store.getState().counters.nbCounters);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("App", { nbCount, counterListKey });
  });

  const onClickReset = (e) => {
    console.log("App.onClickReset");
    e.preventDefault();
    setCounterListKey(counterListKey + 1);
    window.store.dispatch(resetNbCounters());
  };

  // const foo = (nbCount) => {
  //   console.log("App.foo", nbCount);
  //   setNbCount(nbCount);
  // };

  return (
    <div className="App">
      <h1>Compteurs {nbCount}</h1>
      <CounterList
        key={counterListKey}
        // onCountChange={foo}
        initialCount={INITIAL_COUNT}
      />
      <button onClick={onClickReset}>reset</button>
    </div>
  );
}

export default App;
