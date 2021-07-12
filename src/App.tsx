import SpielfeldLayout from "./SpielfeldLayout";
import GameField from "./Components/Gamefield";
import React from "react";
import { useState } from "react";
import SpielFeldService from "./UtilityFunctions/SpielFeldService/SpielFeldService";
import EventEmitter from "events";
import Stats from "./Components/Stats";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout());
  const [eatenCoins, setEatenCoins] = useState(0);
  const eventEmitter: EventEmitter = new EventEmitter();
  const spielFeldService = SpielFeldService(eventEmitter);

  eventEmitter.once("increaseEatenCoins", () => {
    setEatenCoins(eatenCoins + 1)
  })
  return(
    <div className="App center">
      <GameField fields={spielfeld} spielFeldService={spielFeldService}/>;
      <Stats remainingLives={3} eatenCoins={eatenCoins}/>
    </div>
  )
};

export default App;
