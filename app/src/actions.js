export const setUser = (name) => {
  return {
    type: "SET_USER",
    payload: { name },
  };
};

export const unsetUser = () => ({
  type: "SET_USER",
  payload: { name: null },
});
