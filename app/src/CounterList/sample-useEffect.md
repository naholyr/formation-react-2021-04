```js
import { Fragment, useEffect, useState } from "react";
import { Counter } from "../Counter/Counter";

class MyComponent extends React.Component {
  componentDidMount() {
    connect(this.props.room)
    ajax(...)
    window.onmousemove = ...
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room !== this.props.room) {
      disconnect(prevProps.room)
      connect(this.props.room)
    }
  }

  componentWillUnmount() {
    disconnect(this.props.room)
    if (!ajax.finished) ajax.abort()
    window.onmousemove = null
  }

  render() {
    return <div />
  }
}


export const CounterList = () => {
  const [nb, setNb] = useState(0);


  // Ajax
  useEffect(() => {
    ajax(...)
    return () => {
      if (!ajax.finished) ajax.abort()
    }
  }

  // Mousemove
  useEffect(() => {
    window.onmousemove = ...
    return () => {
      window.onmousemove = null
    }
  }

  useEffect(() => {
    console.log("Render");
    return () => {
      console.log("Before re-render or unmount");
    };
  });

  useEffect(() => {
    console.log("Mount");
    return () => {
      console.log("Before unmount");
    };
  }, []);

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
```
