import React from 'react';
import Character from '../Classes/Character';
import GhostCharacter from '../Classes/GhostCharacter';
import Coin from '../Components/Coin';
import Empty from '../Components/Empty';
import Ghost from '../Components/Ghost';
import Hackman from '../Components/Hackman';
import Snack from '../Components/Snack';
import SpielfeldLayout from '../SpielfeldLayout';
import BewegungMoeglich from '../Types/BewegungMoeglich';
import Koordinate from '../Types/Koordinate';
import Richtung from '../Types/Richtung';
import {BehaviorSubject} from './../../node_modules/rxjs';
import CustomInterval from './CustomInterval';
import getRandomNumber from './GetRandomNumber';





const SpielFeldService = ()=>{
    const spielFeldSubject :BehaviorSubject<React.FC<{}>[][]> = new BehaviorSubject(SpielfeldLayout().slice());
    const setSpielfeldSubject = (spielfeld:React.FC<{}>[][])=>{
      spielFeldSubject.next(spielfeld);
    }
    const getSpielFeldValue = () => {
      return spielFeldSubject.getValue();
    }

    const hackman = new Character("Hackman",new Koordinate(10,12));
    const ghost1 = new GhostCharacter("Ghost1",new Koordinate(9,7));
    const ghost2 = new GhostCharacter("Ghost2",new Koordinate(11,7));
    const ghost3 = new GhostCharacter("Ghost2",new Koordinate(9,9));
    const ghost4 = new GhostCharacter("Ghost2",new Koordinate(11,9));
    const ghosts :GhostCharacter[]= [ghost1,ghost2,ghost3,ghost4];

    const [intervalStart,intervalStop] = CustomInterval(gameTick,2500);

    setTimeout(() => {ghost1.setShallTick = true},2500);
    setTimeout(() => {ghost2.setShallTick = true},5000);
    setTimeout(() => {ghost3.setShallTick = true},7500);
    setTimeout(() => {ghost4.setShallTick = true},10000);

    intervalStart();
     function gameTick(){
      let spielFeldCopy:React.FC<{}>[][] = getSpielFeldValue().slice();
      move(hackman,spielFeldCopy);
      ghosts.forEach( ghost => {
        setTimeout(function(){
          if(ghost.getShallTick){
            if(ghost.needsNewCountDeclaration() || ghost.getBewegungMoeglich === BewegungMoeglich.Nein){
              getRandomDirectionAndCount(ghost);
            }
            moveGhost(ghost,spielFeldCopy)
          }
        },250)

      });
      setSpielfeldSubject(spielFeldCopy);
    }

    function getRandomDirectionAndCount(ghost:GhostCharacter)
    {
      let max = 7,min =1;
      let tryBreakOutAfter:number = getRandomNumber(min,max);

      let _canMoveUp = {
        direction: Richtung.Oben,
        bewegungMoeglich: canMoveUp(ghost.getPosition)
      }
      let _canMoveDown = {
        direction: Richtung.Unten,
        bewegungMoeglich: canMoveDown(ghost.getPosition)
      }
      let _canMoveLeft = {
        direction: Richtung.Links,
        bewegungMoeglich: canMoveLeft(ghost.getPosition)
      }
      let _canMoveRight = {
        direction: Richtung.Rechts,
        bewegungMoeglich: canMoveRight(ghost.getPosition)
      }
      let _canMoveDirections: {direction: Richtung;bewegungMoeglich: BewegungMoeglich;}[] = new Array();

      if(_canMoveUp.bewegungMoeglich === BewegungMoeglich.Ja || _canMoveUp.bewegungMoeglich === BewegungMoeglich.Portal){
        _canMoveDirections.push(_canMoveUp);
      }
      if(_canMoveDown.bewegungMoeglich === BewegungMoeglich.Ja || _canMoveDown.bewegungMoeglich === BewegungMoeglich.Portal){
        _canMoveDirections.push(_canMoveDown);
      }
      if(_canMoveLeft.bewegungMoeglich === BewegungMoeglich.Ja || _canMoveLeft.bewegungMoeglich === BewegungMoeglich.Portal){
        _canMoveDirections.push(_canMoveLeft);
      }
      if(_canMoveRight.bewegungMoeglich === BewegungMoeglich.Ja || _canMoveRight.bewegungMoeglich === BewegungMoeglich.Portal){
        _canMoveDirections.push(_canMoveRight);
      }

      if(_canMoveDirections.length === 0){
        ghost.setBewegungsRichtung = Richtung.Keine;
        ghost.setBewegungMoeglich = BewegungMoeglich.Nein;
      }
      else if(_canMoveDirections.length === 1){
        ghost.setBewegungsRichtung = _canMoveDirections[0].direction;
        ghost.setBewegungMoeglich = _canMoveDirections[0].bewegungMoeglich;
      }
      else{
        let index = getRandomNumber(0,_canMoveDirections.length);
        ghost.setBewegungsRichtung = _canMoveDirections[index].direction;
        ghost.setBewegungMoeglich = _canMoveDirections[index].bewegungMoeglich;
      }
      ghost.setDeclaredCount = tryBreakOutAfter;
    }

    function moveGhost(ghost:GhostCharacter,spielFeldCopy:React.FC<{}>[][])
    {
      ghost.incrementCount();
      if(ghost.cachedField === Ghost){
        console.log();
      }
      // if(ghost.cachedField !== Ghost)
      spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
        switch (ghost.getBewegungsRichtung) {
          case Richtung.Oben: {
            if (ghost.getBewegungMoeglich === BewegungMoeglich.Portal){
                ghost.setCachedField = spielFeldCopy[spielFeldCopy.length - 1][ghost.getPosition.x]
                if(ghost.cachedField === Ghost){
                  console.log();
                }
                spielFeldCopy[spielFeldCopy.length - 1][ghost.getPosition.x] = Ghost;
                ghost.getPosition.y = spielFeldCopy.length - 1;
              }
            else if (ghost.getBewegungMoeglich === BewegungMoeglich.Ja) {
                ghost.setCachedField = spielFeldCopy[ghost.getPosition.y - 1][ghost.getPosition.x];
                if(ghost.cachedField === Ghost){
                  console.log();
                }
                spielFeldCopy[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost;
                ghost.getPosition.y = ghost.getPosition.y-1;
              }
              ghost.setBewegungMoeglich = canMoveUp(ghost.getPosition);
            break;
          }
          case Richtung.Links: {
            if (ghost.getBewegungMoeglich === BewegungMoeglich.Portal){
              ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][spielFeldCopy[0].length - 1]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[ghost.getPosition.y][spielFeldCopy[0].length - 1] = Ghost;
              ghost.getPosition.x = spielFeldCopy[0].length - 1;
            }
    
            else if (ghost.getBewegungMoeglich === BewegungMoeglich.Ja) {
              ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x - 1]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost;
              ghost.getPosition.x = ghost.getPosition.x-1;
            }
            ghost.setBewegungMoeglich = canMoveLeft(ghost.getPosition);
            break;
          }
          case Richtung.Unten: {
            if (ghost.getBewegungMoeglich === BewegungMoeglich.Portal){
              ghost.setCachedField = spielFeldCopy[0][ghost.getPosition.x]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[0][ghost.getPosition.x] = Ghost;
              ghost.getPosition.y = 0;
            }
            else if (ghost.getBewegungMoeglich === BewegungMoeglich.Ja) {
              ghost.setCachedField = spielFeldCopy[ghost.getPosition.y + 1][ghost.getPosition.x]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost;
              ghost.getPosition.y = ghost.getPosition.y+1;
            }
            ghost.setBewegungMoeglich = canMoveDown(ghost.getPosition);
            break;
          }
          case Richtung.Rechts: {
            if (ghost.getBewegungMoeglich === BewegungMoeglich.Portal){
              ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][0]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[ghost.getPosition.y][0] = Ghost;
              ghost.getPosition.x = 0;
            }
            
            else if (ghost.getBewegungMoeglich === BewegungMoeglich.Ja) {
              ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x + 1]
              if(ghost.cachedField === Ghost){
                console.log();
              }
              spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost;
              ghost.getPosition.x = ghost.getPosition.x+1;
            }

            ghost.setBewegungMoeglich = canMoveRight(ghost.getPosition);
            break;
          }
        }
        return spielFeldCopy;
    }

    function move(hackman:Character,spielFeldCopy:React.FC<{}>[][]){
        
        switch (hackman.getBewegungsRichtung) {
          case Richtung.Oben: {
            if (hackman.getBewegungMoeglich === BewegungMoeglich.Portal){
                spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
                spielFeldCopy[spielFeldCopy.length - 1][hackman.getPosition.x] = Hackman;
              }
            else if (hackman.getBewegungMoeglich === BewegungMoeglich.Ja) {
                spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
                spielFeldCopy[hackman.getPosition.y - 1][hackman.getPosition.x] = Hackman;
                hackman.setPositionY = hackman.getPosition.y-1;
              }
              hackman.setBewegungMoeglich = canMoveUp(hackman.getPosition);
            break;
          }
          case Richtung.Links: {
            if (hackman.getBewegungMoeglich === BewegungMoeglich.Portal){
              spielFeldCopy[hackman.getPosition.y][spielFeldCopy[0].length - 1] = Hackman;
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
            }
    
            else if (hackman.getBewegungMoeglich === BewegungMoeglich.Ja) {
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x - 1] = Hackman;
              hackman.setPositionX = hackman.getPosition.x-1;
            }
            hackman.setBewegungMoeglich = canMoveLeft(hackman.getPosition);
            break;
          }
          case Richtung.Unten: {
            if (hackman.getBewegungMoeglich === BewegungMoeglich.Portal){
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
              spielFeldCopy[0][hackman.getPosition.x] = Hackman;
            }
            else if (hackman.getBewegungMoeglich === BewegungMoeglich.Ja) {
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
              spielFeldCopy[hackman.getPosition.y + 1][hackman.getPosition.x] = Hackman;
              hackman.setPositionY = hackman.getPosition.y+1;
            }
            hackman.setBewegungMoeglich = canMoveDown(hackman.getPosition);
            break;
          }
          case Richtung.Rechts: {
            if (hackman.getBewegungMoeglich === BewegungMoeglich.Portal){
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
              spielFeldCopy[hackman.getPosition.y][0] = Hackman;
            }
            
            else if (hackman.getBewegungMoeglich === BewegungMoeglich.Ja) {
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
              spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x + 1] = Hackman;
              hackman.setPositionX = hackman.getPosition.x+1;
            }

            hackman.setBewegungMoeglich = canMoveRight(hackman.getPosition);
            break;
          }
        }
        return spielFeldCopy;
      };
// const checkCoins = (): boolean => {
//   let spielFeldCopy:React.FC<{}>[][] = spielFeldSubject.getValue().slice();
//   switch(bewegungsRichtungHackmanSubject.getValue()){
//     case Richtung.Oben:{
//       return (spielFeldCopy[positionHackman.y - 1][positionHackman.x] === Coin || spielFeldCopy[positionHackman.y - 1][positionHackman.x] === Snack)
//     }
//     case Richtung.Links: {
//       return(spielFeldCopy[positionHackman.y][positionHackman.x - 1] === Coin || spielFeldCopy[positionHackman.y][positionHackman.x - 1] === Snack)
//     }
//     case Richtung.Unten:{
//       return(spielFeldCopy[positionHackman.y + 1][positionHackman.x] === Coin || spielFeldCopy[positionHackman.y + 1][positionHackman.x] === Snack)
//     }
//     case Richtung.Rechts:{
//       return(spielFeldCopy[positionHackman.y][positionHackman.x + 1] === Coin || spielFeldCopy[positionHackman.y][positionHackman.x + 1] === Snack)
//     }
//     default:
//       return false;
//   }
// }
function canMoveUp(position:Koordinate){
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y - 1] === undefined) return BewegungMoeglich.Portal;
    else if (spielFeld[position.y - 1][position.x] === Empty ||
      spielFeld[position.y - 1][position.x] === Coin ||
      spielFeld[position.y - 1][position.x] === Snack)
      return BewegungMoeglich.Ja;
      else if (spielFeld[position.y - 1][position.x] === Empty) return BewegungMoeglich.Nein;
    else return BewegungMoeglich.Nein;
  }

  function canMoveDown(position:Koordinate){
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y + 1] === undefined) return BewegungMoeglich.Portal;
    else if(spielFeld[position.y + 1][position.x] === Empty ||
      spielFeld[position.y + 1][position.x] === Coin ||
      spielFeld[position.y + 1][position.x] === Snack)
      return BewegungMoeglich.Ja;
      else if (spielFeld[position.y + 1][position.x] === Empty)return BewegungMoeglich.Nein;
    else return BewegungMoeglich.Nein;   
  }

  function canMoveLeft(position:Koordinate){
    const spielFeld = spielFeldSubject.getValue();
        if (spielFeld[position.y][position.x - 1] === undefined) return BewegungMoeglich.Portal;
        else if (spielFeld[position.y][position.x - 1] === Empty ||
          spielFeld[position.y][position.x - 1] === Coin ||
          spielFeld[position.y][position.x - 1] === Snack)
          return BewegungMoeglich.Ja;
          else if (spielFeld[position.y][position.x - 1] === Empty)  return BewegungMoeglich.Nein;
        else return BewegungMoeglich.Nein;
  }

  function canMoveRight(position:Koordinate){
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y][position.x + 1] === undefined) return BewegungMoeglich.Portal;
    else if (spielFeld[position.y][position.x + 1] === Empty ||
      spielFeld[position.y][position.x + 1] === Coin ||
      spielFeld[position.y][position.x + 1] === Snack)
      return BewegungMoeglich.Ja;
    else if(spielFeld[position.y][position.x + 1] === Ghost) return BewegungMoeglich.Nein;
    else return BewegungMoeglich.Nein;
  }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
          if (e.key.toLowerCase() === "w" || e.key === "ArrowUp"){
            hackman.setBewegungsRichtung = Richtung.Oben;
            hackman.setBewegungMoeglich = canMoveUp(hackman.getPosition);
          }
          else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft"){
            hackman.setBewegungsRichtung = Richtung.Links;
            hackman.setBewegungMoeglich = canMoveLeft(hackman.getPosition);
          }
          else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown"){
            hackman.setBewegungsRichtung = Richtung.Unten;
            hackman.setBewegungMoeglich = canMoveDown(hackman.getPosition);
          }
          else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight"){
            hackman.setBewegungsRichtung = Richtung.Rechts;
            hackman.setBewegungMoeglich = canMoveRight(hackman.getPosition);
          }
          else
          return;
        };

        return {
          spielFeldSubject,
          bewegungsRichtungSubject : hackman.getBewegungsRichtungSubject,
          handleKeyDown
        }
}

export default SpielFeldService;


// const canMove = (): BewegungMoeglich => {
//   switch(bewegungsRichtungHackman){
//     case Richtung.Oben:{
//       return canMoveUp();
//       }
//     case Richtung.Links: {
//       return canMoveLeft();
//     }
//     case Richtung.Unten:{
//       return canMoveDown();
//     }
//     case Richtung.Rechts:{
//       return canMoveRight();
//     }
//     default:
//       return BewegungMoeglich.Nein;
//   }
// }