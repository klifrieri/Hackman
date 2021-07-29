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
import Snack from "./Snack";
import Ghost from "./Ghost";
import Gate from "./Gate";
import Direction from "../Types/Direction";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../State/store";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../State/slices/gameFieldSlice";
import  { CustomInterval, CustomTimeout } from "../UtilityFunctions/CustomInterval";


const GameField: React.FC = () => {
  const dispatch = useDispatch();
  const { gameTick, changeIsMoveableHackman, activateGhost } = bindActionCreators(gameFieldSlice.actions, dispatch)

  const gameField = useSelector((state: State) => state.gameField);
  const hackmanDirection = useSelector((state: State) => state.hackman.direction);
  const hackmanMoved = useSelector((state: State) => state.hackmanMoved);

  

  useEffect(() => {
    let [ghost1TimerStart,ghost1TimerStop] = CustomTimeout(()=>store.dispatch(activateGhost(1)),2500)
    let [ghost2TimerStart,ghost2TimerStop] = CustomTimeout(()=>store.dispatch(activateGhost(2)),5000)
    let [ghost3TimerStart,ghost3TimerStop] = CustomTimeout(()=>store.dispatch(activateGhost(3)),7500)
    let [ghost4TimerStart,ghost4TimerStop] = CustomTimeout(()=>store.dispatch(activateGhost(4)),10000)
    if(hackmanMoved){
    ghost1TimerStart();
    ghost2TimerStart();
    ghost3TimerStart();
    ghost4TimerStart();
  }
  return () =>{
    ghost1TimerStop();
    ghost2TimerStop();
    ghost3TimerStop();
    ghost4TimerStop();
  }  
  
  },[]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const [intervalStart, intervalStop] = CustomInterval(() => store.dispatch(gameTick), 250);
    intervalStart();
    return () => intervalStop();
  },[]) // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
      store.dispatch(changeIsMoveableHackman(Direction.Up))
    }
    else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
      store.dispatch(changeIsMoveableHackman(Direction.Right))
    }
    else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
      store.dispatch(changeIsMoveableHackman(Direction.Down))
    }
    else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
      store.dispatch(changeIsMoveableHackman(Direction.Left))
    }
    else
      return;
  };

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
      return <Hackman key={key} richtung={hackmanDirection} />;
    else if (component === Ghost)
      return <Ghost key={key} richtung={Direction.Left} />;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };
  
  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {gameField.map((row, x) => {
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
