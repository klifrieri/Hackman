import Coin from "./Components/Coin";
import Empy from "./Components/Empty";
import Wall from "./Components/Wall";
import Holl from "./Components/HorizontalWall";
import Spielfeld from "./Components/Spielfeld";
import Hack from "./Components/Hackman";

// prettier-ignore
let fields: React.FC[][] = [
  [Wall, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Wall],
  [Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall],
  [Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Coin, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall],
  [Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall],
  [Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall],
  [Wall, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall, Wall],
  [Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Wall, Empy, Wall, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
  [Empy, Empy, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empy, Empy, Empy, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Empy, Empy],
  [Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empy, Empy, Empy, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
  [Empy, Empy, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empy, Empy, Empy, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Empy, Empy],
  [Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
  [Wall, Coin, Coin, Coin, Coin, Coin, Coin, Hack, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall],
  [Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Coin, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall],
  [Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall],
  [Wall, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Holl, Wall]
]

const App: React.FC = () => {
  return <div className="tester"><Spielfeld fields={fields} /></div>;
};

export default App;
