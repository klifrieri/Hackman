import { useSelector } from "react-redux";
import HighscoreElement from "./HighscoreElement";
import "./css/highscores.css";
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
		<>
			<div className="table-row">
				<p>Rank</p>
				<p>Name</p>
				<p>Score</p>
				<p>Stats</p>
			</div>
			{bestPlayers.map((player) => (
				<HighscoreElement player={player} />
			))}
		</>
	);
};

export default HighscoreTable;