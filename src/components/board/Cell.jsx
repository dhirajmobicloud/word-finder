import { useSelector } from "react-redux";

function Cell({ letter, status, anim }) {
  const theme = useSelector((state) => state.themes);
  return (
    <div
      className={`board${
        theme == "dark" ? "__cell-dark" : "__cell"
      } ${status} ${anim}`}
    >
      {letter}
    </div>
  );
}

export default Cell;
