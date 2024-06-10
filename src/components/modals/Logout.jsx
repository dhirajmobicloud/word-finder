import { useDispatch } from "react-redux";
import Modal from "./Modal";
import Button from "../common/Button";
import { auth } from "../../firebase/firebase.config";

function Logout({ clearUserData }) {
  const dispatch = useDispatch();

  const MyClick2 = async () => {
    await auth.signOut();
    clearUserData();
    dispatch.popups.close("logout");
  };

  function MyClick3() {
    dispatch.popups.close("logout");
  }

  return (
    <Modal
      title="logout"
      body={
        <>
          <div className="exit-row1" id="defeatModal">
            <p className="exit-text">Do you want to logout</p>
          </div>

          <div className="exit-row">
            <Button
              className="try-again-btn-exit"
              text="Yes"
              onClick={() => {
                MyClick2();
              }}
            />

            <Button
              className="try-again-btn-exit"
              text="No"
              onClick={() => {
                MyClick3();
              }}
            />
          </div>
        </>
      }
    />
  );
}

export default Logout;
