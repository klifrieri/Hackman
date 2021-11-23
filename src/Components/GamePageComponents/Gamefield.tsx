import Coin from "../GamePageComponents/FieldComponents/Path/Coin";
import Empty from "../GamePageComponents/FieldComponents/Path/Empty";
import Hackman from "../GamePageComponents/HackmanComponent/Hackman";
import VerticalWall from "../GamePageComponents/FieldComponents/VerticalWalls/VerticalWall";
import VerticalWallTS from "../GamePageComponents/FieldComponents/VerticalWalls/VerticalWallTopShort";
import VerticalWallBS from "../GamePageComponents/FieldComponents/VerticalWalls/VerticalWallBottomShort";
import HorizontalWall from "../GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWall";
import HorizontalWallRS from "../GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallRightSideShort";
import HorizontalWallLS from "../GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallLeftSideShort";
import TPieceBottom from "../GamePageComponents/FieldComponents/TPieces/TPieceBottom";
import TPieceTop from "../GamePageComponents/FieldComponents/TPieces/TPieceTop";
import TPieceRight from "../GamePageComponents/FieldComponents/TPieces/TPieceRight";
import TPieceLeft from "../GamePageComponents/FieldComponents/TPieces/TPieceLeft";
import CornerLT from "../GamePageComponents/FieldComponents/Corners/CornerLeftTop";
import CornerLB from "../GamePageComponents/FieldComponents/Corners/CornerLeftBottom";
import CornerRT from "../GamePageComponents/FieldComponents/Corners/CornerRightTop";
import CornerRB from "../GamePageComponents/FieldComponents/Corners/CornerRightBottom";
import React, { useEffect } from "react";
import Snack from "../GamePageComponents/FieldComponents/Path/Snack";
import Gate from "../GamePageComponents/FieldComponents/Path/Gate";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../State/store";
import { bindActionCreators } from "redux";
import gameStateSlice from "../../State/gameState/gameStateSlice";
import "./gameField.css";
import GreenGhost from "./GhostComponents/GreenGhost";
import RedGhost from "./GhostComponents/RedGhost";
import OrangeGhost from "./GhostComponents/OrangeGhost";
import BlueGhost from "../GamePageComponents/GhostComponents/BlueGhost";
import CustomIntervalForGameTick from "../../UtilityFunctions/Interval_And_Timer/CustomIntervalForGameTick";
import CustomTimeOut from "../../UtilityFunctions/Interval_And_Timer/CustomTimeOut";
import Block from "../GamePageComponents/FieldComponents/Path/Block";

const GameField: React.FC = () => {
    const dispatch = useDispatch();
    const { gameTick, activateGhostByIndex: activateGhost, resetGhostGotEatenByIndex } = bindActionCreators(gameStateSlice.actions, dispatch);

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

    const gameIsPaused = useSelector((state: State) => state.appState.isPaused);



    // The game "starts" when hackman moved the first time.
    // if hackman got eaten the timer will stop.
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

    //If a ghost gets eaten its shalltick sets to false.It needs to get reactivated after a delay
    //Only if Hackman already moved indicating that the game is in running mode and its only a single ghost
    //If hackman dies and all ghost are set to shalltick = false the following useeffect wont trigger
    //But the one above
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
        if(!gameIsPaused){
            intervalStart();
        }
        else{
            intervalStop();
        }
        return () => intervalStop();
    }, []);

    const renderComponent = (component: React.FC<any>, key: number) => {
        if (component === HorizontalWall) return <HorizontalWall key={key} />;
        else if (component === HorizontalWallLS) return <HorizontalWallLS key={key} />;
        else if (component === HorizontalWallRS) return <HorizontalWallRS key={key} />;
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
        else if (component === Hackman) return <Hackman key={key} />;
        else if (component === GreenGhost) {
            return <GreenGhost key={key} />;
        } else if (component === RedGhost) {
            return <RedGhost key={key} />;
        } else if (component === OrangeGhost) {
            return <OrangeGhost key={key} />;
        } else if (component === BlueGhost) {
            return <BlueGhost key={key} />;
        } else if (component === Snack) return <Snack key={key} />;
        else if (component === Empty) return <Empty key={key} />;
        else if (component === Gate) return <Gate key={key} />;
        else if (component === Block) return <Block key={key} />;
        else return undefined;
    };

    return (
        <>
            {gameField.map((row, x) => {
                return (
                    <div className="row" key={x}>
                        {row.map((feld, y) => {
                            return renderComponent(feld, y);
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default GameField;
