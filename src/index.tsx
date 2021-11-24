import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from "./State/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LpHelp from "./Components/LandingPageComponents/LpHelp";
import LpOptions from "./Components/LandingPageComponents/LpOptions";
import LpStartMenu from "./Components/LandingPageComponents/LpStartMenu";
import EndingPage from "./Pages/HighscorePage";
import GamePage from "./Pages/GamePage";
import LandingPage from "./Pages/LandingPage";
import WinOverlay from "./Components/GamePageComponents/Overlays/WinOverlay";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index element={<LpStartMenu />} />
            <Route path="help" element={<LpHelp />} />
            <Route path="options" element={<LpOptions />} />
          </Route>
          <Route path="/game" element={<GamePage />} />
          <Route path="/high" element={<WinOverlay />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
