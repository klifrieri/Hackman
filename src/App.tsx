import SpielfeldLayout from "./SpielfeldLayout";
import Spielfeld from "./Components/Gamefield";
import React from "react";
import { useState } from "react";
import { EventEmitter } from "events";

const App: React.FC = () => {
  const eventEmitter: EventEmitter = new EventEmitter();
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout(eventEmitter));

  return <Spielfeld fields={spielfeld} emitter={eventEmitter}/>;
};

export default App;
