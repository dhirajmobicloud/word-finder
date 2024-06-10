import { useSelector } from "react-redux";
import Modal from "./Modal";

function DefeatEndPopup() {
  const { answer } = useSelector((state) => state.board);
  const { wp } = useSelector((state) => state.points);

  if (wp > 0) {
    return (
      <Modal
        title="defeatend"
        body={
          <>
            <div className="defeatend-row1">
              <p className="defeatend-text1">Game Over</p>
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
          </>
        }
      />
    );
  } else if (wp === 0) {
    return (
      <Modal
        title="defeatend"
        body={
          <>
            <div className="defeatend-row1">
              <p className="defeatend-text1">Game Over</p>
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
              <p className="defeatend-text2">Sorry... You Lost</p>
            </div>
          </>
        }
      />
    );
  }
}

export default DefeatEndPopup;
