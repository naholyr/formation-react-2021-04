// Action creator
export const changeNbCounters = (nb) => {
  return {
    type: "CHANGE_NB_COUNTERS",
    payload: { nb },
  };
};

export const resetNbCounters = () => {
  return {
    type: "CHANGE_NB_COUNTERS",
    payload: { nb: 0 },
  };
};
