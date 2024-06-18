import { useSelector } from "react-redux";
import Cell from "./Cell";

function Board() {
  const { letters, wordLength } = useSelector((state) => state.board);
  const theme = useSelector((state) => state.themes);

  return (
    <>
      <div className={`board-${wordLength} board`}>
        <div
          className="animated-letter"
          // style={{ top: `${position.y}px`, left: `${position.x}px` }}
          style={{
            color: theme == "light" ? "rgb(255 255 255 / 37%)" : "#bda2a23d",
          }}
        >
          A
        </div>
        {[...new Array(wordLength * 6)].map((_, index) => (
          <Cell
            key={index}
            letter={letters[index]?.letter ?? ""}
            status={letters[index]?.status ?? ""}
            anim={letters.length === index + 1 ? "fill-animation" : ""}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
