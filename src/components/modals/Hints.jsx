import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { keyboards, prices } from "../../store/initData";
import { shuffle } from "../../helpers";
import hintAudio from "../../styles/music/hint1.wav";

function Hints() {
  const dispatch = useDispatch();
  const { letters, wordLength, answer } = useSelector((state) => state.board);
  const { correctWord, absentLetters } = useSelector((state) => state.hints);
  const { wp, isPlaying } = useSelector((state) => state.points);
  const language = useSelector((state) => state.language);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  function showCorrectLetter() {
    let audio1 = new Audio(hintAudio);
    if (isPlaying === true) {
      audio1.play();
    }

    dispatch.hints.addCorrectLetter({
      letter: answer[activeLetterIndex],
      activeLetterIndex,
    });
    dispatch.points.addCorrectLetterHint(prices.hints.correct);
  }

  function showAbsentLetter() {
    let audio1 = new Audio(hintAudio);
    if (isPlaying === true) {
      audio1.play();
    }
    const absentLetter = getAbsentLetter();

    dispatch.hints.addAbsentLetter(absentLetter);
    dispatch.points.addAbsentLetterHint(prices.hints.absent);
  }

  function getAbsentLetter() {
    const absentBoard = letters
      .filter((item) => item.status === "absent")
      .map((obj) => obj.letter);
    const absentHint = absentLetters.map((obj) => obj.letter);
    const aLetters = keyboards[language].alpha
      .split("")
      .filter((item) => !answer.split("").includes(item))
      .filter((item) => !absentBoard.includes(item))
      .filter((item) => !absentHint.includes(item));

    return shuffle(aLetters).at(-1);
  }

  function setActiveIndex(index) {
    correctWord[index]?.status !== "correct" && setActiveLetterIndex(index);
  }

  return (
    <Modal
      title="hints"
      body={
        <>
          <div className={`hints-row__word`}>
            {[...new Array(wordLength)].map((_, index) => (
              <div
                key={index}
                className={`hints-row__cell ${correctWord[index]?.status} ${
                  activeLetterIndex === index && "active"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {correctWord[index]?.letter}
              </div>
            ))}
          </div>
          <div className="hints-row">
            <div>
              <div className="hints-row__title">Correct</div>
              <div className="hints-row__hint">
                "Show correct letter
                <div>Select the above box to reveal</div>
                <div>respective letter</div>
              </div>
            </div>
            <button
              className="hints-row__button"
              onClick={showCorrectLetter}
              disabled={
                correctWord.filter((item) => item?.status === "correct")
                  .length >= wordLength ||
                correctWord[activeLetterIndex]?.status === "correct" ||
                wp < prices.hints.correct
              }
            >
              - {prices.hints.correct} Score
            </button>
          </div>
          <div className="hints-row">
            <div>
              <div className="hints-row__title">Absent</div>
              <div className="hints-row__hint">
                Show Absent letters on Keyboard
              </div>
            </div>
            <button
              className="hints-row__button"
              onClick={showAbsentLetter}
              disabled={
                absentLetters.length >
                  keyboards[language].alpha.length - wordLength ||
                wp < prices.hints.absent
              }
            >
              - {prices.hints.absent} Score
            </button>
          </div>
        </>
      }
    />
  );
}

export default Hints;
