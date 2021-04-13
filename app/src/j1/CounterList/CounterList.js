import { useEffect, useState } from "react";
import { changeNbCounters } from "../actions";
import { Counter } from "../Counter/Counter";

export const CounterList = (/* { onCountChange, initialCount = 0 } */) => {
  const [nb, setNb] = useState(window.store.getState().counters.nbCounters);
  useEffect(() => {
    const unsubscribe = window.store.subscribe(() => {
      setNb(window.store.getState().counters.nbCounters);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("CounterList", { nb /* onCountChange,  initialCount */ });
  });

  const onClickAddCounter = (e) => {
    console.log("Counter.onClickAddCounter");
    e.preventDefault();
    // setNb(nb + 1);
    // onCountChange(nb + 1);
    window.store.dispatch(changeNbCounters(nb + 1));
  };

  const lis = []; // mutable
  for (let i = 0; i < nb; i++) {
    const li = (
      <li key={nb - i}>
        <Counter initialValue={1} />
      </li>
    );
    lis.push(li);
  }

  return (
    <div>
      <button onClick={onClickAddCounter}>Add counter</button>
      <ul>{lis}</ul>
      <small>
        {nb} compteur{nb > 1 ? "s" : ""}
      </small>
    </div>
  );
};
