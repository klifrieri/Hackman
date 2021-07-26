// import React from 'react';
// import Character from '../../Classes/Character';
// import GhostCharacter from '../../Classes/GhostCharacter';
// import SpielfeldLayout from '../../SpielfeldLayout';
// import Moveable from '../../Types/Moveable';
// import Coordinate from '../../Types/Coordinate';
// import Direction from '../../Types/Direction';
// import {BehaviorSubject, Subject} from 'rxjs';
// import CustomInterval from '../CustomInterval';
// import {moveHackman} from './MoveHackman';
// import { canMove, canMoveDown, canMoveLeft, canMoveRight, canMoveUp, getPossibleDirections } from './CanMove';
// import { moveGhost } from './MoveGhost';
// import { setRandomDirectionAndCount } from '../GetRandomNumber';
// import Emitter from '../../service';




// const SpielFeldService = ()=>{
//   const spielFeldSubject :BehaviorSubject<React.FC<{}>[][]> = new BehaviorSubject(SpielfeldLayout().slice());
//   let eatenCoinsSubject :BehaviorSubject<number> = new BehaviorSubject<number>(1);
//   const setSubjects = ()=>{
//     let result = gameTick();
//     spielFeldSubject.next(result.spielFeldCopy.slice());
//     if(result.increaseCoins){
//         setEatenCoinsSubject(1);
//     }

//   }
//   const getSpielFeldValue = () => {
//     return spielFeldSubject.getValue();
//   }
//   const setEatenCoinsSubject = (value:number)=>{
//     eatenCoinsSubject.next(1);
//   }
//   const hackman = new Character("Hackman",12,10);
//   const ghost1 = new GhostCharacter("Ghost1",7,9);
//   const ghost2 = new GhostCharacter("Ghost2",7,11);
//   const ghost3 = new GhostCharacter("Ghost2",9,9);
//   const ghost4 = new GhostCharacter("Ghost2",9,11);
//   const ghosts :GhostCharacter[]= [ghost1,ghost2,ghost3,ghost4];

//   const [intervalStart,intervalStop] = CustomInterval(setSubjects,5000);

//   setTimeout(() => {ghost1.setShallTick = true},2500);
//   setTimeout(() => {ghost2.setShallTick = true},5000);
//   setTimeout(() => {ghost3.setShallTick = true},7500);
//   setTimeout(() => {ghost4.setShallTick = true},10000);

//   intervalStart();
//     function gameTick() :{spielFeldCopy:React.FC<{}>[][],increaseCoins:boolean}{
//     let spielFeldCopy:React.FC<{}>[][] = getSpielFeldValue().slice();
//     hackman.setBewegungMoeglich = canMove(hackman.getBewegungsRichtung,spielFeldCopy,hackman.getPosition);
//     let result = moveHackman(hackman,spielFeldCopy);
//     ghosts.forEach( ghost => {
//         if(ghost.getShallTick){
//           if(ghost.needsNewCountDeclaration() || ghost.getBewegungMoeglich === Moveable.No){
//             const canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[] = getPossibleDirections(result.gameField,ghost.getPosition);
//             ghost = setRandomDirectionAndCount(ghost,canMoveDirections);
//           }
//           else{
//             ghost.setBewegungMoeglich = canMove(ghost.getBewegungsRichtung,result.gameField,ghost.getPosition);
//           }
//           result.gameField = moveGhost(ghost,result.gameField);
//         }
//     });
//   return result;
// }





// // const checkCoins = (): boolean => {
// //   let spielFeldCopy:React.FC<{}>[][] = spielFeldSubject.getValue().slice();
// //   switch(bewegungsRichtungHackmanSubject.getValue()){
// //     case Richtung.Oben:{
// //       return (spielFeldCopy[positionHackman.y - 1][positionHackman.x] === Coin || spielFeldCopy[positionHackman.y - 1][positionHackman.x] === Snack)
// //     }
// //     case Richtung.Links: {
// //       return(spielFeldCopy[positionHackman.y][positionHackman.x - 1] === Coin || spielFeldCopy[positionHackman.y][positionHackman.x - 1] === Snack)
// //     }
// //     case Richtung.Unten:{
// //       return(spielFeldCopy[positionHackman.y + 1][positionHackman.x] === Coin || spielFeldCopy[positionHackman.y + 1][positionHackman.x] === Snack)
// //     }
// //     case Richtung.Rechts:{
// //       return(spielFeldCopy[positionHackman.y][positionHackman.x + 1] === Coin || spielFeldCopy[positionHackman.y][positionHackman.x + 1] === Snack)
// //     }
// //     default:
// //       return false;
// //   }
// // }


//   const handleKeyDown = (e: React.KeyboardEvent): void => {
//   const spielFeld = spielFeldSubject.getValue();
//     if (e.key.toLowerCase() === "w" || e.key === "ArrowUp"){
//       hackman.setBewegungsRichtung = Direction.Up;
//       hackman.setBewegungMoeglich = canMoveUp(spielFeld,hackman.getPosition);
//     }
//     else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft"){
//       hackman.setBewegungsRichtung = Direction.Left;
//       hackman.setBewegungMoeglich = canMoveLeft(spielFeld,hackman.getPosition);
//     }
//     else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown"){
//       hackman.setBewegungsRichtung = Direction.Down;
//       hackman.setBewegungMoeglich = canMoveDown(spielFeld,hackman.getPosition);
//     }
//     else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight"){
//       hackman.setBewegungsRichtung = Direction.Right;
//       hackman.setBewegungMoeglich = canMoveRight(spielFeld,hackman.getPosition);
//     }
//     else
//     return;
//   };


//   return {
//     spielFeldSubject,
//     bewegungsRichtungSubject : hackman.getBewegungsRichtungSubject,
//     handleKeyDown,
//     eatenCoinsSubject
//   }
// }

// export default SpielFeldService;
export const hi=1;