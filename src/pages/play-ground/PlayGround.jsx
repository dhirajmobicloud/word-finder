import React, { useEffect, useState } from "react";
import "../play-ground/play-ground.scss";
import { Header, Modals, Board, Controls, Keyboard } from "../../components";
import { auth, db } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";

const PlayGround = () => {
  const navigate = useNavigate();

  const getStoredUser = async () => {
    auth.onAuthStateChanged((data) => {
      if (!data) navigate("/");
    });
  };

  useEffect(() => {
    getStoredUser();
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
