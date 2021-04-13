import Coin from "./Coin";
import Empty from "./Empty";
import Hackman from "./Hackman";
import Wall from "./Wall";
import VerticalWall from "./VerticalWalls/VerticalWall";
import VerticalWallTS from "./VerticalWalls/VerticalWallTS";
import VerticalWallBS from "./VerticalWalls/VerticalWallBS";
import HorizontalWall from "./HorizontalWalls/HorizontalWall";
import HorizontalWallRS from "./HorizontalWalls/HorizontalWallRS";
import HorizontalWallLS from "./HorizontalWalls/HorizontalWallLS";
import TPieceBottom from "./TPieces/TPieceBottom";
import TPieceTop from "./TPieces/TPieceTop";

interface ISpielfeldProps {
  fields: React.FC[][];
}

const renderComponent = (component: React.FC, key: number) => {
  if (component === Wall) return <Wall key={key} />;
  else if (component === HorizontalWall) return <HorizontalWall key={key} />;
  else if (component === HorizontalWallLS) return <HorizontalWallLS key={key} />;
  else if (component === HorizontalWallRS) return <HorizontalWallRS key={key} />;
  else if (component === VerticalWall) return <VerticalWall key={key} />;
  else if (component === VerticalWallBS) return <VerticalWallBS key={key} />;
  else if (component === VerticalWallTS) return <VerticalWallTS key={key} />;
  else if (component === TPieceBottom) return <TPieceBottom key={key} />;
  else if (component === TPieceTop) return <TPieceTop key={key} />;
  else if (component === Coin) return <Coin key={key} />;
  else if (component === Hackman) return <Hackman key={key} />;
  else if (component === Empty) return <Empty key={key} />;

  return undefined;
};

const Spielfeld: React.FC<ISpielfeldProps> = (props) => {
  return (
    <div className="App center">
      {props.fields.map((row, x) => {
        return (
          <div className="row" key={x}>
            {row.map((field, y) => {
              return renderComponent(field, y);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Spielfeld;
