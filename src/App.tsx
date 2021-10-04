import GameField from "./Components/GameFieldComponent/Gamefield";
import React, { useEffect, useRef } from "react";
import Stats from "./Components/StatsComponent/Stats";
import { bindActionCreators } from "redux";
import gameFieldSlice from "./State/slices/gameFieldSlice";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "./State/store";
import Direction from "./Types/Direction";
import GameOverlay from "./Components/GameFieldComponent/GameOverlay";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { changeIsMoveableHackman, setBlock, pauseGame, openOptions } = bindActionCreators(
    gameFieldSlice.actions,
    dispatch
  );

  const isPaused = useSelector((state: State) => state.isPaused);

  const centerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    centerRef.current?.focus();
    setStyleTag();
    window.addEventListener("resize", setStyleTag);
    return () => window.removeEventListener("resize", setStyleTag);
    //eslint-disable-next-line
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
      store.dispatch(changeIsMoveableHackman(Direction.Up));
    } else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
      store.dispatch(changeIsMoveableHackman(Direction.Right));
    } else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
      store.dispatch(changeIsMoveableHackman(Direction.Down));
    } else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
      store.dispatch(changeIsMoveableHackman(Direction.Left));
    } else if (e.key.toLowerCase() === "p") {
      store.dispatch(pauseGame(!isPaused));
    } else if (e.code === "Space") {
      console.log("Space pressed");
      store.dispatch(setBlock);
    } else if(e.code === "Escape"){
      store.dispatch(openOptions)
    } 
    
    else return;
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
    if (styleSheetTest) {
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleTag);
  };

  const setRowHeightStyleTag = () => {
    let headTag = document.getElementsByTagName('head');
    let height = window.innerHeight;
    let width = window.innerWidth;
    if ((width - height) < 50) {
      width -= 50;
    }

    console.debug("Height" + height);
    console.debug("\nWidth" + width);
    var styleRow = document.createElement('style');
    styleRow.type = 'text/css';
    styleRow.id = "rowStyleTag";
    let estimatedHeight = 0;
    if (height > width + width / 2) {
      estimatedHeight = 2;
      console.debug("case one!")
    }
    else if (height > width) {
      estimatedHeight = 3;
      console.debug("case two!")
    }
    else {
      estimatedHeight = 5
      console.debug("case three!")
    }
    styleRow.innerHTML = `div.center > div.row { height: ${estimatedHeight}%}`;
    let styleSheetTest = document.getElementById("rowStyleTag");
    if (styleSheetTest) {
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleRow);
  }

  return (
    <div ref={centerRef} className="center" onKeyDown={handleKeyDown} tabIndex={0}>
      <GameField />
      <Stats />
      <GameOverlay/>
    </div>
  )
};

export default App;

