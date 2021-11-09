import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../State/store";
import Player from "../../Types/Player";
import HighscoreElement from "./HighscoreElement";
import "./highscore.css";

const HighscoreTable: React.FC<any> = () => {
  const Players:Player[] = useSelector((state: State) => state.players);
  let playersSorted:Player[] = [...Players]
  let bestPlayers:Player[] = [];
  
  playersSorted.sort((a, b) => b.score - a.score)

  for(let i = 0; i < 3; i++){
      let player:Player = new Player(playersSorted[i].name, playersSorted[i].score, i + 1)
      bestPlayers.push(player)
  }

  return (
    <div className="hs-wrapper">
      {bestPlayers.map((player) => (
        <HighscoreElement player={player} />
      ))}
    </div>
  );
};

export default HighscoreTable;
