import GameField from "./Components/GameFieldComponent/Gamefield";
import React, { useEffect, useRef, useState } from "react";
import Stats from "./Components/StatsComponent/Stats";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./State/store";
import GameOver from "./Components/OverlayComponents/GameOverlays/GameOverOverlay";
import CustomTimeOut from "./UtilityFunctions/Interval_And_Timer/CustomTimeOut";
import WinOverlay from "./Components/OverlayComponents/GameOverlays/WinOverlay";
import { CalculateAllCoins, GetScreenSize } from "./UtilityFunctions/CalcHelper";
import GameController from "./Components/OverlayComponents/GameController/GameController";
import Start from "./Components/OverlayComponents/GameOverlays/StartOverlay";
import MenuOverlay from "./Components/OverlayComponents/GameOverlays/MenuOverlay";
import gameFieldSlice from "./State/gameFieldSlice/gameFieldSlice";
import Pause from "./Components/OverlayComponents/GameOverlays/ChildComponents/PauseDialog";
import Direction from "./Types_Classes/Character/Models/Direction";
import createGameField from "./UtilityFunctions/createGameField";

const allEatenCoins: number = CalculateAllCoins(createGameField());

const App: React.FC = () => {
    const dispatch = useDispatch();
    const { changeIsMoveableHackman, setBlock, deleteBlock, hackmanJump, enableJumpingFeature, pauseGame, openMenu, openGameOver, winGame } = bindActionCreators(gameFieldSlice.actions, dispatch);

    const isPaused = useSelector((state: State) => state.isPaused);
    const remainingLives = useSelector((state: State) => state.hackman.remainingLifes);
    const gameOver = useSelector((state: State) => state.gameOver);
    const canSetBlock = useSelector((state: State) => state.hackman.canSetBlock);
    const canJump = useSelector((state: State) => state.hackman.canJump);
    const menu = useSelector((state: State) => state.menu);
    const eatenCoins = useSelector((state: State) => state.eatenCoins);
    const settings = useSelector((state: State) => state.settings);
    const win = useSelector((state: State) => state.win);
    const gameStarted = useSelector((state: State) => state.gameStarted);
    const [ScreenSize, SetScreenSize] = useState(GetScreenSize());

    const centerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gameStarted) centerRef.current?.focus();
    }, [gameStarted, menu, settings, win, gameOver]);

    useEffect(() => {
        console.log(eatenCoins)
        if (eatenCoins === allEatenCoins) {
            winGame();
        }
    }, [eatenCoins]);

    useEffect(() => {
        if (remainingLives === 0) {
            openGameOver(!gameOver);
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
        let [blockTimerStart, blockTimerStop] = CustomTimeOut(() => deleteBlock(), 5000);
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
        let [canJumpTimerStart, canJumpTimerStop] = CustomTimeOut(() => enableJumpingFeature(), 5000);
        if (!canJump) {
            canJumpTimerStart();
        }
        return () => {
            canJumpTimerStop();
        };
    }, [canJump]);

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (!isPaused && !win && gameStarted) {
            if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
                changeIsMoveableHackman(Direction.Up);
            } else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
                changeIsMoveableHackman(Direction.Right);
            } else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
                changeIsMoveableHackman(Direction.Down);
            } else if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
                changeIsMoveableHackman(Direction.Left);
            } else if (e.key.toLowerCase() === "p") {
                pauseGame(!isPaused);
            } else if (e.code === "Space") {
                setBlock();
            } else if (e.code === "Escape") {
                openMenu(!menu);
                pauseGame(!isPaused);
            } else if (e.code === "ShiftLeft") {
               hackmanJump();
            } else return;
        } else if (isPaused && !menu && !win) {
            if (e.key.toLowerCase() === "p") {
                pauseGame(!isPaused);
            }
            if (e.code === "Escape") {
                openMenu(!menu);
            }
        } else if (menu) {
            if (e.code === "Escape") {
                openMenu(!menu);
            }
        }
    };

    const setStyleTag = () => {
        SetScreenSize(GetScreenSize());
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
        <div ref={centerRef} className="center" onKeyDown={handleKeyDown} tabIndex={0} id="game">
            <GameField />
            {!gameStarted && <Start />}
            <Stats />
            {menu && <MenuOverlay />}
            <GameOver />
            <WinOverlay />
            {ScreenSize.width < 1300 && ScreenSize.width / ScreenSize.height > 1.65 && <GameController />}
            {(isPaused && !menu && !win && !gameOver) && <Pause/>}
        </div>
    );
};

export default App;
