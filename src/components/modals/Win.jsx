import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";

function WinPopup() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const { minutes, seconds, gratifyarray, index } = useSelector(
    (state) => state.points
  );

  function newGame1() {
    dispatch.popups.close("win");

    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
  }

  if (minutes > 0 && seconds >= 0) {
    return (
      <Modal
        preClose={newGame1}
        title="win"
        body={
          <>
            <div className="win-row">
              <p className="win-data">{gratifyarray[index]}</p>
            </div>
          </>
        }
      />
    );
  }

  if (minutes === 0 && seconds > 0) {
    return (
      <Modal
        preClose={newGame1}
        title="win"
        body={
          <>
            <div className="win-row">
              <p className="win-data">{gratifyarray[index]}</p>
            </div>
          </>
        }
      />
    );
  }
}

export default WinPopup;
