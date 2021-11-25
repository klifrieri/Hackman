import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from "./State/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./Pages/GamePage";
import LayoutPage from "./Pages/LayoutPage";
import StartMenu from "./Components/LayoutPageComponents/StartMenu/StartMenu";
import Options from "./Components/LayoutPageComponents/StartMenu/Options";
import Help from "./Components/LayoutPageComponents/StartMenu/Help";
import Highscores from "./Components/LayoutPageComponents/StartMenu/Highscores";
import EndedGame from "./Components/LayoutPageComponents/EndedGame/EndedGame";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={process.env.REACT_APP_URL + "/"} element={<LayoutPage />}>
            <Route index element={<StartMenu />} />
            <Route path="help" element={<Help />} />
            <Route path="options" element={<Options />} />
            <Route path="highscores" element={<Highscores />} />
            <Route path="end" element={<EndedGame />} />
          </Route>
          <Route path={process.env.REACT_APP_URL + "/game"}element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
