import Spielfeld from "./Components/Spielfeld";
import SpielfeldLayout from './SpielfeldLayout';
import React from 'react';
import { useEffect, useState, KeyboardEvent, useRef } from "react";

const App: React.FC = () => {

  const [spielfeld, setSpielfeld] = useState(SpielfeldLayout);

  return <Spielfeld fields={spielfeld} />;
};

export default App;



// // Findet die Postition von Hackman heraus
// let position: [number, number];
// for (let i = 0; i < fields.length; i++) {
//   for (let y = 0; y < fields[i].length; y++) {
//     if (fields[i][y] === Hack) {
//       position = [i, y];
//     }
//   }
// }

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