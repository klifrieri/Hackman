import SpielfeldLayout from "./SpielfeldLayout";
import Spielfeld from "./Components/Gamefield";
import React from "react";
import { useState } from "react";
import SpielFeldService from "./UtilityFunctions/spielFeldService";

const App: React.FC = () => {
  const [spielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout());
  const spielFeldService = SpielFeldService();
  return <Spielfeld fields={spielfeld} spielFeldService={spielFeldService}/>;
};

export default App;
