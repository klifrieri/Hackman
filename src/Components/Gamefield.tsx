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
import Snack from "./Snack";
import Ghost from "./Ghost";
import Gate from "./Gate";
// import IGameFieldProps from "../Interfaces/IGameFieldProps";
import Direction from "../Types/Direction";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../State/store";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../State/slices/gameFieldSlice";
import { canMoveLeft } from "../UtilityFunctions/move/CanMove";
import Moveable from "../Types/Moveable";
import CustomInterval from "../UtilityFunctions/CustomInterval";


const GameField: React.FC = () => {
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
      return <Hackman key={key} richtung={hackmanDirection}/>;
    else if (component === Ghost)
     return <Ghost key={key} richtung={Direction.Left}/>;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };

  const dispatch = useDispatch();
  
  const {gameTick,changeIsMoveableHackman,activateGhost} = bindActionCreators(gameFieldSlice.actions,dispatch)



  const spielfeld = useSelector((state:State)=>state.gameField);
  const hackmanIsMoveable = useSelector((state:State)=>state.hackman.getBewegungMoeglich);
  const hackmanDirection = useSelector((state:State)=>state.hackman.getBewegungsRichtung);

  useEffect(()=>{
    const [intervalStart,intervalStop] = CustomInterval(()=>store.dispatch(gameTick),250);
    intervalStart();
    return ()=>intervalStop();
  },[hackmanIsMoveable])

  useEffect(()=>{
    setTimeout(() => {store.dispatch(activateGhost(1))},2500);
    setTimeout(() => {store.dispatch(activateGhost(2))},5000);
    setTimeout(() => {store.dispatch(activateGhost(3))},7500);
    setTimeout(() => {store.dispatch(activateGhost(4))},10000);
  },[])
  const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key.toLowerCase() === "w" || e.key === "ArrowUp"){
        store.dispatch(changeIsMoveableHackman(Direction.Up))
      }
      else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight"){
        store.dispatch(changeIsMoveableHackman(Direction.Right))
      }
      else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown"){
        store.dispatch(changeIsMoveableHackman(Direction.Down))
      }
      else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft"){
        store.dispatch(changeIsMoveableHackman(Direction.Left))
      }
      else
      return;
    };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
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
  )
};

export default GameField;
