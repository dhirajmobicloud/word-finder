import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";

function WinEndPopup() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  const { wp } = useSelector((state) => state.points);

  function newGame() {
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
    localStorage.removeItem("persist:root");
  }

  return (
    <Modal
      preClose={newGame}
      title="winend"
      body={
        <>
          <div className="winend-row">
            <p className="winend-text1">Game Over</p>
            <p className="winend-text">Your Score is {wp}</p>
          </div>
        </>
      }
    />
  );
}

export default WinEndPopup;
