import Spielfeld from "./Components/Spielfeld";
import SpielfeldLayout from './SpielfeldLayout';
import React from 'react';
import { useEffect, useState, KeyboardEvent, useRef } from "react";

const App: React.FC = () => {

  const [spielfeld, setSpielfeld] = useState(SpielfeldLayout);

  return <Spielfeld fields={spielfeld} />;
};

export default App;
