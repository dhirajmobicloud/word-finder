import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function WinPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const language = useSelector((state) => state.language);
  const { minutes, seconds, gratifyarray, index } = useSelector(
    (state) => state.points
  );

  function newGame1() {
    dispatch.popups.close("win");
    dispatch.points.reset();
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
  }

  if (minutes > 0 && seconds >= 0) {
    return (
      <Modal
        // preClose={newGame1}
        title="win"
        noClose={true}
        body={
          <>
            <div className="win-row">
              <p className="win-data">{gratifyarray[index]}</p>
            </div>
            <div className="win-controls">
              <button className="win-controls-play" onClick={newGame1}>
                Play again
              </button>
              <button className="win-controls-exit" onClick={()=>{ navigate("/"); dispatch.popups.close("win") }}>
                Exit
              </button>
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
