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
import React, { useEffect, useState } from "react";
import Richtung from "../Types/Richtung";
import Snack from "./Snack";
import Ghost from "./Ghost";
import Gate from "./Gate";
import IGameFieldProps from "../Interfaces/IGameFieldProps";

const Spielfeld: React.FC<IGameFieldProps> = (props) => {
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
      return <Hackman key={key} richtung={bewegungsRichtungHackman}/>;
    else if (component === Ghost)
     return <Ghost key={key} richtung={Richtung.Links}/>;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };

  const [spielfeld, setSpielfeld] = useState<React.FC<{}>[][]>(props.fields);
  const [bewegungsRichtungHackman,setBewegungsRichtungHackman] = useState<Richtung>(Richtung.Keine);


  useEffect(() => {
    const spielFeldSubscription = props.spielFeldService.spielFeldSubject.subscribe((value)=>{
      console.log(spielfeld);
      console.log("\n");
      console.log(value);
      setSpielfeld(value);
      console.log("\n");
      console.log(spielfeld);
  });
    return () => spielFeldSubscription.unsubscribe()
  },[props.spielFeldService])

  useEffect(()=>{
    const bewegungsRichtungHackmanSubscription = props.spielFeldService.bewegungsRichtungHackmanSubject.subscribe((value)=>{
      console.log(bewegungsRichtungHackman);
      console.log("\n");
      console.log(value);
      console.log("\n");
      console.log(bewegungsRichtungHackman);
      setBewegungsRichtungHackman(value);     
    });
    return () => bewegungsRichtungHackmanSubscription.unsubscribe()
  },[props.spielFeldService])

  return (
    <div className="App center" onKeyDown={props.spielFeldService.handleKeyDown} tabIndex={0}>
      {spielfeld.map((row, x) => {
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
