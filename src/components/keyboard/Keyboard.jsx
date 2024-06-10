import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import BackspaceSVG from "../../assets/svg/backspace.svg";
import Button from "../common/Button";
import Key from "./Key";
import { keyboards } from "../../store/initData";

function Keyboard() {
  const dispatch = useDispatch();

  const { letters, wordLength, row } = useSelector((state) => state.board);
  const { absentLetters } = useSelector((state) => state.hints);
  const language = useSelector((state) => state.language);

  function addNewLetter(letter) {
    const wordNotFull = () => letters.length < row * wordLength;
    wordNotFull() && dispatch.board.addLetter({ letter });
  }

  function removeLastLetter() {
    letters.length > (row - 1) * wordLength && dispatch.board.backspace();
  }

  function checkLetterStatus(letters, absentLetters, letter) {
    const check = (state) =>
      [...letters, ...absentLetters].find(
        (item) => item.letter === letter && item.status === state
      );
    return (
      check("correct") ||
      check("present") ||
      check("absent") ||
      check("unknown")
    );
  }

  return (
    <div className="keyboard">
      {keyboards[language].kb
        .map((row, index, array) =>
          index === array.length - 1 ? row + "<" : row
        )
        .map((row, index) => (
          <div key={index} className="keyboard-row">
            {row
              .split("")
              .map((letter) =>
                letter !== "<" ? (
                  <Key
                    key={letter}
                    letter={letter}
                    className={`keyboard-button ${
                      checkLetterStatus(letters, absentLetters, letter)
                        ?.status ?? ""
                    }`}
                    onClick={() => addNewLetter(letter)}
                  />
                ) : (
                  <Button
                    key={letter}
                    className="backspace-btn keyboard-button"
                    text={<SVG src={BackspaceSVG} />}
                    onClick={removeLastLetter}
                  />
                )
              )}
          </div>
        ))}
    </div>
  );
}

export default Keyboard;
