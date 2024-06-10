import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import mymusic from "../styles/music/background1.mp3";
import volume1 from "../styles/images/volume1.png";
import night2 from "../styles/images/night2.png";
import Mute2 from "../styles/images/Mute2.png";
import info1 from "../styles/images/info3.png";
import Sun1 from "../styles/images/Sun1.png";
import closePng from "../styles/images/close1.png";

function Header() {
  const dispatch = useDispatch();
  const { seconds, minutes, isPlaying } = useSelector((state) => state.points);
  const theme = useSelector((state) => state.themes);

  // const navigate = useNavigate();

  let music = useRef();

  const MyData = () => {
    if (seconds < 10) {
      let myvalue = "0" + seconds;
      return (
        <div className="controls-timediv">
          {/* <h5 className="controls-timertitle1">Timer</h5> */}
          {theme === "light" ? (
            <div className="controls-psize">
              <p className="controls-sizedata">
                {minutes}:{myvalue}
              </p>
            </div>
          ) : (
            <div className="controls-psize1">
              <p className="controls-sizedata1">
                {minutes}:{myvalue}
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="controls-timediv">
          {/* <h5 className="controls-timertitle1">Timer</h5> */}
          {theme === "light" ? (
            <div className="controls-psize">
              <p className="controls-sizedata">
                {minutes}:{seconds}
              </p>
            </div>
          ) : (
            <div className="controls-psize1">
              <p className="controls-sizedata1">
                {minutes}:{seconds}
              </p>
            </div>
          )}
        </div>
      );
    }
  };

  const playAndPause = () => {
    if (isPlaying) {
      music.current.pause();
      dispatch.points.setIsNotPlaying();
    } else {
      music.current.play();
      dispatch.points.setIsPlaying();
    }
  };

  function changeTheme() {
    if (theme === "dark") {
      let themedata = "light";
      dispatch.themes.setTheme(themedata);
    } else if (theme === "light") {
      let themedata = "dark";
      dispatch.themes.setTheme(themedata);
    }
  }

  return (
    <header className="header">
      <div className="header_col">
        <div className="header_infopart">
          <button className="controls-btn">
            <img
              src={info1}
              onClick={() => dispatch.popups.open("howToPlay")}
              className="controls-imginfo2"
              alt="How to play"
            />
          </button>
        </div>

        <div className="header_soundpart">
          <button className="controls-btn" onClick={playAndPause}>
            {isPlaying ? (
              <img src={volume1} className="controls-imginfo2" alt="Volume1" />
            ) : (
              <img src={Mute2} className="controls-imginfo2" alt="Mute" />
            )}
          </button>
        </div>

        <div>
          <div className="header_modepart">
            <button className="controls-btn2" onClick={changeTheme}>
              {theme === "dark" ? (
                <img src={night2} className="controls-imginfo1" alt="Dark" />
              ) : (
                <img src={Sun1} className="controls-imginfo1" alt="Light" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="header__language">
        <div style={{ width: "100px" }}>
          <div className="controls-sidedata">{MyData()}</div>
        </div>
      </div>
      <div className="header-close">
        <img
          src={closePng}
          onClick={() => dispatch.popups.open("exit")}
          className="controls-imginfo"
          alt="close button"
        ></img>
      </div>
      <audio ref={music} loop>
        <source src={mymusic} type="audio/mpeg" />
      </audio>
    </header>
  );
}

export default Header;
