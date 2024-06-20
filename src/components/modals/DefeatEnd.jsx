import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function DefeatEndPopup() {
  const { answer } = useSelector((state) => state.board);
  const { wp } = useSelector((state) => state.points);

  const language = useSelector((state) => state.language);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function newGame() {
    dispatch.popups.close("defeatend");
    dispatch.points.reset();
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
  }

  if (wp > 0) {
    return (
      <Modal
        title="defeatend"
        noClose={true}
        body={
          <>
            <div className="defeatend-row1">
              <p className="defeatend-text1">Sorry... You Lost</p>
            </div>
            <div className="defeatend-row2">
              <p className="defeatend-text2">The Answer is</p>
              <h3 className="defeatend-text3">
                <span className="defeatend-answer">{answer[0]}</span>
                <span className="defeatend-answer">{answer[1]}</span>
                <span className="defeatend-answer">{answer[2]}</span>
                <span className="defeatend-answer">{answer[3]}</span>
                <span className="defeatend-answer">{answer[4]}</span>
              </h3>
            </div>

            <div className="defeatend-row3">
              <p className="defeatend-text21">
                Your score is: <span className="defeatend-coin1">{wp}</span>
              </p>
            </div>

            <div className="win-controls">
              <button className="win-controls-play" onClick={newGame}>
                Play again
              </button>
              <button className="win-controls-exit" onClick={()=>{ navigate("/"); dispatch.popups.close("defeatend") }}>
                Exit
              </button>
            </div>
          </>
        }
      />
    );
  } else if (wp === 0) {
    return (
      <Modal
        title="defeatend"
        noClose={true}
        body={
          <>
            <div className="defeatend-row1">
              <p className="defeatend-text1">Sorry... You Lost</p>
            </div>
            <div className="defeatend-row2">
              <p className="defeatend-text2">The Answer is</p>
              <h3 className="defeatend-text3">
                <span className="defeatend-answer">{answer[0]}</span>
                <span className="defeatend-answer">{answer[1]}</span>
                <span className="defeatend-answer">{answer[2]}</span>
                <span className="defeatend-answer">{answer[3]}</span>
                <span className="defeatend-answer">{answer[4]}</span>
              </h3>
            </div>

            <div className="defeatend-row3">
              <p className="defeatend-text21">
                Your score is: <span className="defeatend-coin1">{wp}</span>
              </p>
            </div>
            <div className="win-controls">
              <button className="win-controls-play" onClick={newGame}>
                Play again
              </button>
              <button className="win-controls-exit" onClick={()=>{ navigate("/"); dispatch.popups.close("defeatend") }}>
                Exit
              </button>
            </div>
          </>
        }
      />
    );
  }
}

export default DefeatEndPopup;
