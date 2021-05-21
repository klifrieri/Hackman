import SpielfeldLayout from './SpielfeldLayout';
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";
import Coin from './Components/Coin';
import Empy from './Components/Empty';
import React from 'react';
import { useEffect, useState, KeyboardEvent, useRef } from "react";

const App: React.FC = () => {
  
  const [spielfeld, setSpielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout);
  const [position, setPosition] = useState(getPosition);
  const [bewegungsRichtung, setBewegungsRichtung] = useState<string>();

  
  // Findet die Postition von Hackman heraus
  function getPosition():[number, number] {
    let getPosition: [number, number] = [0, 0];
    for (let i = 0; i < spielfeld.length; i++) {
      for (let y = 0; y < spielfeld[i].length; y++) {
        if (spielfeld[i][y] === Hack) {
          getPosition = [i, y];
        }
      }
    }
    return getPosition;
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "w" || e.key === "W") setBewegungsRichtung( e.key);
    else if (e.key === "a" || e.key === "A") setBewegungsRichtung( e.key);
    else if (e.key === "s" || e.key === "S") setBewegungsRichtung( e.key);
    else if (e.key === "d" || e.key === "D") setBewegungsRichtung( e.key);
    else console.log(e.key + " ist ungültig");
  }
  
  useEffect( () => {
    setInterval( () => {
      let spielfeldCopy: React.FC<{}>[][] = spielfeld;
      console.log(spielfeld);

      if (bewegungsRichtung === "a" || bewegungsRichtung === "A") {
  
        if (spielfeld[position[0]][position[1] - 1] === Coin || spielfeld[position[0]][position[1] - 1] === Empy) {
  
          spielfeldCopy[position[0]][position[1] - 1] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);

          console.log(spielfeld);
        }
        else if (spielfeld[position[0]][position[1] - 1] === undefined){
          spielfeldCopy[position[0]][spielfeld[0].length - 1] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);
        }
      } 
  
      else if (bewegungsRichtung === "w" || bewegungsRichtung === "W") {
  
        if (spielfeld[position[0] - 1][position[1]] === Coin || spielfeld[position[0] - 1][position[1]] === Empy) {
  
          spielfeldCopy[position[0] - 1][position[1]] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);

          console.log(spielfeld);
        }
        else if (spielfeld[position[0] - 1][position[1]] === undefined) {
          spielfeldCopy[spielfeld.length - 1][position[1]] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);
        }
      } 
  
      else if (bewegungsRichtung === "d" || bewegungsRichtung === "D") {
  
        if (spielfeld[position[0]][position[1] + 1] === Coin || spielfeld[position[0]][position[1] + 1] === Empy) {
  
          spielfeldCopy[position[0]][position[1] + 1] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);

          console.log(spielfeld);
        }
        else if (spielfeld[position[0]][position[1] + 1] === undefined) {
          spielfeldCopy[position[0]][0] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);
        }
      } 
  
      else if (bewegungsRichtung === "s" || bewegungsRichtung === "S") {
  
        if (spielfeld[position[0] + 1][position[1]] === Coin || spielfeld[position[0] + 1][position[1]] === Empy) {
  
          spielfeldCopy[position[0] + 1][position[1]] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);

          console.log(spielfeld);
        }
        else if (spielfeld[position[0] + 1][position[1]] === undefined) {
          spielfeldCopy[0][position[1]] = Hack;
          spielfeldCopy[position[0]][position[1]] = Empy;
          setSpielfeld(spielfeldCopy);
          setPosition(getPosition);
        }
      }
    }, 1000);
  });

  return <Spielfeld fields={spielfeld} handleSpielfeldKeyDown={handleKeyDown} />;
};

export default App;
