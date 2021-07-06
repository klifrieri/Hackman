import React from 'react';
import Coin from '../Components/Coin';
import Empty from '../Components/Empty';
import Hackman from '../Components/Hackman';
import Snack from '../Components/Snack';
import SpielfeldLayout from '../SpielfeldLayout';
import BewegungMoeglich from '../Types/BewegungMoeglich';
import Koordinate from '../Types/Koordinate';
import Richtung from '../Types/Richtung';
import {BehaviorSubject, Observable} from './../../node_modules/rxjs';
import CustomIntervalF from './Interval';


const SpielFeldService = ()=>{

    const spielFeldSubject :BehaviorSubject<React.FC<{}>[][]> = new BehaviorSubject(SpielfeldLayout());
    let positionHackman:Koordinate = new Koordinate(10,12);
    let bewegungsRichtungHackmanSubject= new BehaviorSubject(Richtung.Keine);
    const [intervalStart,intervalStop] = CustomIntervalF(() => move(bewegungsRichtungHackmanSubject.getValue(),intervallTriggerHackmanMove,positionHackman),250);

    const intervallTriggerHackmanMove = {
        bewegungMoeglich: BewegungMoeglich.Nein,
        set: function(value:BewegungMoeglich){
            this.bewegungMoeglich = value;
            if(this.bewegungMoeglich == BewegungMoeglich.Ja){
                intervalStart();
                // move(bewegungsRichtungHackman,positionHackman)
            }
            else if(this.bewegungMoeglich == BewegungMoeglich.Nein){
              intervalStop();
            }
        }
    };
    
    const setSpielfeldSubject = (spielfeld:React.FC<{}>[][])=>{
        spielFeldSubject.next(spielfeld);
    }
    const setBewegungsRichtungHackmanSubject = (richtung:Richtung)=>{
      bewegungsRichtungHackmanSubject.next(richtung);
    }
    // const setNum = (num:number)=>{
    //   nummer.next(num);
    // }


    function move(bewegungsRichtung:Richtung,intervallTrigger:{bewegungMoeglich: BewegungMoeglich;set: (value: BewegungMoeglich) => void;},position:Koordinate){
        let spielFeldCopy:React.FC<{}>[][] = spielFeldSubject.getValue().slice();
        switch (bewegungsRichtung) {
          case Richtung.Oben: {
              if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Portal){
                // props.emitter.emit('startAnimation', bewegungsRichtung);
                // if(checkCoins()){
                  //   props.emitter.emit("moveMouth");
                  // }
                  spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
                  spielFeldCopy[spielFeldCopy.length - 1][positionHackman.x] = Hackman;
                }
                else if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Ja) {
                  //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
                  //   if(checkCoins()){
                    //     props.emitter.emit("moveMouth");
                    //   }
                    
                    spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
                    spielFeldCopy[positionHackman.y - 1][positionHackman.x] = Hackman;
                    //   props.emitter.removeAllListeners('startAnimation');
                      positionHackman.y = positionHackman.y-1;
                  }
                  intervallTrigger.set(canMoveUp(position));
    
            break;
          }
          case Richtung.Links: {
            if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);   
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeldCopy[positionHackman.y][spielFeldCopy[0].length - 1] = Hackman;
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              //Emitter.removeAllListeners('startAnimation');
            }
    
            else if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Ja) {       
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);   
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              spielFeldCopy[positionHackman.y][positionHackman.x - 1] = Hackman;
              // props.emitter.removeAllListeners('startAnimation');
              positionHackman.x = positionHackman.x-1;
            }
            intervallTrigger.set(canMoveLeft(position));
            break;
          }
          case Richtung.Unten: {
            if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              spielFeldCopy[0][positionHackman.x] = Hackman;
            }
            else if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Ja) {
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              spielFeldCopy[positionHackman.y + 1][positionHackman.x] = Hackman;
            //   props.emitter.removeAllListeners('startAnimation');
              positionHackman.y = positionHackman.y+1;
            }
            intervallTrigger.set(canMoveDown(position));
            break;
          }
          case Richtung.Rechts: {
            if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              spielFeldCopy[positionHackman.y][0] = Hackman;
            }
            
            else if (intervallTrigger.bewegungMoeglich === BewegungMoeglich.Ja) {
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              spielFeldCopy[positionHackman.y][positionHackman.x] = Empty;
              spielFeldCopy[positionHackman.y][positionHackman.x + 1] = Hackman;
              
            //   props.emitter.removeAllListeners('startAnimation');
              positionHackman.x = positionHackman.x+1;
            }

            intervallTrigger.set(canMoveRight(position));
            break;
          }
        }
        setSpielfeldSubject(spielFeldCopy);
      };

const canMoveUp = (position:Koordinate) =>{
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y - 1] === undefined) return BewegungMoeglich.Portal;
    else if (spielFeld[position.y - 1][position.x] === Empty ||
      spielFeld[position.y - 1][position.x] === Coin ||
      spielFeld[position.y - 1][position.x] === Snack)
      return BewegungMoeglich.Ja;
    else return BewegungMoeglich.Nein;
  }

  const canMoveDown = (position:Koordinate) =>{
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y + 1] === undefined) return BewegungMoeglich.Portal;
    else if(spielFeld[position.y + 1][position.x] === Empty ||
      spielFeld[position.y + 1][position.x] === Coin ||
      spielFeld[position.y + 1][position.x] === Snack)
      return BewegungMoeglich.Ja;
    else return BewegungMoeglich.Nein;   
  }

  const canMoveLeft = (position:Koordinate) =>{
    const spielFeld = spielFeldSubject.getValue();
        if (spielFeld[position.y][position.x - 1] === undefined) return BewegungMoeglich.Portal;
        else if (spielFeld[position.y][position.x - 1] === Empty ||
          spielFeld[position.y][position.x - 1] === Coin ||
          spielFeld[position.y][position.x - 1] === Snack)
          return BewegungMoeglich.Ja;
        else return BewegungMoeglich.Nein;
  }

  const canMoveRight = (position:Koordinate) =>{
    const spielFeld = spielFeldSubject.getValue();
    if (spielFeld[position.y][position.x + 1] === undefined) return BewegungMoeglich.Portal;
    else if (spielFeld[position.y][position.x + 1] === Empty ||
      spielFeld[position.y][position.x + 1] === Coin ||
      spielFeld[position.y][position.x + 1] === Snack)
      return BewegungMoeglich.Ja;
    else return BewegungMoeglich.Nein;
  }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
          if (e.key.toLowerCase() === "w" || e.key === "ArrowUp"){
            setBewegungsRichtungHackmanSubject(Richtung.Oben);
            intervallTriggerHackmanMove.set(canMoveUp(positionHackman));
          }
          else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft"){
            setBewegungsRichtungHackmanSubject(Richtung.Links);
            intervallTriggerHackmanMove.set(canMoveLeft(positionHackman));
          }
          else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown"){
            setBewegungsRichtungHackmanSubject(Richtung.Unten);
            intervallTriggerHackmanMove.set(canMoveDown(positionHackman));
          }
          else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight"){
            setBewegungsRichtungHackmanSubject(Richtung.Rechts);
            intervallTriggerHackmanMove.set(canMoveRight(positionHackman));
          }
          else
          return;
        };

        return {
          spielFeldSubject,
          bewegungsRichtungHackmanSubject,
          handleKeyDown
        }
}

export default SpielFeldService;

  // const checkCoins = (): boolean => {
  //   switch(bewegungsRichtungHackman){
  //     case Richtung.Oben:{
  //       return (spielfeld[positionHackman.y - 1][positionHackman.x] === Coin || spielfeld[positionHackman.y - 1][positionHackman.x] === Snack)
  //     }
  //     case Richtung.Links: {
  //       return(spielfeld[positionHackman.y][positionHackman.x - 1] === Coin || spielfeld[positionHackman.y][positionHackman.x - 1] === Snack)
  //     }
  //     case Richtung.Unten:{
  //       return(spielfeld[positionHackman.y + 1][positionHackman.x] === Coin || spielfeld[positionHackman.y + 1][positionHackman.x] === Snack)
  //     }
  //     case Richtung.Rechts:{
  //       return(spielfeld[positionHackman.y][positionHackman.x + 1] === Coin || spielfeld[positionHackman.y][positionHackman.x + 1] === Snack)
  //     }
  //     default:
  //       return false;
  //   }
  // }
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