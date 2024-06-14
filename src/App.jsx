import { useTheme } from "./hooks";
import "./styles/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import PlayGround from "./pages/play-ground/PlayGround";
import { App as capApp } from "@capacitor/app";
import { useEffect } from "react";
import { Login } from "./pages/login/Login";
import { ToastContainer } from "react-toastify";

function App() {
  useTheme();

  // useEffect(() => {
  //   capApp.addListener("appUrlOpen", (data) => {
  //     const url = data.url;
  //     console.log("Deep link URL:", url);

  //     // Parse the URL and navigate to the appropriate screen in your app
  //     // For example:
  //     // if (url.includes('login')) {
  //     //   navigateToLogin();
  //     // }
  //   });

  //   return () => {
  //     App.removeAllListeners();
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/play-ground" element={<PlayGround />} />
      </Routes>
      <ToastContainer position="top-center" theme="light" autoClose={3500} />
    </BrowserRouter>
  );
}

export default App;
