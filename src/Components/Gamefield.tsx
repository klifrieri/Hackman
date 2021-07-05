import BewegungMoeglich from "../Types/BewegungMoeglich";
import Coin from "./Coin";
import Empty from "./Empty";
import Hackman from "./Hackman";
import Wall from "./Wall";
import VerticalWall from "./VerticalWalls/VerticalWall";
import VerticalWallTS from "./VerticalWalls/VerticalWallTopShort";
import VerticalWallBS from "./VerticalWalls/VerticalWallBottomShort";
import HorizontalWall from "./HorizontalWalls/HorizontalWall";
import HorizontalWallRS from "./HorizontalWalls/HorizontalWallRightSideShort";
import HorizontalWallLS from "./HorizontalWalls/HorizontalWallLeftSideShort";
import TPieceBottom from "./TPieces/TPieceBottom";
import TPieceTop from "./TPieces/TPieceTop";
import TPieceRight from "./TPieces/TPieceRight";
import TPieceLeft from "./TPieces/TPieceLeft";
import CornerLT from "./Corners/CornerLeftTop";
import CornerLB from "./Corners/CornerLeftBottom";
import CornerRT from "./Corners/CornerRightTop";
import CornerRB from "./Corners/CornerRightBottom";
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import Koordinate from "../Types/Koordinate";
import Richtung from "../Types/Richtung";
import Snack from "./Snack";
import Ghost from "./Ghost";
import Gate from "./Gate";
import EventEmitter from "events";
import CustomInterval from "./../UtilityFunctions/Interval";
import SpielfeldLayout from "../SpielfeldLayout";
import {BehaviorSubject} from './../../node_modules/rxjs'

interface ISpielfeldProps {
  // fields: React.FC[][];
  emitter: EventEmitter;
  service: ()=>[BehaviorSubject<React.FC<{}>[][]>, (e: React.KeyboardEvent) => void]
}

const Spielfeld: React.FC<ISpielfeldProps> = (props) => {
  const renderComponent = (component: React.FC<any>, key: number) => {
    if (component === Wall) return <Wall key={key} />;
    else if (component === HorizontalWall) return <HorizontalWall key={key} />;
    else if (component === HorizontalWallLS)
      return <HorizontalWallLS key={key} />;
    else if (component === HorizontalWallRS)
      return <HorizontalWallRS key={key} />;
    else if (component === VerticalWall) return <VerticalWall key={key} />;
    else if (component === VerticalWallBS) return <VerticalWallBS key={key} />;
    else if (component === VerticalWallTS) return <VerticalWallTS key={key} />;
    else if (component === TPieceBottom) return <TPieceBottom key={key} />;
    else if (component === TPieceTop) return <TPieceTop key={key} />;
    else if (component === TPieceRight) return <TPieceRight key={key} />;
    else if (component === TPieceLeft) return <TPieceLeft key={key} />;
    else if (component === CornerLT) return <CornerLT key={key} />;
    else if (component === CornerLB) return <CornerLB key={key} />;
    else if (component === CornerRT) return <CornerRT key={key} />;
    else if (component === CornerRB) return <CornerRB key={key} />;
    else if (component === Coin) return <Coin key={key} />;
    else if (component === Hackman)
      return <Hackman key={key} richtung={bewegungsRichtungHackman} emitter={props.emitter}/>;
    else if (component === Ghost)
     return <Ghost key={key} richtung={bewegungsRichtungGhost} emitter={props.emitter}/>;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };

  require('events').EventEmitter.defaultMaxListeners = 50;
  const [spielfeld, setSpielfeld] = useState<React.FC<{}>[][]>(SpielfeldLayout());

  // const [positionHackman,setPositionHackman] = useState(new Koordinate(10,12));
  
  
  const [bewegungsRichtungHackman, setBewegungsRichtungHackman] = useState<Richtung>(
    Richtung.Keine
  );
  const [bewegungHackmanMoeglich,setBewegungHackmanMoeglich] = useState<BewegungMoeglich>(BewegungMoeglich.Nein);
  
  // let bewegungHackmanMoeglich:BewegungMoeglich = BewegungMoeglich.Nein;

  const [positionGhost, setPositionGhost] = useState<Koordinate>(new Koordinate(10,8));
  const [bewegungsRichtungGhost, setBewegungsRichtungGhost] =
    useState<Richtung>(Richtung.Keine);
  
  const characters = new Array("Hackman");

  useEffect(() => {
    const subscription = props.service()[0].subscribe(setSpielfeld);
        // subscribe(setSpielfeld);
    return () => subscription.unsubscribe()
  }, [props.service()[0]])

  // useEffect(() => {
  //   if(bewegungHackmanMoeglich === BewegungMoeglich.Ja){
  //     intervalstart();
  //   }
  //   // console.log("fadss");
  //   else{
  //     intervalstop();
  //   }
  //   return () => {
  //     intervalstop();
  //   };
  // },[bewegungHackmanMoeglich]);



  // const moveAllWrapper = ()=>{
  //   characters.forEach(element => {
  //       move(element);
  //   });
  // }




  // const getCoordinates = (stateFieldName:string): Koordinate => {
  //   let position: Koordinate = Koordinate.Empty();

  //   for (let y = 0; y < spielfeld.length; y++) {
  //     for (let x = 0; x < spielfeld[y].length; x++) {
  //       if (spielfeld[y][x].name=== stateFieldName) {
  //       position.x = x;
  //       position.y = y;
  //       }
  //     }
  //   }
  //   return position;
  // };

  
  
  
  //#endregion

  // const logFeld = ()=>{
  //   let leString = "";
  //   for (let y = 0; y < spielfeld.length; y++) {
  //     for (let x = 0; x < spielfeld[y].length; x++) {
  //       leString +=spielfeld[y][x].name + " ";
  //     }
  //     leString += "\n";
  //   }
  //   console.log(leString);
  // }
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
// const [intervalstart,intervalstop] = CustomInterval(move,250);

  return (
    <div className="App center" onKeyDown={() => props.service()[1]} tabIndex={0}>
      {spielfeld!.map((row, x) => {
        return (
          <div className="row" key={x}>
            {row.map((feld, y) => {
              return renderComponent(feld, y);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Spielfeld;
