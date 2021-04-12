import { number } from "prop-types";
import { Fragment, useState } from "react";

export const Counter = ({ initialValue = 1 }) => {
  const [value, setValue] = useState(initialValue);

  const onClick = (newValue) => (e) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Fragment>
      <span className="value">{value}</span>
      <button onClick={onClick(value + 1)}> + </button>
      <button onClick={onClick(value - 1)}> - </button>
    </Fragment>
  );
};

Counter.propTypes = {
  initialValue: number,
};
