import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";

function WordNotFound() {
  const dispatch = useDispatch();
  const { unknown } = useSelector((state) => state.popups);

  useEffect(() => {
    unknown && setTimeout(() => dispatch.popups.close("unknown"), 2000);
  }, [dispatch.popups, unknown]);

  return (
    <Popup
      open={unknown}
      onClose={() => dispatch.popups.close("unknown")}
      position="top center"
    >
      <div className="word-not-found">Word Not Found</div>
    </Popup>
  );
}

export default WordNotFound;
