import SpielfeldLayout from './SpielfeldLayout';
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";
import Coin from './Components/Coin';
import Empy from './Components/Empty';
import React from 'react';
import { useEffect, useState, KeyboardEvent, useRef } from "react";

const App: React.FC = () => {

  const [spielfeld, setSpielfeld] = useState(SpielfeldLayout);
  const [position, setPosition] = useState(getPosition);
  let points: number = 0;
  
  
  // Findet die Postition von Hackman heraus
  function getPosition(){
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

  const checkElementPosition = (position:[number, number]):string => {

    

    return "";
  }
  
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    let spielfeldCopy: React.FC<{}>[][] = spielfeld;
    setPosition(getPosition);
    console.log(position);
    if (e.key === "a" || e.key === "A") {
      console.log(e.key);

      if (spielfeldCopy[position[0]][position[1] - 1] === Coin) {

        spielfeldCopy[position[0]][position[1] - 1] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);

        points += 1;
        console.log("MoveLeft", points, spielfeld);
      } 
      else if(spielfeld[position[0]][position[1] - 1] === Empy){
        spielfeldCopy[position[0]][position[1] - 1] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);
      }
      else {
        console.log(spielfeldCopy[position[0]][position[1] - 1]);
      }
    } 

    else if (e.key === "w" || e.key === "W") {
      console.log(e.key);

      if (spielfeld[position[0] - 1][position[1]] === Coin) {

        spielfeldCopy[position[0] - 1][position[1]] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);

        points += 1;
        console.log("MoveUp", points, spielfeld);
      } 
      else if(spielfeld[position[0] - 1][position[1]] === Empy){
        spielfeldCopy[position[0] - 1][position[1]] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);
      }
      else {
        console.log(spielfeld[position[0] - 1][position[1]]);
      }
    } 

    else if (e.key === "d" || e.key === "D") {
      console.log(e.key);

      if (spielfeld[position[0]][position[1] + 1] === Coin) {

        spielfeldCopy[position[0]][position[1] + 1] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);

        points += 1;
        console.log("MoveRight", points, spielfeld);
      } 
      else if(spielfeld[position[0]][position[1] + 1] === Empy){
        spielfeldCopy[position[0]][position[1] + 1] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);
      }
      else {
        console.log(spielfeld[position[0]][position[1] + 1]);
      }
    } 

    else if (e.key === "s" || e.key === "S") {
      console.log(e.key);

      if (spielfeld[position[0] + 1][position[1]] === Coin) {

        spielfeldCopy[position[0] + 1][position[1]] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);

        points += 1;
        console.log("MoveDown", points, spielfeld);
      } 
      else if(spielfeld[position[0] + 1][position[1]] === Empy){
        spielfeldCopy[position[0] + 1][position[1]] = Hack;
        spielfeldCopy[position[0]][position[1]] = Empy;
        setSpielfeld(spielfeldCopy);
      }
      else {
        console.log(spielfeld[position[0] + 1][position[1]]);
      }
    }

  }

  return <Spielfeld fields={spielfeld} handleSpielfeldKeyDown={handleKeyDown} />;
};


export default App;




// // Bewegt Hackman
// document.addEventListener("keydown", (event) => {
    
//   if (event.code === moveLeft) {
//     if (fields[position[0]][position[1] - 1] === (Coin || Empy)) {
//       fields[position[0]][position[1] - 1] = Hack;
//       fields[position[0]][position[1]] = Empy;
//       points += 1;
//       console.log("MoveLeft", points);
//       return;
//     }
//   }
//   else if(event.code === moveRight){
//     if (fields[position[0]][position[1] + 1] === (Coin || Empy)) {
//       fields[position[0]][position[1] + 1] = Hack;
//       fields[position[0]][position[1]] = Empy;
//       points += 1;
//       console.log("MoveRight", points);
//       return;
//     }
//   }
//   else if(event.code === moveUp){
//     if (fields[position[0] - 1][position[1]] === (Coin || Empy)) {
//       fields[position[0] - 1][position[1]] = Hack;
//       fields[position[0]][position[1]] = Empy;
//       points += 1;
//       console.log("MoveUp", points);
//       return;
//     }
//   }
//   else if(event.code === moveDown){
//     if (fields[position[0] + 1][position[1]] === (Coin || Empy)) {
//       fields[position[0] + 1][position[1]] = Hack;
//       fields[position[0]][position[1]] = Empy;
//       points += 1;
//       console.log("Movedown", points);
//       return;
//     }
//   }
//   if(points > 50 ){
//     gameRunning = false;
//     return;
//   }  
// })