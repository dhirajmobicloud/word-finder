import { prices } from "../../initData";

const init = {
  earned: 0,
  correctWord: [],
  absentLetters: [],
};

export const hints = {
  state: init,
  reducers: {
    reset(state) {
      return { ...init, wp: prices.wp };
    },

    addCorrectLetter(state, { letter, activeLetterIndex }) {
      state.correctWord[activeLetterIndex] = { letter, status: "correct" };
    },

    addAbsentLetter(state, letter) {
      state.absentLetters.push({ letter, status: "absent" });
    },

    addWPForLetters(state, points) {
      state.wp = state.wp + points;
    },
  },
};
