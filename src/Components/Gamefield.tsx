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
import React, { useEffect } from "react";
import { useState } from "react";
import Koordinate from "../Types/Koordinate";
import Richtung from "../Types/Richtung";
import Snack from "./Snack";
import Ghost from "./Ghost";
import Gate from "./Gate";
import EventEmitter from "events";

interface ISpielfeldProps {
  fields: React.FC[][];
  emitter: EventEmitter;
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
      return <Hackman key={key} richtung={bewegungsRichtung} emitter={props.emitter}/>;
    else if (component === Ghost) return <Ghost key={key} />;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };

  const [spielfeld, setSpielfeld] = useState<React.FC<{}>[][]>(props.fields);
  const [position, setPosition] = useState(Koordinate.Empty());
  const [bewegungsRichtung, setBewegungsRichtung] = useState<Richtung>(
    Richtung.Keine
  );
  

  useEffect(() => {
    const interval = setInterval(() => move(), 250);
    return () => clearInterval(interval);
  });

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    setPosition(getHackmanPosition());

    if (e.key.toLowerCase() === "w" || e.key === "ArrowUp")
      setBewegungsRichtung(Richtung.Oben);
    else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft")
      setBewegungsRichtung(Richtung.Links);
    else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown")
      setBewegungsRichtung(Richtung.Unten);
    else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight")
      setBewegungsRichtung(Richtung.Rechts);
  };
    const getHackmanPosition = (): Koordinate => {
    let position: Koordinate = Koordinate.Empty();
    
    for (let y = 0; y < spielfeld.length; y++) {
      for (let x = 0; x < spielfeld[y].length; x++) {
        if (spielfeld[y][x] === Hackman) {
          position.x = x;
          position.y = y;
        }
      }
    }
    return position;
  };

  const canMove = (): boolean => {
    setPosition(getHackmanPosition());
    
    switch (bewegungsRichtung) {
      case Richtung.Oben: {
        return (
          spielfeld[position.y - 1][position.x] === Empty ||
          spielfeld[position.y - 1][position.x] === Coin ||
          spielfeld[position.y - 1][position.x] === Snack
        );
      }
      case Richtung.Links: {
        return (
          spielfeld[position.y][position.x - 1] === Empty ||
          spielfeld[position.y][position.x - 1] === Coin ||
          spielfeld[position.y][position.x - 1] === Snack
        );
      }
      case Richtung.Unten: {
        return (
          spielfeld[position.y + 1][position.x] === Empty ||
          spielfeld[position.y + 1][position.x] === Coin ||
          spielfeld[position.y + 1][position.x] === Snack
        );
      }
      case Richtung.Rechts: {
        return (
          spielfeld[position.y][position.x + 1] === Empty ||
          spielfeld[position.y][position.x + 1] === Coin ||
          spielfeld[position.y][position.x + 1] === Snack
        );
      }
      default:
        return false;
    }
  };

  const move = () => {
    let spielfeldCopy: React.FC<{}>[][] = spielfeld;
    setPosition(getHackmanPosition());

    switch (bewegungsRichtung) {
      case Richtung.Oben: {
        if (canMove()) {
          props.emitter.emit('startAnimation', bewegungsRichtung);
          spielfeldCopy[position.y][position.x] = Empty;
          spielfeldCopy[position.y - 1][position.x] = Hackman;
          setSpielfeld(spielfeldCopy);
          //Emitter.removeAllListeners('startAnimation');
        }
        break;
      }
      case Richtung.Links: {
        if (canMove()) {       
          props.emitter.emit('startAnimation', bewegungsRichtung);   
          spielfeldCopy[position.y][position.x] = Empty;
          spielfeldCopy[position.y][position.x - 1] = Hackman;
          setSpielfeld(spielfeldCopy);
          //Emitter.removeAllListeners('startAnimation');
        }
        break;
      }
      case Richtung.Unten: {
        if (canMove()) {
          props.emitter.emit('startAnimation', bewegungsRichtung);
          spielfeldCopy[position.y][position.x] = Empty;
          spielfeldCopy[position.y + 1][position.x] = Hackman;
          setSpielfeld(spielfeldCopy);
          //Emitter.removeAllListeners('startAnimation');
        }
        break;
      }
      case Richtung.Rechts: {
        if (canMove()) {
          props.emitter.emit('startAnimation', bewegungsRichtung);
          spielfeldCopy[position.y][position.x] = Empty;
          spielfeldCopy[position.y][position.x + 1] = Hackman;
          setSpielfeld(spielfeldCopy);
          //Emitter.removeAllListeners('startAnimation');
        }
        break;
      }
    }
  };

  return (
    <div className="App center" onKeyDown={handleKeyDown} tabIndex={0}>
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
