import SpielfeldLayout from "./SpielfeldLayout";
import GameField from "./Components/Gamefield";
import React, { useEffect } from "react";
import { useState } from "react";
import Stats from "./Components/Stats";
import Emitter from "./service";

const App: React.FC = () => {
  return(
    <div className="App center">
      <GameField />;
      <Stats/>
    </div>
  )
};

export default App;
