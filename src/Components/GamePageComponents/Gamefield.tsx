import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../State/store";
import { bindActionCreators } from "redux";
import gameStateSlice from "../../State/gameState/gameStateSlice";
import "./gameField.css";
import CustomIntervalForGameTick from "../../UtilityFunctions/Interval_And_Timer/CustomIntervalForGameTick";
import CustomTimeOut from "../../UtilityFunctions/Interval_And_Timer/CustomTimeOut";
import renderGameField from "../../UtilityFunctions/GameFieldFunctions/renderGameField";
import IGameFieldProps from "../../Types_Classes/Props/IGameFieldProps";

const GameField: React.FC<IGameFieldProps> = (props) => {
    const dispatch = useDispatch();
    const { gameTick, activateGhostByIndex: activateGhost, resetGhostGotEatenByIndex, enableJumpingFeature, deleteBlock } = bindActionCreators(gameStateSlice.actions, dispatch);

    const gameField = useSelector((state: State) => state.gameState.gameField);
    const hackmanMoved = useSelector((state: State) => state.gameState.hackman.hackmanMoved);

    const ghost1ShallTick = useSelector((state: State) => state.gameState.ghosts[0].shallTick);
    const ghost2ShallTick = useSelector((state: State) => state.gameState.ghosts[1].shallTick);
    const ghost3ShallTick = useSelector((state: State) => state.gameState.ghosts[2].shallTick);
    const ghost4ShallTick = useSelector((state: State) => state.gameState.ghosts[3].shallTick);

    const ghost1GotEaten = useSelector((state: State) => state.gameState.ghosts[0].gotEaten);
    const ghost2GotEaten = useSelector((state: State) => state.gameState.ghosts[1].gotEaten);
    const ghost3GotEaten = useSelector((state: State) => state.gameState.ghosts[2].gotEaten);
    const ghost4GotEaten = useSelector((state: State) => state.gameState.ghosts[3].gotEaten);

    useEffect(() => {
        let [ghost1TimerStart, ghost1TimerStop] = CustomTimeOut(() => activateGhost(0), 1000);
        let [ghost2TimerStart, ghost2TimerStop] = CustomTimeOut(() => activateGhost(1), 3000);
        let [ghost3TimerStart, ghost3TimerStop] = CustomTimeOut(() => activateGhost(2), 6000);
        let [ghost4TimerStart, ghost4TimerStop] = CustomTimeOut(() => activateGhost(3), 10000);

        if (hackmanMoved) {
            ghost1TimerStart();
            ghost2TimerStart();
            ghost3TimerStart();
            ghost4TimerStart();
        } else {
            ghost1TimerStop();
            ghost2TimerStop();
            ghost3TimerStop();
            ghost4TimerStop();
        }
        return () => {
            ghost1TimerStop();
            ghost2TimerStop();
            ghost3TimerStop();
            ghost4TimerStop();
        };
    }, [hackmanMoved]);

    useEffect(() => {
        let [ghost1TimerStart, ghost1TimerStop] = CustomTimeOut(() => activateGhost(0), 2500);
        if (!ghost1ShallTick && ghost1GotEaten && hackmanMoved) {
            ghost1TimerStart();
            resetGhostGotEatenByIndex(0);
        } else {
            ghost1TimerStop();
        }
        return () => {
            ghost1TimerStop();
        };
    }, [ghost1ShallTick, ghost1GotEaten]);

    useEffect(() => {
        let [ghost2TimerStart, ghost2TimerStop] = CustomTimeOut(() => activateGhost(1), 2500);
        if (!ghost2ShallTick && ghost2GotEaten && hackmanMoved) {
            ghost2TimerStart();
            resetGhostGotEatenByIndex(1);
        } else {
            ghost2TimerStop();
        }
        return () => {
            ghost2TimerStop();
        };
    }, [ghost2ShallTick, ghost2GotEaten]);

    useEffect(() => {
        let [ghost3TimerStart, ghost3TimerStop] = CustomTimeOut(() => activateGhost(2), 2500);
        if (!ghost3ShallTick && ghost3GotEaten && hackmanMoved) {
            ghost3TimerStart();
            resetGhostGotEatenByIndex(2);
        } else {
            ghost3TimerStop();
        }
        return () => {
            ghost3TimerStop();
        };
    }, [ghost3ShallTick, ghost3GotEaten]);

    useEffect(() => {
        let [ghost4TimerStart, ghost4TimerStop] = CustomTimeOut(() => activateGhost(3), 2500);
        if (!ghost4ShallTick && ghost4GotEaten && hackmanMoved) {
            ghost4TimerStart();
            resetGhostGotEatenByIndex(3);
        } else {
            ghost4TimerStop();
        }
        return () => {
            ghost4TimerStop();
        };
    }, [ghost4ShallTick, ghost4GotEaten]);

    //Gametick interval
    useEffect(() => {
        const [intervalStart, intervalStop] = CustomIntervalForGameTick(() => gameTick(), 250);
        if (!props.isPaused) {
            intervalStart();
        }
        else {
            intervalStop();
        }
        return () => intervalStop();
    }, [props.isPaused]);


    const canSetBlock = useSelector((state: State) => state.gameState.hackman.canSetBlock);
    useEffect(() => {
        let [blockTimerStart, blockTimerStop] = CustomTimeOut(() => deleteBlock(), 5000);
        if (!props.isPaused) {
            if (!canSetBlock) {
                blockTimerStart();
            }
        }
        else if (props.isPaused) {
            blockTimerStop();
        }
        return () => {
            blockTimerStop();
        };
    }, [canSetBlock, props.isPaused]);

    const canJump = useSelector((state: State) => state.gameState.hackman.canJump);
    useEffect(() => {
        let [canJumpTimerStart, canJumpTimerStop] = CustomTimeOut(() => enableJumpingFeature(), 5000);
        if (!props.isPaused) {
            if (!canJump) {
                canJumpTimerStart();
            }
        }
        else if (props.isPaused) {
            canJumpTimerStop();
        }
        return () => {
            canJumpTimerStop();
        };
    }, [canJump]);

    return (
        <>
            {gameField.map((row, x) => {
                return (
                    <div className="row" key={x}>
                        {row.map((feld, y) => {
                            return renderGameField(feld, y);
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default GameField;
