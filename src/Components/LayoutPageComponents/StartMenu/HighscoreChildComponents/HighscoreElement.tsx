import { Link } from "react-router-dom";
import IHighScoreElementProps from "../../../../Types_Classes/Props/IHighscoreElementProps";
import "./css/highscores.css";


const HighscoreElement: React.FC<IHighScoreElementProps> = (props) => {

    const player = props.player

    return (
        <div className="table-row">
            <p>{player.ranking}</p>
            <p>{player.name}</p>
            <p>{player.score}</p>
            <div>
                <Link to="/stats" className="stats-btn">Stats</Link>
            </div>
        </div>
    )
}

export default HighscoreElement