import SpielfeldLayout from "./SpielfeldLayout";
import Spielfeld from "./Components/Gamefield";
import React from "react";
import { useState } from "react";
import { EventEmitter } from "events";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout);
  const eventEmitter: EventEmitter = new EventEmitter();

  return <Spielfeld fields={spielfeld} emitter={eventEmitter}/>;
};

export default App;
