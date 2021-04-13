import Coin from "./Components/Coin";
import Empy from "./Components/Empty";
import Wall from "./Components/Wall";
import Holl from "./Components/HorizontalWalls/HorizontalWall";
import Hwrs from "./Components/HorizontalWalls/HorizontalWallRS";
import Hwls from "./Components/HorizontalWalls/HorizontalWallLS";
import Vell from "./Components/VerticalWalls/VerticalWall";
import Vwts from "./Components/VerticalWalls/VerticalWallTS";
import Vwbs from "./Components/VerticalWalls/VerticalWallBS";
import Tpbo from "./Components/TPieces/TPieceBottom";
import Tpto from "./Components/TPieces/TPieceTop";
import Tprs from "./Components/TPieces/TPieceRight";
import Tpls from "./Components/TPieces/TPieceLeft";
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";


// prettier-ignore
let fields: React.FC[][] = [
  [Wall, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Wall],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Tpls, Wall, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Hwls, Tpto, Hwrs, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Wall, Tprs],
  [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
  [Wall, Wall, Coin, Vwts, Coin, Wall, Wall, Coin, Wall, Holl, Empy, Holl, Wall, Coin, Wall, Wall, Coin, Vwts, Coin, Wall, Wall],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Holl, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Hwls, Holl],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Wall, Hwrs, Hack, Vwbs, Coin, Wall, Wall, Coin, Wall, Holl, Tpbo, Holl, Wall, Coin, Wall, Wall, Coin, Vwbs, Coin, Hwls, Wall],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Wall, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Wall]
]

const App: React.FC = () => {
  return <Spielfeld fields={fields} />;
};

export default App;
