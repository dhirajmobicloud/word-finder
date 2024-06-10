export const popups = {
  state: {
    win: false,
    defeat: false,
    unknown: false,
    statistics: false,
    howToPlay: localStorage.getItem("persist:root") ? false : true,
    settings: false,
    hints: false,
    hints1: false,
    end: false,
    insufficient: false,
    defeatend: false,
    winend: false,
    exit: false,
    logout: false
  },
  reducers: {
    open(state, name) {
      state[name] = true;
    },

    close(state, name) {
      state[name] = false;
    },
  },
};
