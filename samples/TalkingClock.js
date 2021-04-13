import { useEffect, useState } from "react";

const App = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState();
  const onTick = (timestamp) => {
    setCurrentTimestamp(timestamp);
  };

  const date = new Date(currentTimestamp).toLocaleTimeString();

  return (
    <div>
      <TalkingClock display={false} onTick={onTick} />
      Current: {date}
    </div>
  );
};

const TalkingClock = ({ display = true, onTick = () => {} }) => {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const timestamp = Date.now();
      setTimestamp(timestamp);
      onTick(timestamp);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return display ? <span>{timestamp}</span> : null;
};
