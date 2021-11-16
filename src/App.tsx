import GameField from "./Components/GameFieldComponent/Gamefield";
import React, { useEffect, useRef, useState } from "react";
import Stats from "./Components/StatsComponent/Stats";
import { bindActionCreators } from "redux";
import gameFieldSlice from "./State/slices/gameFieldSlice";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "./State/store";
import Direction from "./Types/Direction";
import SettingsOverlay from "./Components/GameFieldComponent/OverlayComponents/GameOverlays/SettingsOverlay";
import GameOver from "./Components/GameFieldComponent/OverlayComponents/GameOverlays/GameOverOverlay";
import CustomTimeOut from "./UtilityFunctions/Interval_And_Timer/CustomTimeOut";
import WinOverlay from "./Components/GameFieldComponent/OverlayComponents/GameOverlays/WinOverlay";
import { CalculateAllCoins, GetScreenSize } from "./UtilityFunctions/CalcHelper";
import SpielfeldLayout from "./SpielfeldLayout";
import GameController from "./Components/GameFieldComponent/OverlayComponents/GameController/GameController";
import Start from "./Components/GameFieldComponent/OverlayComponents/GameOverlays/StartOverlay";


const allPoints: number = CalculateAllCoins(SpielfeldLayout());

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    changeIsMoveableHackman,
    setBlock,
    deleteBlock,
    hackmanJump,
    enableJumpingFeature,
    pauseGame,
    openOptions,
    openGameOver,
    winGame,
  } = bindActionCreators(gameFieldSlice.actions, dispatch);

  const isPaused = useSelector((state: State) => state.isPaused);
  const remainingLives = useSelector(
    (state: State) => state.hackman.remainingLifes
  );
  const gameOver = useSelector((state: State) => state.gameOver);
  const canSetBlock = useSelector((state: State) => state.hackman.canSetBlock);
  const canJump = useSelector((state: State) => state.hackman.canJump);
  const options = useSelector((state: State) => state.options);
  const points = useSelector((state: State) => state.points);
  const win = useSelector((state:State) => state.win)
  const [ScreenSize, SetScreenSize] = useState(GetScreenSize())

  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (points === allPoints - 1) {
      store.dispatch(winGame);
    }
  }, [points]);

  useEffect(() => {
    if (remainingLives === 0) {
      store.dispatch(openGameOver(!gameOver));
    }
  }, [remainingLives]);

  useEffect(() => {
    centerRef.current?.focus();
    setStyleTag();
    window.addEventListener("resize", setStyleTag);
    return () => window.removeEventListener("resize", setStyleTag);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let [blockTimerStart, blockTimerStop] = CustomTimeOut(
      () => store.dispatch(deleteBlock),
      5000
    );
    if (!isPaused) {
      if (!canSetBlock) {
        blockTimerStart();
      }
    } else if (isPaused) {
      blockTimerStop();
    }
    return () => {
      blockTimerStop();
    };
  }, [canSetBlock, isPaused]);

  useEffect(() => {
    let [canJumpTimerStart, canJumpTimerStop] = CustomTimeOut(
      () => store.dispatch(enableJumpingFeature),
      5000
    );
    if (!canJump) {
      canJumpTimerStart();
    }
    return () => {
      canJumpTimerStop();
    };
  }, [canJump]);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (!isPaused && !win) {
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
        store.dispatch(setBlock);
      } else if (e.code === "Escape") {
        store.dispatch(openOptions(!options));
        store.dispatch(pauseGame(!isPaused));
      } else if (e.code === "ShiftLeft") {
        store.dispatch(hackmanJump);
      } else return;
    } else if (isPaused && !options && !win) {
      if (e.key.toLowerCase() === "p") {
        store.dispatch(pauseGame(!isPaused));
      }
    } else if (options) {
      if (e.code === "Escape") {
        store.dispatch(openOptions(!options));
        store.dispatch(pauseGame(!isPaused));
      }
    }
  };

  const setStyleTag = () => {
    SetScreenSize(GetScreenSize())
    setRowHeightStyleTag();
    let headTag = document.getElementsByTagName("head");
    let row = centerRef.current?.firstElementChild;
    let rowHeightInPx = getComputedStyle(row!).height;

    var styleTag = document.createElement("style");
    styleTag.type = "text/css";
    styleTag.id = "styleTag";
    styleTag.innerHTML = `div.center > div.row > div.field {width: ${rowHeightInPx};}`;
    let styleSheetTest = document.getElementById("styleTag");
    if (styleSheetTest) {
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleTag);
  };

  const setRowHeightStyleTag = () => {
    let headTag = document.getElementsByTagName("head");
    let height = window.innerHeight;
    let width = window.innerWidth;
    if (width - height < 50) {
      width -= 50;
    }

    console.debug("Height" + height);
    console.debug("\nWidth" + width);
    var styleRow = document.createElement("style");
    styleRow.type = "text/css";
    styleRow.id = "rowStyleTag";
    let estimatedHeight = 0;
    if (height > width + width / 2) {
      estimatedHeight = 2;
      console.debug("case one!");
    } else if (height > width) {
      estimatedHeight = 3;
      console.debug("case two!");
    } else {
      estimatedHeight = 5;
      console.debug("case three!");
    }
    styleRow.innerHTML = `div.center > div.row { height: ${estimatedHeight}%}`;
    let styleSheetTest = document.getElementById("rowStyleTag");
    if (styleSheetTest) {
      headTag[0].removeChild(styleSheetTest);
    }
    headTag[0].appendChild(styleRow);
  };


  return (
    <div
      ref={centerRef}
      className="center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      id="game"
    >
      <GameField />
      <Start/>
      <Stats />
      <SettingsOverlay />
      <GameOver />
      <WinOverlay />
      {(ScreenSize.width < 1300 && ScreenSize.width/ScreenSize.height > 1.65) && 
        <GameController />      
      }
    </div>
  );
};

export default App;

