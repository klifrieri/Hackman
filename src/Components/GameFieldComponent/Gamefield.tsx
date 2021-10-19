import Coin from "./FieldComponents/Path/Coin";
import Empty from "./FieldComponents/Path/Empty";
import Hackman from "./HackmanComponent/Hackman";
import VerticalWall from "./FieldComponents/VerticalWalls/VerticalWall";
import VerticalWallTS from "./FieldComponents/VerticalWalls/VerticalWallTopShort";
import VerticalWallBS from "./FieldComponents/VerticalWalls/VerticalWallBottomShort";
import HorizontalWall from "./FieldComponents/HorizontalWalls/HorizontalWall";
import HorizontalWallRS from "./FieldComponents/HorizontalWalls/HorizontalWallRightSideShort";
import HorizontalWallLS from "./FieldComponents/HorizontalWalls/HorizontalWallLeftSideShort";
import TPieceBottom from "./FieldComponents/TPieces/TPieceBottom";
import TPieceTop from "./FieldComponents/TPieces/TPieceTop";
import TPieceRight from "./FieldComponents/TPieces/TPieceRight";
import TPieceLeft from "./FieldComponents/TPieces/TPieceLeft";
import CornerLT from "./FieldComponents/Corners/CornerLeftTop";
import CornerLB from "./FieldComponents/Corners/CornerLeftBottom";
import CornerRT from "./FieldComponents/Corners/CornerRightTop";
import CornerRB from "./FieldComponents/Corners/CornerRightBottom";
import React, { useEffect } from "react";
import Snack from "./FieldComponents/Path/Snack";
import Gate from "./FieldComponents/Path/Gate";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../../State/store";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../State/slices/gameFieldSlice";
import './gameField.css';
import Ghost1 from "./GhostComponents/GreenGhost";
import Ghost2 from "./GhostComponents/BlueGhost";
import Ghost3 from "./GhostComponents/OrangeGhost";
import Ghost4 from "./GhostComponents/RedGhost";
import CustomIntervalForGameTick from "../../UtilityFunctions/Interval_And_Timer/CustomIntervalForGameTick";
import CustomTimeOut from "../../UtilityFunctions/Interval_And_Timer/CustomTimeOut";
import Block from "./FieldComponents/Path/Block";


const GameField: React.FC = () => {
  const dispatch = useDispatch();
  const { gameTick, activateGhost, deleteBlock } = bindActionCreators(gameFieldSlice.actions, dispatch)

  const gameField = useSelector((state: State) => state.gameField);
  const hackmanMoved = useSelector((state: State) => state.hackman.hackmanMoved);
  const canSetBlock = useSelector((state: State) => state.hackman.canSetBlock)

  const ghost1ShallTick = useSelector((state: State) => state.ghosts[0].shallTick);
  const ghost2ShallTick = useSelector((state: State) => state.ghosts[1].shallTick);
  const ghost3ShallTick = useSelector((state: State) => state.ghosts[2].shallTick);
  const ghost4ShallTick = useSelector((state: State) => state.ghosts[3].shallTick);

  // The game "starts" when hackman moved the first time.
  // if hackman got eaten the timer will stop.
  useEffect(() => {
    let [ghost1TimerStart, ghost1TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(1)), 2500);
    let [ghost2TimerStart, ghost2TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(2)), 5000);
    let [ghost3TimerStart, ghost3TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(3)), 7500);
    let [ghost4TimerStart, ghost4TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(4)), 10000);

    if (hackmanMoved) {
      ghost1TimerStart();
      ghost2TimerStart();
      ghost3TimerStart();
      ghost4TimerStart();
    }
    else {
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
    }
  }, [hackmanMoved])

  //If a ghost gets eaten its shalltick sets to false.It needs to get reactivated after a delay
  //Only if Hackman already moved indicating that the game is in running mode and its only a single ghost
  //If hackman dies and all ghost are set to shalltick = false the following useeffect wont trigger
  //But the one above
  useEffect(() => {
    let [ghost1TimerStart, ghost1TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(1)), 2500);
    if (!ghost1ShallTick && hackmanMoved) {
      ghost1TimerStart();
    }
    else {
      ghost1TimerStop();
    }
    return () => {
      ghost1TimerStop();
    }
  }, [ghost1ShallTick, hackmanMoved])

  useEffect(() => {
    let [ghost2TimerStart, ghost2TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(2)), 2500);
    if (!ghost2ShallTick && hackmanMoved) {
      ghost2TimerStart();
    }
    else {
      ghost2TimerStop();
    }
    return () => {
      ghost2TimerStop();
    }
  }, [ghost2ShallTick, hackmanMoved])

  useEffect(() => {
    let [ghost3TimerStart, ghost3TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(3)), 2500);
    if (!ghost3ShallTick && hackmanMoved) {
      ghost3TimerStart();
    }
    else {
      ghost3TimerStop();
    }
    return () => {
      ghost3TimerStop();
    }
  }, [ghost3ShallTick, hackmanMoved])

  useEffect(() => {
    let [ghost4TimerStart, ghost4TimerStop] = CustomTimeOut(() => store.dispatch(activateGhost(4)), 2500);
    if (!ghost4ShallTick && hackmanMoved) {
      ghost4TimerStart();
    }
    else {
      ghost4TimerStop();
    }
    return () => {
      ghost4TimerStop();
    }
  }, [ghost4ShallTick, hackmanMoved])

  //Gametick interval
  useEffect(() => {
    const [intervalStart, intervalStop] = CustomIntervalForGameTick(() => store.dispatch(gameTick), 250);
    intervalStart();
    return () => intervalStop();
  }, [])

  useEffect(() => {
    let [blockTimerStart, blockTimerStop] = CustomTimeOut(() => store.dispatch(deleteBlock), 5000);
    if (!canSetBlock) {
      blockTimerStart()
    }
    else {
      blockTimerStop()
    }

    return () => {
      blockTimerStop();
    }
  }, [canSetBlock])

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
    else if (component === Ghost1) {
      return <Ghost1 key={key} />;
    }
    else if (component === Ghost2) {
      return <Ghost2 key={key} />;
    }
    else if (component === Ghost3) {
      return <Ghost3 key={key} />;
    }
    else if (component === Ghost4) {
      return <Ghost4 key={key} />;
    }
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else if (component === Block) return <Block key={key} />
    else return undefined;
  };

  return (
    <>
      {gameField.map((row, x) => {
        return (
          <div className="row" key={x}>
            {row.map((feld, y) => {
              return renderComponent(feld, y)
            })}
          </div>
        )
      })}
    </>
  )
};

export default GameField;
