import GameField from "./Components/Gamefield";
import React from "react";
import Stats from "./Components/Stats";

const App: React.FC = () => {
  return(
    <div className="App center">
      <GameField />;
      <Stats/>
    </div>
  )
};

export default App;
