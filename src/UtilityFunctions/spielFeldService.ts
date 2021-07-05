import React from 'react';
import Coin from '../Components/Coin';
import Empty from '../Components/Empty';
import Hackman from '../Components/Hackman';
import Snack from '../Components/Snack';
import SpielfeldLayout from '../SpielfeldLayout';
import BewegungMoeglich from '../Types/BewegungMoeglich';
import Koordinate from '../Types/Koordinate';
import Richtung from '../Types/Richtung';
import {BehaviorSubject} from './../../node_modules/rxjs';
import CustomIntervalF from './Interval';


const SpielFeldService = ()=>{

    const spielFeldSubject :BehaviorSubject<React.FC<{}>[][]> = new BehaviorSubject(SpielfeldLayout());
    let positionHackman:Koordinate = new Koordinate(10,12);
    let bewegungsRichtungHackman:Richtung = Richtung.Keine;

    const [intervalStart,intervalStop] = CustomIntervalF(() => move(bewegungsRichtungHackman,positionHackman),250);

    const intervallTrigger = {
        trigger: BewegungMoeglich.Nein,
        set: function(value:BewegungMoeglich){
            this.trigger = value;
            if(this.trigger == BewegungMoeglich.Ja){
                intervalStart();
            }
        }
    };
    
    const setSpielfeld = (spielfeld:React.FC<{}>[][])=>{
        spielFeldSubject.next(spielfeld);
    }


    function move(bewegungsRichtung:Richtung,position:Koordinate){
        let bewegungMoeglich:BewegungMoeglich;
        let spielFeld:React.FC<{}>[][] = spielFeldSubject.getValue();
        let newCoordinates:Koordinate = new Koordinate(0,0);
        switch (bewegungsRichtung) {
          case Richtung.Oben: {
            // // setBewegungHackmanMoeglich(canMoveUp());
            bewegungMoeglich = canMoveUp(position);
            // if(bewegungHackmanMoeglich.bewegungMoeglich === BewegungMoeglich.Nein){
            //   // intervalstop();
            // }
            if (bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[spielFeld.length - 1][positionHackman.x] = Hackman;
            }
            else if (bewegungMoeglich === BewegungMoeglich.Ja) {
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              newCoordinates = new Koordinate(positionHackman.x,positionHackman.y-1);
              
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[positionHackman.y - 1][positionHackman.x] = Hackman;
            //   props.emitter.removeAllListeners('startAnimation');
            //   positionHackman.y = positionHackman.y-1;
            }
    
            break;
          }
          case Richtung.Links: {
            // setBewegungHackmanMoeglich(canMoveLeft());
            bewegungMoeglich = canMoveLeft(position);
            // if(moeglich === BewegungMoeglich.Nein){
            //   // intervalstop();
            // }
            if (bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);   
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeld[positionHackman.y][spielFeld[0].length - 1] = Hackman;
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              //Emitter.removeAllListeners('startAnimation');
            }
    
            else if (bewegungMoeglich === BewegungMoeglich.Ja) {       
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);   
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              newCoordinates = new Koordinate(positionHackman.x-1,positionHackman.y);
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[positionHackman.y][positionHackman.x - 1] = Hackman;
              // props.emitter.removeAllListeners('startAnimation');
            //   positionHackman.x = positionHackman.x-1;
            }
    
            break;
          }
          case Richtung.Unten: {
            // setBewegungHackmanMoeglich(canMoveDown());
            bewegungMoeglich = canMoveDown(position);
            // if(moeglich === BewegungMoeglich.Nein){
            //   // intervalstop();
            // }
            if (bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[0][positionHackman.x] = Hackman;
            }
            else if (bewegungMoeglich === BewegungMoeglich.Ja) {
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              newCoordinates = new Koordinate(positionHackman.x,positionHackman.y+1);
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[positionHackman.y + 1][positionHackman.x] = Hackman;
            //   props.emitter.removeAllListeners('startAnimation');
            //   positionHackman.y = positionHackman.y+1;
            }
    
            break;
          }
          case Richtung.Rechts: {
            // // setBewegungHackmanMoeglich(canMoveRight());
            bewegungMoeglich = canMoveRight(position);
            // if(moeglich === BewegungMoeglich.Nein){
            //   // intervalstop();
            // }
            if (bewegungMoeglich === BewegungMoeglich.Portal){
              // props.emitter.emit('startAnimation', bewegungsRichtung);
              // if(checkCoins()){
              //   props.emitter.emit("moveMouth");
              // }
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[positionHackman.y][0] = Hackman;
            }
            
            else if (bewegungMoeglich === BewegungMoeglich.Ja) {
            //   props.emitter.emit('startAnimation', bewegungsRichtungHackman);
            //   if(checkCoins()){
            //     props.emitter.emit("moveMouth");
            //   }
              newCoordinates = new Koordinate(positionHackman.x+1,positionHackman.y);
              spielFeld[positionHackman.y][positionHackman.x] = Empty;
              spielFeld[positionHackman.y][positionHackman.x + 1] = Hackman;
              
            //   props.emitter.removeAllListeners('startAnimation');
            //   positionHackman.x = positionHackman.x+1;
            }
    
            break;
          }
        }
        // if(bewegungHackmanMoeglich!== bewegungMoeglich){
        //   setBewegungHackmanMoeglich(bewegungMoeglich);
        //   // bewegungHackmanMoeglich = moeglich;
        // }
        positionHackman = newCoordinates;
        setSpielfeld(spielFeld);
    
        // logFeld();
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
    let test = spielFeld[position.y + 1][position.x];
    if (spielFeld[position.y + 1] === undefined)
    { 
      return BewegungMoeglich.Portal;
    }
    else if(spielFeld[position.y + 1][position.x] === Empty ||
      spielFeld[position.y + 1][position.x] === Coin ||
      spielFeld[position.y + 1][position.x] === Snack)
      {
      return BewegungMoeglich.Ja;
    }
    else
     { 
       return BewegungMoeglich.Nein;
    }
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
        // let coordinates = getCoordinates("Hackman");
          if (e.key.toLowerCase() === "w" || e.key === "ArrowUp"){
            bewegungsRichtungHackman = Richtung.Oben;
            // setBewegungsRichtungHackman(Richtung.Oben);
            // setBewegungHackmanMoeglich(canMoveUp());
            intervallTrigger.set(canMoveUp(positionHackman));
          }
          else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft"){
            bewegungsRichtungHackman = Richtung.Oben;
            // setBewegungsRichtungHackman(Richtung.Links);
            // setBewegungHackmanMoeglich(canMoveLeft());
            intervallTrigger.set(canMoveLeft(positionHackman));
          }
          else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown"){
            bewegungsRichtungHackman = Richtung.Oben;
            // setBewegungsRichtungHackman(Richtung.Unten);
            // setBewegungHackmanMoeglich(canMoveDown());
            intervallTrigger.set(canMoveDown(positionHackman));
          }
          else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight"){
            bewegungsRichtungHackman = Richtung.Oben;
            // setBewegungsRichtungHackman(Richtung.Rechts);
            // setBewegungHackmanMoeglich(canMoveRight()); 
            intervallTrigger.set(canMoveRight(positionHackman));
          }
          else
          return;
        };

        const arr:[BehaviorSubject<React.FC<{}>[][]>,(e: React.KeyboardEvent) => void] = [spielFeldSubject,handleKeyDown];
        return arr;
}

export default SpielFeldService;