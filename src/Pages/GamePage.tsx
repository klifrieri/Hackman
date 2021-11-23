import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import GameField from "../Components/GamePageComponents/Gamefield";
import Stats from "../Components/GamePageComponents/LifeAndScore";
import appStateSlice from "../State/appState/appStateSlice";
import gameStateSlice from "../State/gameState/gameStateSlice";
import { State } from "../State/store";
import Direction from "../Types_Classes/Character/Models/Direction";
import { CalculateAllCoins, GetScreenSize } from "../UtilityFunctions/CalcHelper";
import createGameField from "../UtilityFunctions/createGameField";
import gameFieldCssInjection from "../UtilityFunctions/CssInjection/gameFieldCssInjection";

const allEatenCoins: number = CalculateAllCoins(createGameField());

const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const { changeIsMoveableHackman, setBlock, hackmanJump } = bindActionCreators(gameStateSlice.actions, dispatch);
    const { pauseGame, openMenu, openGameOver, winGame } = bindActionCreators(appStateSlice.actions, dispatch);

    const isPaused = useSelector((state: State) => state.appState.isPaused);
    const gameOver = useSelector((state: State) => state.appState.gameOver);
    const menu = useSelector((state: State) => state.appState.menu);
    const win = useSelector((state: State) => state.appState.win);


    const eatenCoins = useSelector((state: State) => state.gameState.eatenCoins);



    const remainingLives = useSelector((state: State) => state.gameState.hackman.remainingLifes);
    const score = useSelector((state: State) => state.gameState.score);

    const [ScreenSize, SetScreenSize] = useState(GetScreenSize());

    useEffect(() => {
        centerRef.current?.focus();
    });

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

    const centerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        centerRef.current?.focus();
        gameFieldCssInjection(centerRef);
        window.addEventListener("resize", () => gameFieldCssInjection(centerRef));
        return () => window.removeEventListener("resize", () => gameFieldCssInjection(centerRef));
        //eslint-disable-next-line
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (!isPaused && !win) {
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

    return (
        <div ref={centerRef} className="center" onKeyDown={handleKeyDown} tabIndex={0} id="game">

            <GameField isPaused={isPaused} />
            <Stats remainingLifes={remainingLives} score={score} />
            <Link to="/" className="s-overlay-button">START</Link>
            {/*
            {menu && <MenuOverlay />}
            {ScreenSize.width < 1300 && ScreenSize.width / ScreenSize.height > 1.65 && <GameController />}
        {(isPaused && !menu && !win && !gameOver) && <Pause />} */}
        </div>
    );
};

export default GamePage;
