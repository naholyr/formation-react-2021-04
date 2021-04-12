const Counter = ({
  initialValue /*: number */ = 1,
}) => {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    console.log('Mount');
    return () => console.log('Unmount');
  }, []);

  useEffect(() => {
    console.log('Render');
  });

  useEffect(() => {
    console.log('Changed value', value);
  }, [value]);

  return React.createElement('button', {
    onClick: (e /* SyntheticEvent */) => {
      e.preventDefault();
      // replace
      setValue(value + 1)
    },
  }, `${value} (click to increment)`);
}

Counter.propTypes = {
  initialValue: PropTypes.number,
}

