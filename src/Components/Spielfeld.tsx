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
import Empy from "./Empty";
import Hack from "./Hackman";
import React from "react";
import { useState } from "react";

interface ISpielfeldProps {
  fields: React.FC[][];
}

const renderComponent = (component: React.FC, key: number) => {
  if (component === Wall) return <Wall key={key} />;
  else if (component === HorizontalWall) return <HorizontalWall key={key} />;
  else if (component === HorizontalWallLS) return <HorizontalWallLS key={key} />;
  else if (component === HorizontalWallRS) return <HorizontalWallRS key={key} />;
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
  else if (component === Hackman) return <Hackman key={key} />;
  else if (component === Empty) return <Empty key={key} />;

  return undefined;
};

// let position: [number, number];
//   for (let i = 0; i < feld.length; i++) {
//     for (let y = 0; y < feld[i].length; y++) {
//       if (feld[i][y] === Hack) {
//         position = [i, y];
//       }
//     }
//   }

const handleKeyDown = (e: React.KeyboardEvent) => {
  console.log(e.key);
  // const zwischenFeld = feld;

  // if (e.key === "a") {
  //   if (feld[position[0]][position[1] - 1] === (Coin || Empy)) {
  //     zwischenFeld[position[0]][position[1] - 1] = Hack;
  //     zwischenFeld[position[0]][position[1]] = Empy;
  //     setFeld(zwischenFeld);
  //     console.log("MoveLeft");
  //     return;
  //   }
  // }
  // else if(e.key === "d"){
  //   if (feld[position[0]][position[1] + 1] === (Coin || Empy)) {
  //     zwischenFeld[position[0]][position[1] + 1] = Hack;
  //     zwischenFeld[position[0]][position[1]] = Empy;
  //     setFeld(zwischenFeld);
  //     console.log("MoveRight");
  //     return;
  //   }
  // }
  // else if(e.key === "w"){
  //   if (feld[position[0] - 1][position[1]] === (Coin || Empy)) {
  //     zwischenFeld[position[0] - 1][position[1]] = Hack;
  //     zwischenFeld[position[0]][position[1]] = Empy;
  //     setFeld(zwischenFeld);
  //     console.log("MoveUp");
  //     return;
  //   }
  // }
  // else if(e.key === "s"){
  //   if (feld[position[0] + 1][position[1]] === (Coin || Empy)) {
  //     zwischenFeld[position[0] + 1][position[1]] = Hack;
  //     zwischenFeld[position[0]][position[1]] = Empy;
  //     setFeld(zwischenFeld);
  //     console.log("Movedown");
  //     return;
  //   }
  // }
}

const Spielfeld: React.FC<ISpielfeldProps> = (props) => {
  
  return (
    <div className="App center" onKeyDown={handleKeyDown} tabIndex={0}>
      {props.fields.map((row, x) => {
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
