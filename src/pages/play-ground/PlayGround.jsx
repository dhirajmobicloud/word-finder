import React, { useEffect } from "react";
import "../play-ground/play-ground.scss";
import { Header, Modals, Board, Controls, Keyboard } from "../../components";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const PlayGround = () => {
  const navigate = useNavigate();

  const getStoredUser = async () => {
    // auth.onAuthStateChanged((data) => {
    //   if (!data) navigate("/");
    // });
  };

  useEffect(() => {
    // getStoredUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="play-ground">
      <Header />
      <Board />
      <Controls />
      <Keyboard />
      <Modals />
    </div>
  );
};

export default PlayGround;
