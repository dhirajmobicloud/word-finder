import { useTheme } from "./hooks";
import "./styles/app.scss";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import PlayGround from "./pages/play-ground/PlayGround";
import { App as capApp, } from "@capacitor/app";
import { useEffect } from "react";
import { Login } from "./pages/login/Login1";
import { useDispatch } from "react-redux";
import { Dialog } from "@capacitor/dialog";
import ForgetPassword from "./pages/login/ForgetPassword";

function App() {

  const dispatch = useDispatch();

  useTheme();

  useEffect(() => {

    capApp.addListener("backButton", async (data) => {

      if (window.location.pathname === "/" || window.location.pathname === "/home") {

        const { value } = await Dialog.confirm({ title: "Exit the game ?", message: "" });
        if (value) {
          await capApp.exitApp()
        }
      }
      else if (window.location.pathname === "/play-ground") {

        dispatch.popups.open("exit");
      }

    });

    return () => {
      capApp.removeAllListeners()
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/forget-password" element={<ForgetPassword/>}/> */}
        {/* <Route path="/home" element={<Homepage />} /> */}
        <Route path="/play-ground" element={<PlayGround />} />
      </Routes>
    </>
  );
}

export default App;
