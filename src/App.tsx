import Coin from "./Components/Coin";
import Empy from "./Components/Empty";
import Wall from "./Components/Wall";
import Holl from "./Components/HorizontalWall";
import Vell from "./Components/VerticalWall";
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";


// prettier-ignore
let fields: React.FC[][] = [
  [Wall, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Wall],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Holl, Holl, Coin, Vell, Coin, Holl, Holl, Coin, Coin, Coin, Holl, Holl, Coin, Vell, Coin, Holl, Holl, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Vell, Wall, Coin, Holl, Holl, Holl, Holl, Holl, Coin, Holl, Holl, Holl, Coin, Holl, Holl, Holl, Holl, Holl, Coin, Wall, Vell],
  [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
  [Wall, Wall, Coin, Vell, Coin, Wall, Wall, Coin, Wall, Holl, Empy, Holl, Wall, Coin, Wall, Wall, Coin, Vell, Coin, Wall, Wall],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Holl, Holl, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Holl, Holl],
  [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
  [Wall, Holl, Coin, Vell, Coin, Wall, Wall, Coin, Wall, Holl, Holl, Holl, Wall, Coin, Wall, Wall, Coin, Vell, Coin, Holl, Wall],
  [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Hack, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
  [Vell, Coin, Holl, Holl, Coin, Vell, Coin, Holl, Holl, Coin, Coin, Coin, Holl, Holl, Coin, Vell, Coin, Holl, Holl, Coin, Vell],
  [Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vell],
  [Wall, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Wall]
]

const App: React.FC = () => {
  return <Spielfeld fields={fields} />;
};

export default App;
