
import { useSelector } from "react-redux";
import { State } from "../../State/store";
import HighscoreElement from "./HighscoreElement";
import "./highscore.css";
import Player from "../../Types_Classes/Models/Player";

const HighscoreTable: React.FC<any> = () => {

  const Players = useSelector((state: State) => state.players);
  let playersSorted = [...Players]
  let bestPlayers:Player[] = [];
  
  playersSorted.sort((a, b) => b.score - a.score)

  for(let i = 0; i < 3; i++){
      let player:Player = new Player(playersSorted[i].name, playersSorted[i].score, i + 1)
      bestPlayers.push(player)
  }

  return (
    <div className="hs-wrapper">
      <h2 className="hs-header">HIGHSCORE</h2>
      {bestPlayers.map((player) => (
        <HighscoreElement player={player} />
      ))}
    </div>
  );
};

export default HighscoreTable;
