import Coin from "./Components/Coin";
import Empty from "./Components/Empty";
import Wall from "./Components/Wall";
import Spielfeld from "./Components/Spielfeld";
import Hackman from "./Components/Hackman";

// prettier-ignore
let fields: React.FC[][] = [
[Wall, Wall, Wall, Wall, Wall, Wall, Wall,Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall],
[ Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall],
[ Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Coin, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall],
[ Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall],
[ Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall],
[ Wall, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall, Wall],
[ Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Wall, Empty, Wall, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
[ Empty, Empty, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empty, Empty, Empty, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Empty, Empty],
[ Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empty, Empty, Empty, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
[ Empty, Empty, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Empty, Empty, Empty, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Empty, Empty],
[ Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall, Wall, Wall, Wall, Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall],
[ Wall, Coin, Coin, Coin, Coin, Coin, Coin, Hackman, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Wall],
[ Wall, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Coin, Coin, Wall, Wall, Coin, Wall, Coin, Wall, Wall, Coin, Wall],
[ Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall, Coin, Coin, Coin, Coin, Wall],
  [Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall]
]

const App: React.FC = () => {
  return <Spielfeld fields={fields} />;
};

export default App;
