import { Fragment, useState } from "react";
import { Counter } from "../Counter/Counter";

export const CounterList = () => {
  const [nb, setNb] = useState(0);

  const onClickAddCounter = (e) => {
    e.preventDefault();
    setNb(nb + 1);
  };

  const lis = [];
  for (let i = 0; i < nb; i++) {
    const li = (
      <li key={nb - i}>
        <Counter initialValue="toto" />
      </li>
    );
    lis.push(li);
  }

  return (
    <Fragment>
      <button onClick={onClickAddCounter}>Add counter</button>
      <ul>{lis}</ul>
    </Fragment>
  );
};
