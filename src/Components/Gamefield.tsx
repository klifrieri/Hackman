import Coin from "./Fields/Path/Coin";
import Empty from "./Fields/Path/Empty";
import Hackman from "./Hackman/Hackman";
import VerticalWall from "./Fields/VerticalWalls/VerticalWall";
import VerticalWallTS from "./Fields/VerticalWalls/VerticalWallTopShort";
import VerticalWallBS from "./Fields/VerticalWalls/VerticalWallBottomShort";
import HorizontalWall from "./Fields/HorizontalWalls/HorizontalWall";
import HorizontalWallRS from "./Fields/HorizontalWalls/HorizontalWallRightSideShort";
import HorizontalWallLS from "./Fields/HorizontalWalls/HorizontalWallLeftSideShort";
import TPieceBottom from "./Fields/TPieces/TPieceBottom";
import TPieceTop from "./Fields/TPieces/TPieceTop";
import TPieceRight from "./Fields/TPieces/TPieceRight";
import TPieceLeft from "./Fields/TPieces/TPieceLeft";
import CornerLT from "./Fields/Corners/CornerLeftTop";
import CornerLB from "./Fields/Corners/CornerLeftBottom";
import CornerRT from "./Fields/Corners/CornerRightTop";
import CornerRB from "./Fields/Corners/CornerRightBottom";
import React, { useEffect } from "react";
import Snack from "./Fields/Path/Snack";
import Ghost from "./Ghost/Ghost";
import Gate from "./Fields/Path/Gate";
import Direction from "../Types/Direction";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../State/store";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../State/slices/gameFieldSlice";
import CustomInterval from "../UtilityFunctions/CustomInterval";
import { useRef } from "react";
import Stats from "./Stats/Stats";


const GameField: React.FC = () => {
  const dispatch = useDispatch();
  const { gameTick, changeIsMoveableHackman, activateGhost } = bindActionCreators(gameFieldSlice.actions, dispatch)

  const gameField = useSelector((state: State) => state.gameField);
  const hackmanIsMoveable = useSelector((state: State) => state.hackman.moveable);

  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => { store.dispatch(activateGhost(1)) }, 2500);
    setTimeout(() => { store.dispatch(activateGhost(2)) }, 5000);
    setTimeout(() => { store.dispatch(activateGhost(3)) }, 7500);
    setTimeout(() => { store.dispatch(activateGhost(4)) }, 10000);
  }, [])

  useEffect(() => {
    setStyleTag();
    window.addEventListener("resize", setStyleTag);
    return () => window.removeEventListener("resize", setStyleTag);
    //eslint-disable-next-line
  },[]);
  
  useEffect(() => {
    const [intervalStart, intervalStop] = CustomInterval(() => store.dispatch(gameTick), 250);
    intervalStart();
    return () => intervalStop();
  }, [hackmanIsMoveable])

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
    if (component === HorizontalWall) return <HorizontalWall key={key} />;
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
      return <Hackman key={key} />;
    else if (component === Ghost)
      return <Ghost key={key} richtung={Direction.Left} />;
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else return undefined;
  };
  
  const setStyleTag = () => {
    setRowHeightStyleTag();
    let headTag = document.getElementsByTagName('head');
    let row = centerRef.current?.firstElementChild;
    let rowHeightInPx = getComputedStyle(row!).height;

    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = "styleTag";
    
    styleTag.innerHTML = `div.center > div.row > div.field {width: ${rowHeightInPx};}`;
    let styleSheetTest = document.getElementById("styleTag");
    if(styleSheetTest){
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleTag);
  };

  const setRowHeightStyleTag = ()=>{
    let headTag = document.getElementsByTagName('head');
    let height = window.innerHeight;
    let width = window.innerWidth;
    console.log("Height" + height);
    console.log("\nWidth" + width);
    var styleRow = document.createElement('style');
    styleRow.type = 'text/css';
    styleRow.id = "rowStyleTag";
    let estimatedHeight= 0;
    if(height>width+width/2){
      estimatedHeight = 2;
      console.log("case one!")
    }
    else if(height> width){
      estimatedHeight = 3;
      console.log("case two!")
    }
    else{
      estimatedHeight = 5
      console.log("case three!")
    }
    styleRow.innerHTML = `div.center > div.row { height: ${estimatedHeight}%}`;
    let styleSheetTest = document.getElementById("rowStyleTag");
    if(styleSheetTest){
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleRow);
  }

  return (
    <div ref={centerRef} className="center" onKeyDown={handleKeyDown} tabIndex={0}>
      {gameField.map((row, x) => {
        return (
          <div className="row" key={x}>
            {row.map((feld, y) => {
              return renderComponent(feld, y)
            })}
          </div>
        )
      })}
    <Stats/>
    </div>
  )
};

export default GameField;
