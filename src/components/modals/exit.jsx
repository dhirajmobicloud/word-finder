import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "../common/Button";
import axios from "axios";
import { prices } from "../../store/initData";

function Exit() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const { wp, minutes, seconds } = useSelector((state) => state.points);
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const subId = urlParams.get("sub");
  const gamingEnv = urlParams.get("gamingEnv");
  const gamingId = prices.gamingId;

  const navigate = useNavigate();

  let domain_map = new Map([
    // [
    //   "camwc",
    //   "https://ext-backenddemo.challengesarena.com/appserver/api/v1/games/Mobisoft/score",
    // ],
    // [
    //   "cawintcentral",
    //   "https://ext-backendprod.challengesarena.com/appserver/api/v1/games/Mobisoft/score",
    // ],
    // [
    //   "caindcentral",
    //   "https://extcae-backend.challengesarena.com/appserver/api/v1/games/Mobisoft/score",
    // ],
    // [
    //   "dev",
    //   "http://demo.onmohub.com/caBase/appserver/api/v1/games/Mobisoft/score",
    // ],
    // [
    //   "caindcentralsg",
    //   "https://airtelgaming.wineazy.com/sgs/api/v1/games/Mobisoft/score",
    // ],

    [
      "cawintcentral",
      "https://ext-backendprod.challengesarena.com/appserver/api/v1/games/originals/score",
    ],
    [
      "caindcentral",
      "https://extcae-backend.challengesarena.com/appserver/api/v1/games/originals/score",
    ],
  ]);

  let link;

  if (domain_map.has(gamingEnv)) {
    link = domain_map.get(gamingEnv);
  }

  function MyClick2() {
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
    dispatch.popups.close("exit");
    let sessionData = localStorage.getItem("sessionId");
    let myvalue = {
      gameCode: gamingId,
      sessionId: sessionData, // random unique id
      score: wp,
      subId: subId,
      gamestate: "over",
      currlevel: 1,
    };

    axios
      .post(link, myvalue)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    window.parent.postMessage(
      {
        gameCode: gamingId,
        sessionId: sessionData,
        score: wp, //random unique id
        subId: subId,
        gamestate: "over",
        currlevel: 1,
      },
      "*"
    );
    dispatch.points.reset();
    navigate("/home");
  }

  function MyClick3() {
    dispatch.popups.close("exit");
  }

  if (minutes >= 0 && seconds > 0) {
    return (
      <Modal
        title="exit"
        body={
          <>
            <div className="exit-row1" id="defeatModal">
              <p className="exit-text">Do you want to exit</p>
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
}

export default Exit;
