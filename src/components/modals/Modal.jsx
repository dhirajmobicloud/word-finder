import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import exit from "../../styles/images/exit.png";

function Modal({ preClose, title, body }) {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.popups);

  return (
    <Popup
      modal
      open={popups[title]}
      onClose={() => {
        preClose && preClose();
        dispatch.popups.close(title);
      }}
      position="center center"
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="modal-outer">
          <div className={`modal ${title}`}>
            <div className="modal-header">
              <button className="modal__close-btn" onClick={close}>
                <img src={exit} className="modal-image" alt="Exit" />
              </button>
            </div>
            <div className="modal-body">{body}</div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Modal;
