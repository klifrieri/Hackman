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
import Ghost1 from "./GhostComponents/Ghost1";
import Ghost2 from "./GhostComponents/Ghost2";
import Ghost3 from "./GhostComponents/Ghost3";
import Ghost4 from "./GhostComponents/Ghost4";
import { CustomInterval, Timer } from "../../UtilityFunctions/CustomInterval";


const GameField: React.FC = () => {
  const dispatch = useDispatch();
  const { gameTick, activateGhost } = bindActionCreators(gameFieldSlice.actions, dispatch)

  const gameField = useSelector((state: State) => state.gameField);
  const hackmanMoved = useSelector((state: State) => state.hackmanMoved);
  
  useEffect(() => {
    let ghost1Timer = new Timer( () =>store.dispatch(activateGhost(1)),2500);
    let ghost2Timer = new Timer( () =>store.dispatch(activateGhost(2)),5000);
    let ghost3Timer = new Timer( () =>store.dispatch(activateGhost(3)),7500);
    let ghost4Timer = new Timer( () =>store.dispatch(activateGhost(4)),10000);

    if(hackmanMoved){
    ghost1Timer.start();
    ghost2Timer.start();
    ghost3Timer.start();
    ghost4Timer.start();
  }
  return () =>{
    ghost1Timer.stop();
    ghost2Timer.stop();
    ghost3Timer.stop();
    ghost4Timer.stop();
  }
  }, [hackmanMoved])

  useEffect(() => {
    const [intervalStart, intervalStop] = CustomInterval(() => store.dispatch(gameTick), 5000);
    intervalStart();
    return () => intervalStop();
  }, [])


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
    else if (component === Ghost1){     
      return <Ghost1 key={key}/>;
    }
    else if (component === Ghost2){     
      return <Ghost2 key={key}/>;
    }
    else if (component === Ghost3){     
      return <Ghost3 key={key}/>;
    }
    else if (component === Ghost4){     
      return <Ghost4 key={key}/>;
    }
    else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
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
