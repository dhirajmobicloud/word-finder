import { prices } from "../../initData";

const init = {
  wp: prices.wp,
  earned: prices.earned,
  minutes: prices.minutes,
  seconds: prices.seconds,
  flag: 0,
  sessionId: "",
  gratifyarray: [
    "Splendid..!",
    "Champion..!",
    "Outstanding..!",
    "Yipee..!",
    "Super Cool..!",
    " Awesome..!",
    "Terrific..!",
    "Word Slayer..!",
    "Fantastic..!",
    "  That's Brilliant..!",
  ],
  index: 0,
  isPlaying: false,
  isExit: false,
  isZero: true,
  winpopup: false,
  defeatpopup: false,
  isWon : false
};

export const points = {
  state: init,
  reducers: {
    reset(state) {
      return { ...init, wp: prices.wp };
    },

    setIsWon(state, value){
      state.isWon = value
    },

    addPoints(state, points) {
      state.wp = state.wp + points;
    },
    addMinutes(state) {
      state.minutes = state.minutes - 1;
    },
    addSeconds(state) {
      state.seconds = state.seconds - 1;
    },
    setSeconds(state, sec) {
      state.seconds = sec;
    },
    addCorrectLetterHint(state, value) {
      state.wp = state.wp - value;
    },

    addAbsentLetterHint(state, value) {
      state.wp = state.wp - value;
    },
    addSessionId(state, value) {
      state.sessionId = value;
    },
    addIndex(state) {
      state.index = Math.floor(Math.random() * state.gratifyarray.length);
    },
    setIsPlaying(state) {
      state.isPlaying = true;
    },
    setIsNotPlaying(state) {
      state.isPlaying = false;
    },
    setExitPart(state) {
      state.isExit = true;
    },
    setExitFalse(state) {
      state.isExit = false;
    },

    setIsZero(state) {
      state.isZero = true;
    },
    setIsNotZero(state) {
      state.isZero = false;
    },
    setIsFlagger(state) {
      state.isFlagger = true;
    },
    setIsNotFlagger(state) {
      state.isFlagger = false;
    },
    setWinPopup(state) {
      state.winpopup = true;
    },
    closeWinPopup(state) {
      state.winpopup = false;
    },
    setDefeatPopup(state) {
      state.defeatpopup = true;
    },
    closeDefeatPopup(state) {
      state.defeatpopup = false;
    },
  },
};
