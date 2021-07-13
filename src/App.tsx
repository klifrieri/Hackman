import SpielfeldLayout from "./SpielfeldLayout";
import GameField from "./Components/Gamefield";
import React, { useEffect } from "react";
import { useState } from "react";
import SpielFeldService from "./UtilityFunctions/SpielFeldService/SpielFeldService";
import Stats from "./Components/Stats";
import Emitter from "./service";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout());
  const [eatenCoins, setEatenCoins] = useState(0);
  const spielFeldService = SpielFeldService();

  return(
    <div className="App center">
      <GameField fields={spielfeld} spielFeldService={spielFeldService} onCoinEaten={() => setEatenCoins(eatenCoins + 1)}/>;
      <Stats remainingLives={3} eatenCoins={eatenCoins}/>
    </div>
  )
};

export default App;
