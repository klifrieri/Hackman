import SpielfeldLayout from "./SpielfeldLayout";
import Spielfeld from "./Components/Gamefield";
import React from "react";
import { useState } from "react";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout);

  return <Spielfeld fields={spielfeld} />;
};

export default App;
