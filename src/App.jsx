import { useTheme } from "./hooks";
import "./styles/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import PlayGround from "./pages/play-ground/PlayGround";

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/play-ground" element={<PlayGround />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
