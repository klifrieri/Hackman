import SpielfeldLayout from "./SpielfeldLayout";
import Spielfeld from "./Components/Gamefield";
import React from "react";
import { useState } from "react";
import { EventEmitter } from "events";
import Stats from "./Components/Stats";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout);
  const [eatenCoins, setEatenCoins] = useState(0);
  const eventEmitter: EventEmitter = new EventEmitter();

  return(
    <div className="App center">
      <Spielfeld fields={spielfeld} emitter={eventEmitter} onCoinEaten={() => setEatenCoins(eatenCoins + 1)}/>;
      <Stats remainingLives={3} eatenCoins={eatenCoins}/>
    </div>
  )
};

export default App;
