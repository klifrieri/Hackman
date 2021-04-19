import Coin from "./Components/Coin";
import Empy from "./Components/Empty";
import Wall from "./Components/Wall";
import Holl from "./Components/HorizontalWalls/HorizontalWall";
import Hwrs from "./Components/HorizontalWalls/HorizontalWallRightSideShort";
import Hwls from "./Components/HorizontalWalls/HorizontalWallLeftSideShort";
import Vell from "./Components/VerticalWalls/VerticalWall";
import Vwts from "./Components/VerticalWalls/VerticalWallTopShort";
import Vwbs from "./Components/VerticalWalls/VerticalWallBottomShort";
import Tpbo from "./Components/TPieces/TPieceBottom";
import Tpto from "./Components/TPieces/TPieceTop";
import Tprs from "./Components/TPieces/TPieceRight";
import Tpls from "./Components/TPieces/TPieceLeft";
import Colt from "./Components/Corners/CornerLeftTop";
import Colb from "./Components/Corners/CornerLeftBottom";
import Cort from "./Components/Corners/CornerRightTop";
import Corb from "./Components/Corners/CornerRightBottom";
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";


// prettier-ignore
let fields: React.FC[][] = [
  [Colt, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Cort],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Tpls, Cort, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Hwls, Tpto, Hwrs, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Colt, Tprs],
  [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
  [Colb, Corb, Coin, Vwts, Coin, Colt, Cort, Coin, Colt, Hwrs, Empy, Hwls, Cort, Coin, Colt, Cort, Coin, Vwts, Coin, Colb, Corb],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Hwls, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Hwls, Hwrs],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Colt, Hwrs, Hack, Vwbs, Coin, Colb, Corb, Coin, Colb, Holl, Tpbo, Holl, Corb, Coin, Colb, Corb, Coin, Vwbs, Coin, Hwls, Cort],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Colb, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Corb]
]

const App: React.FC = () => {
  return <Spielfeld fields={fields} />;
};

export default App;
