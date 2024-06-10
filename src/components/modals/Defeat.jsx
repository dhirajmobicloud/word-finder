import { useSelector, useDispatch } from "react-redux";

import Modal from "./Modal";

function DefeatPopup() {
  const dispatch = useDispatch();
  const { answer } = useSelector((state) => state.board);
  const language = useSelector((state) => state.language);
  const { minutes, seconds, isExit } = useSelector((state) => state.points);

  function newGame() {
    dispatch.board.reset();
    dispatch.points.closeDefeatPopup();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
  }

  if (minutes >= 0 && seconds > 0 && isExit === false) {
    return (
      <Modal
        preClose={newGame}
        title="defeat"
        body={
          <>
            <div className="defeat-row" id="defeatModal">
              <p className="defeat-text">Answer is</p>
            </div>
            <h3 className="defeat-text3">
              <span className="defeat-answer">{answer[0]}</span>
              <span className="defeat-answer">{answer[1]}</span>
              <span className="defeat-answer">{answer[2]}</span>
              <span className="defeat-answer">{answer[3]}</span>
              <span className="defeat-answer">{answer[4]}</span>
            </h3>
          </>
        }
      />
    );
  }
}

export default DefeatPopup;
