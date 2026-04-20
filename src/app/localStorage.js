export const loadState = () => {
  try {
    const saved = localStorage.getItem("timers");
    return saved ? JSON.parse(saved) : undefined;
  } catch (e) {
    console.error("Load error:", e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem("timers", json);
  } catch (e) {
    console.error("Save error:", e);
  }
};
