import { useDispatch, useSelector } from "react-redux";
import Button from "./common/Button";
// import { GiMagnifyingGlass } from "react-icons/gi";
import { prices } from "../store/initData";
import dictionary from "../dictionary";
import { useState, useEffect } from "react";
import negative from "../styles/music/negative.mp3";
import success from "../styles/music/success.mp3";
import gameover from "../styles/music/gameOver.mp3";
// import axios from "axios";
import scoreImg from "../assets/images/award.png";
import hintImg from "../assets/images/hint.png";

function Controls() {
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const subId = urlParams.get("sub");
  const gamingEnv = urlParams.get("gamingEnv");
  const gamingId = prices.gamingId;
  const language1 = "en";
  const [flag, setFlag] = useState(false);

  const language = useSelector((state) => state.language);

  useEffect(() => {
    dispatch.board.reset();
    dispatch.board.newAnswer(language);
    dispatch.hints.reset();
    dispatch.points.reset();
    localStorage.removeItem("sessionId");
    localStorage.removeItem("persist:root");
  }, [dispatch.board, dispatch.hints, dispatch.points, language]);

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

  const [currentword, setCurrentWord] = useState("");
  const { row, answer, letters, wordLength, otherWords } = useSelector(
    (state) => state.board
  );

  console.log(answer);
  const { wp, minutes, seconds, isPlaying, isZero } = useSelector(
    (state) => state.points
  );

  const { howToPlay } = useSelector((state) => state.popups);

  let [mysessiondata, setMySessionData] = useState("");
  const theme = useSelector((state) => state.themes);

  let myvalue = {
    gameCode: gamingId,
    sessionId: mysessiondata,
    score: wp, //random unique id
    subId: subId,
    gamestate: "over",
    currlevel: 1,
  };

  let myvalue1 = {
    gameCode: gamingId,
    sessionId: mysessiondata,
    score: wp, //random unique id
    subId: subId,
    gamestate: "playing",
    currlevel: 1,
  };

  /**
   * @description Function provided to useEffect is use to send message to parent window with score and session id data.
   */
  useEffect(() => {
    window.addEventListener("unload", () => {
      window.parent.postMessage(myvalue, "*");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function Myhint() {
    if (wp > 0 && isZero === false) {
      dispatch.popups.open("hints");
    }
    if (wp === 0 && isZero === true) {
      dispatch.popups.open("insufficient");
    }
  }

  useEffect(() => {
    if (wp > 0 && isZero === true) {
      dispatch.points.setIsNotZero();
    }
    if (wp === 0 && isZero === false) {
      dispatch.points.setIsZero();
    }
    let mytimeout = setTimeout(() => {
      if (minutes === 0 && seconds === 0) {
        let audio1 = new Audio(gameover);
        if (isPlaying === true) {
          audio1.play();
        }
        clearTimeout(mytimeout);

        localStorage.removeItem("sessionId");
        checkGameOverForTimer(currentword, answer, row);
      }

      if (minutes === 5 && howToPlay === false) {
        const sessionData = "id" + Math.random().toString(16);
        localStorage.setItem("sessionId", sessionData);
        setMySessionData(localStorage.getItem("sessionId"));
      }
      if (minutes > 0 && howToPlay === false) {
        if (seconds === 0) {
          dispatch.points.setSeconds(59);
          dispatch.points.addMinutes();
        } else if (seconds > 0) {
          dispatch.points.addSeconds();
        }
      }
      if (minutes === 0 && howToPlay === false) {
        if (seconds > 0) {
          dispatch.points.addSeconds();
        }
      }
    }, 1000);

    return () => {
      clearTimeout(mytimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, howToPlay]);

  useEffect(() => {
    window.addEventListener("unload", () => {
      window.parent.console.log("Child is gone");
    });
  }, []);

  useEffect(() => {
    if (flag === true) {
      CheckEndGame();
      setFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  // function MyData() {
  //   if (seconds < 10) {
  //     let myvalue = "0" + seconds;
  //     return (
  //       <div className="controls-timediv">
  //         {/* <h5 className="controls-timertitle1">Timer</h5> */}
  //         {theme === "light" ? (
  //           <div className="controls-psize">
  //             <p className="controls-sizedata">
  //               {minutes}:{myvalue}
  //             </p>
  //           </div>
  //         ) : (
  //           <div className="controls-psize1">
  //             <p className="controls-sizedata1">
  //               {minutes}:{myvalue}
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="controls-timediv">
  //         {/* <h5 className="controls-timertitle1">Timer</h5> */}
  //         {theme === "light" ? (
  //           <div className="controls-psize">
  //             <p className="controls-sizedata">
  //               {minutes}:{seconds}
  //             </p>
  //           </div>
  //         ) : (
  //           <div className="controls-psize1">
  //             <p className="controls-sizedata1">
  //               {minutes}:{seconds}
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }
  // }

  function checkWordNotExist(dictionary, currentWord) {
    let booldata;
    if (!dictionary.find((word) => word === currentWord)) {
      dispatch.popups.open("unknown");
      let audio1 = new Audio(negative);
      if (isPlaying === true) {
        audio1.play();
      }
      booldata = true;
    } else {
      booldata = false;
    }

    return booldata;
  }

  function addWordToBoard(currentWord, row) {
    const newWord = { correct: [], present: [] };

    let myanswer = answer.split("");
    const mydata = currentWord.split("");

    mydata.forEach((letter, index) => {
      if (letter === myanswer[index]) {
        newWord.correct[index] = letter === myanswer[index];
        myanswer[index] = null;
      }
    });

    mydata.forEach((letter, index) => {
      if (myanswer.includes(letter) && newWord.correct[index] !== true) {
        newWord.present[index] = myanswer.includes(letter);
        myanswer[myanswer.indexOf(letter)] = null;
      }
    });

    if (currentWord !== answer) {
      let myvalue = { score: 0 };
      for (let i = 0; i < newWord.correct.length; i++) {
        if (newWord.correct[i] === true) {
          for (let j = 0; j < currentWord.length; j++) {
            if (i === j) {
              if (typeof otherWords[i] === "undefined") {
                dispatch.board.AddData(currentWord[j], i);
                dispatch.points.addPoints(5);
              }
            }
          }
        }
      }
      if (myvalue.gameCode) {
        fetch(link, {
          body: JSON.stringify(myvalue1),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (currentWord === answer) {
      let myvalue = { score: 0 };
      for (let i = 0; i < newWord.correct.length; i++) {
        if (newWord.correct[i] === true) {
          for (let j = 0; j < currentWord.length; j++) {
            if (i === j) {
              if (typeof otherWords[i] === "undefined") {
                dispatch.board.AddData(currentWord[j], i);
                dispatch.points.addPoints(5);
              }
            }
          }
        }
      }
      if (myvalue.gameCode) {
        fetch(link, {
          body: JSON.stringify(myvalue1),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    dispatch.board.addWord(newWord);
  }

  function checkGameOver(currentWord, answer, row) {
    if (currentWord === answer) {
      let audio1 = new Audio(success);
      if (isPlaying === true) {
        audio1.play();
      }
      dispatch.popups.open("win");
      dispatch.statistics.win();
      dispatch.hints.reset();

      setTimeout(() => {
        dispatch.popups.close("win");
      }, 3000);
    } else if (row === 6) {
      if (checkWordNotExist(dictionary[language1], currentWord) === true) {
        let audio1 = new Audio(negative);
        if (isPlaying === true) {
          audio1.play();
        }
      }
      if (checkWordNotExist(dictionary[language1], currentWord) === false) {
        setFlag(true);

        dispatch.popups.open("defeatend");
        dispatch.statistics.win();
        dispatch.hints.reset();
      }
    }
  }

  function CheckEndGame() {
    fetch(link, {
      body: JSON.stringify(myvalue),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      window.parent.postMessage(myvalue, "*");
      dispatch.popups.close("defeatend");
      dispatch.board.reset();
      dispatch.hints.reset();
      dispatch.board.newAnswer(language);
      dispatch.points.reset();
      localStorage.removeItem("persist:root");
    }, 3000);
  }

  function checkGameOverForTimer(currentWord, answer, row) {
    if (currentWord === answer) {
      fetch(link, {
        body: JSON.stringify(myvalue),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      dispatch.popups.open("winend");

      setTimeout(() => {
        window.parent.postMessage(
          {
            gameCode: gamingId,
            sessionId: mysessiondata,
            score: wp, //random unique id
            subId: subId,
            gamestate: "over",
            currlevel: 1,
          },
          "*"
        );
        dispatch.board.reset();
        dispatch.hints.reset();
        dispatch.board.newAnswer(language);
        dispatch.points.reset();
        localStorage.removeItem("persist:root");
        dispatch.popups.close("winend");
      }, 3000);
    } else if (row <= 6) {
      dispatch.popups.open("defeatend");

      fetch(link, {
        body: JSON.stringify(myvalue),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      setTimeout(() => {
        window.parent.postMessage(myvalue, "*");

        dispatch.popups.close("defeatend");

        dispatch.board.reset();
        dispatch.hints.reset();
        dispatch.board.newAnswer(language);
        dispatch.points.reset();
        localStorage.removeItem("persist:root");
      }, 3000);
    }
  }

  function checkWord() {
    let currentWord = letters
      .map((item) => item.letter)
      .slice(-wordLength)
      .join("");

    dispatch.points.addIndex();

    setCurrentWord(currentWord);

    if (checkWordNotExist(dictionary[language1], currentWord) === false) {
      addWordToBoard(currentWord, row);
    }

    if (minutes > 0) {
      if (seconds > 0) {
        checkGameOver(currentWord, answer, row);
      }
      if (seconds === 0) {
        checkGameOver(currentWord, answer, row);
      }
    }

    if (minutes === 0) {
      if (seconds > 0) {
        checkGameOver(currentWord, answer, row);
      }
    }
  }

  return (
    <div className="controls">
      {/* <div className="controls-hintdata" onClick={() => Myhint()}></div> */}

      <div className="controls-maindata">
        {/* <div>
          <div className="controls-hint">
            <img
              src={hintImg}
              className="controls-hintImg"
              alt=""
              srcset=""
              onClick={() => Myhint()}
            />
          </div>
          <div className="controls-scoredata">
            {theme === "light" ? (
              <div className="controls-scorepart">
                <img src={scoreImg} alt="" width={30} height={30} />
                <h5 className="controls-textdata">{wp}</h5>
              </div>
            ) : (
              <div className="controls-scorepart1">
                <img src={scoreImg} alt="" width={30} height={30} />
                <h5 className="controls-textdata1">{wp}</h5>
              </div>
            )}
          </div>
        </div> */}
        <div className="controls-hint">
          {/* <div className="controls-hintdata" onClick={() => Myhint()}></div> */}
          {/* <GiMagnifyingGlass
            size={22}
            color="#ffdd62"
            
          /> */}
          <img
            src={hintImg}
            className="controls-hintImg"
            alt=""
            srcset=""
            onClick={() => Myhint()}
          />
        </div>
        <div className="controls-submit">
          <Button
            className="submit-btn"
            text="Submit"
            onClick={checkWord}
            disabled={letters.length !== row * wordLength}
          />
        </div>

        <div className="controls-scoredata">
          {/* <h5 className="controls-timertitle">Score</h5> */}
          {/* <div className="controls-sidedata">{MyData()}</div> */}
          {theme === "light" ? (
            <div className="controls-scorepart">
              <img src={scoreImg} alt="" width={30} height={30} />
              <h5 className="controls-textdata">{wp}</h5>
            </div>
          ) : (
            <div className="controls-scorepart1">
              <img src={scoreImg} alt="" width={30} height={30} />
              <h5 className="controls-textdata1">{wp}</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Controls;
