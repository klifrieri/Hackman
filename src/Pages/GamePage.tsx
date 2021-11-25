import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import GameController from "../Components/GamePageComponents/GameController/GameController";
import GameField from "../Components/GamePageComponents/GameFieldComponent/Gamefield";
import LifeAndScore from "../Components/GamePageComponents/LifeAndScoreComponent/LifeAndScore";
import PauseOverlay from "../Components/PauseOverlay";
import appStateSlice from "../State/appState/appStateSlice";
import gameStateSlice from "../State/gameState/gameStateSlice";
import { State } from "../State/store";
import Direction from "../Types_Classes/Character/Models/Direction";
import { CalculateAllCoins, GetScreenSize } from "../UtilityFunctions/CalcHelper";
import createGameField from "../UtilityFunctions/createGameField";
import gameFieldCssInjection from "../UtilityFunctions/CssInjection/gameFieldCssInjection";

const allEatenCoins: number = CalculateAllCoins(createGameField());

const GamePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { changeIsMoveableHackman, setBlock, hackmanJump } = bindActionCreators(gameStateSlice.actions, dispatch);
    const { pauseGame, gameOver, winGame } = bindActionCreators(appStateSlice.actions, dispatch);

    const isPaused = useSelector((state: State) => state.appState.isPaused);
    const gameLost = useSelector((state: State) => state.appState.gameLost);
    const win = useSelector((state: State) => state.appState.win);

    const remainingLives = useSelector((state: State) => state.gameState.hackman.remainingLifes);

    const eatenCoins = useSelector((state: State) => state.gameState.eatenCoins);
    const score = useSelector((state: State) => state.gameState.score);

    const [ScreenSize] = useState(GetScreenSize());

    useEffect(() => {
        centerRef.current?.focus();
    });

    useEffect(() => {
        if (eatenCoins === allEatenCoins) {
            winGame();
        }
    }, [eatenCoins]);

    useEffect(() => {
        if (remainingLives === 0) {
            gameOver();
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
        if (e.code === "Escape") {
            pauseGame(true);
            navigate("/");
        } else if (!isPaused) {
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
            } else if (e.code === "ShiftLeft") {
                hackmanJump();
            } else return;
        } else if (isPaused) {
            if (e.key.toLowerCase() === "p") {
                pauseGame(false);
            }
        }
    }

    return (
        <div ref={centerRef} className="center" onKeyDown={handleKeyDown} tabIndex={0} id="game">
            <GameField isPaused={isPaused} />
            <LifeAndScore remainingLifes={remainingLives} score={score} />
            {isPaused && !win && !gameLost && <PauseOverlay />}
            {ScreenSize.width < 1300 && ScreenSize.width / ScreenSize.height > 1.65 && <GameController />}
        </div>
    );
};

export default GamePage;
