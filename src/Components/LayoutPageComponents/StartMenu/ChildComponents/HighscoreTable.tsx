import { useSelector } from "react-redux";
import HighscoreElement from "./HighscoreElement";
import "./css/highscore.css";
import Player from "../../../../Types_Classes/Models/Player";
import { State } from "../../../../State/store";

const HighscoreTable: React.FC<any> = () => {

	const Players = useSelector((state: State) => state.appState.players);
	let playersSorted = [...Players]
	let bestPlayers: Player[] = [];

	playersSorted.sort((a, b) => b.score - a.score)

	for (let i = 0; i < 3; i++) {
		let player: Player = new Player(playersSorted[i].name, playersSorted[i].score, i + 1)
		bestPlayers.push(player)
	}

	return (
		<div className="highscore-table-wrapper white-text text-fontsize">
			<div className="table-row overlay-text">
				<div>Rank</div>
				<div>Name</div>
				<div>Score</div>
				<div>Stats</div>
			</div>
			{bestPlayers.map((player) => (
				<HighscoreElement player={player} />
			))}
		</div>
	);
};

export default HighscoreTable;
