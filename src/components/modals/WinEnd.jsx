import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import "../../styles/modals/winEndGame.scss"

function WinEndPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const language = useSelector((state) => state.language);

  const { wp } = useSelector((state) => state.points);

  function newGame() {
    dispatch.popups.close("winend")
    dispatch.board.reset();
    dispatch.points.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
    localStorage.removeItem("persist:root");
  }

  return (
    <Modal
      // preClose={newGame}
      title="winend"
      noClose={true}
      body={
        <>
          <div className="winend-row">
            <p className="winend-text1">Game Over</p>
            <p className="winend-text">Your Score is {wp}</p>
            <div className="winend-controls">
              <button className="winend-controls-play" onClick={newGame}>
                Play again
              </button>
              <button className="winend-controls-exit" onClick={()=>{ navigate("/"); dispatch.popups.close("winend") }}>
                Exit
              </button>
            </div>
          </div>
        </>
      }
    />
  );
}

export default WinEndPopup;
